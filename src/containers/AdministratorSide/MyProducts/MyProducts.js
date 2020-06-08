import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './MyProducts.module.css';
import 'antd/dist/antd.css';
import MyTable from '../components/Table/MyTable';
import { Menu, Dropdown, notification, Modal } from 'antd';

import NewProduct from '../../AdministratorSide/components/Modal/NewProduct';
import UpdateProducts from '../../AdministratorSide/components/Modal/UpdateProducts';
import {
  getPartnerProducts,
  getPartnerProductsRozetka,
  getPartnerProductsProm,
  removePartnerProduct,
  generateYml,
  addProductsToYml,
  deleteProductsFromYml
} from '../../../actions/productsActions';
import MyButton from '../components/Buttons/Button';
import { TabPanel, a11yProps } from '../components/Tabs/Tabs';
import { Tab, Tabs, Table } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import {
  uploadXls,
  getContractorCategories
} from '../../../actions/productsActions';
import Paper from '@material-ui/core/Paper';
import rozetkaLogo from '../../../img/rozetkaLogo.png';
import promLogo from '../../../img/promLogo.png';
import ecommerceImg from '../../../img/ecommerce.png';
import tableTypes from '../../../constants/tableTypes';


export const typeRequest = {
  rozetka: 'rozetka',
  prom: 'prom'
};

class MyProducts extends Component {
  state = {
    value: 0,
    products: [],
    product: {},
    loading: true,
    selectedIds: [],
    filters: {
      category_id: '',
      name: '',
      vendor_code: '',
      min_price: '',
      max_price: '',
      brand: '',
      in_stock: '',
      user_id: ''
    },
    count: 0,
    pageSize: 10,
    currentPage: 1,
    rozetkaUrl: '',
    promUrl: '',
    ymlConfirmVisible: false,
    updateManyProducts: false,
  };


  showUpdateProducts = () => this.setState({ updateManyProducts: true });

  closeUpdateProducts = () => this.setState({ updateManyProducts: false, selectedIds: [] });

  getMyProducts = async (type = '') => {

    this.setState({ loading: true });
    const {
      currentPage,
      pageSize,
      filters: {
        id,
        category_id,
        name,
        brand,
        in_stock,
        vendor_code,
        min_price,
        max_price,
        user_id,
        contractor_product
      }
    } = this.state;


    const urlParams = [
      category_id ? `&category_id=${category_id}` : '',
      name ? `&name=${name}` : '',
      brand ? `&brand=${brand}` : '',
      in_stock !== 'all' ? `&in_stock=${in_stock}` : '',
      vendor_code ? `&vendor_code=${vendor_code}` : '',
      min_price ? `&min_price=${min_price}` : '',
      max_price ? `&max_price=${max_price}` : '',
      user_id ? `&user_id=${user_id}` : '',
      contractor_product ? `&contractor_product=${contractor_product}` : ''
    ];

    let url = `?page_size=${pageSize}&page=${currentPage + urlParams.join('')}`;
    let fetchProducts;
    if (type === typeRequest.prom) {
      fetchProducts = await getPartnerProductsProm(
        `?page_size=${pageSize}&page=${currentPage}`
      );
    } else if (type === typeRequest.rozetka) {
      fetchProducts = await getPartnerProductsRozetka(
        `?page_size=${pageSize}&page=${currentPage}`
      );
    } else {
      fetchProducts = await getPartnerProducts(url);
    }
    this.setState({
      loading: false,
      products: fetchProducts.results,
      count: fetchProducts.count
    });
  };

  componentDidMount() {
    this.getMyProducts();
    this.handleGenerateYml();
  }

  handleSelectCategory = category => {
    this.setState(
      {
        loading: true,
        filters: {
          ...this.state.filters,
          category_id: category.key
        }
      },
      () => this.getMyProducts()
    );
  };
  handleChangeTable = typeRequest => (page, current) => {
    this.setState(
      {
        currentPage: current + 1,
        pageSize: this.state.pageSize
      },
      () => this.getMyProducts(typeRequest)
    );
    this.resetSelects();
  };

  getCategories = async () => {
    const res = await getContractorCategories();
    this.setState({
      categories: res
    });
  };

  handleChangeFilters = ({ target: { name, value } }) => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          [name]: value
        }
      },
      () => this.getMyProducts()
    );
  };

  handleRemoveProducts = async () => {
    const { selectedIds } = this.state;

    await removePartnerProduct({ productListIds: selectedIds });

    this.handleUpdate();
  };

  handleCopied = () => {
    this.setState({ copied: true });
    notification.success({
      message: 'Скопировано'
    });
  };

  handleOpenWindow = indexProduct => {
    if (this.state.selectedIds.length > 1) {
      this.showUpdateProducts();
    }
    const product = this.state.products[indexProduct];
    this.setState({ product });
  };

  handleUpdate = type => {

    this.getMyProducts(type);
    // this.getCategories();
    this.resetFieldsProduct();
  };

  updateLocalProducts = (newProducts, newParams) => {
    const { products } = this.state;
    const updatedProducts = products.map(p => {
      const isUpdatedProduct = newProducts.find(i => p.id === i.id);

      if (isUpdatedProduct) {
        return {
          ...p,
          ...newParams,
          category: typeof newParams.category !== 'undefined' ? newProducts[0].category : p.category,
          sellingPrice: typeof newParams.partnerPercent !== 'undefined' ? isUpdatedProduct.sellingPrice : p.sellingPrice,
          manualOptions: typeof newParams.manualOptions !== 'undefined' ? isUpdatedProduct.manualOptions : p.manualOptions
        }
      }
      return p;
    })

    this.setState({
      products: updatedProducts
    })
  }

  resetFieldsProduct = () => {
    this.setState({
      loading: false,
      selectedIds: [],
      product: {}
    });
  };

  resetSelects = () => {
    this.setState({ selectedIds: [] });
  };

  handleGenerateYml = async () => {
    const { results } = await generateYml();
    const rozetkaUrl = results.find(el => el.ymlType === 'rozetka')
      ? results.find(el => el.ymlType === 'rozetka').template
      : '';
    const promUrl = results.find(el => el.ymlType === 'prom')
      ? results.find(el => el.ymlType === 'prom').template
      : '';
    this.setState({
      rozetkaUrl,
      promUrl
    });
  };

  handleCloseYmlConfirmOpen = () => {
    this.setState({ ymlConfirmVisible: true });
  };
  handleCloseYmlConfirmClose = () => {
    this.setState({ ymlConfirmVisible: false });
  };

  handleAddToYml = async type => {
    const { selectedIds, products } = this.state;
    let isError = false;
    products.forEach(p => {
      if (selectedIds.includes(p.id) && !p.category) {
        isError = true;
      }
    });

    if (isError) {
      return notification.error({
        message: 'Добавте категорию для выбраных товаров'
      });
    }
    this.resetSelects();

    await addProductsToYml(
      {
        ymlType: type,
        productIds: selectedIds
      },
      type
    );
    this.handleCloseYmlConfirmClose();
    this.getMyProducts();
    notification.success({ message: 'Товар был добавлен!' });
  };

  handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append('xls_file', file[0]);
    formData.append('file_type', type);

    await uploadXls(formData);
    this.handleUpdate();
  };

  // handleDeleteFromYmlCount = async () => { };


  handleDeleteFromYml = (type = '') => async () => {

    const { selectedIds } = this.state;

    this.resetSelects();

    type === typeRequest.rozetka && await deleteProductsFromYml(
      {
        ymlType: 'rozetka',
        selectedIds
      },
      'rozetka'
    );



    type === typeRequest.prom && await deleteProductsFromYml(
      {
        ymlType: 'prom',
        selectedIds
      },
      'prom'
    );

      this.getMyProducts(type);
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) return;
    if (nextProps.user.selectedCategory !== this.state.category_id) {
      this.setState(
        {
          filters: {
            ...this.state.filters,
            category_id: nextProps.user.selectedCategory
          }
        },
        () => this.getMyProducts()
      );
    }
  }

  onSelectAllChange = event => {
    if (event.target.checked) {
      const newSelecteds = this.state.products.map(p => p.id);
      return this.setState({ selectedIds: newSelecteds });
    }
    this.setState({ selectedIds: [] });
  };

  onSelectChange = id => {
    const { selectedIds } = this.state;
    const isSelectedId = selectedIds.includes(id);

    if (isSelectedId) {
      const newSelectedIds = selectedIds.filter(i => i !== id);
      this.setState({ selectedIds: newSelectedIds });
    } else {
      this.setState(({ selectedIds }) => ({
        selectedIds: [...selectedIds, id]
      }));
    }
  };

  handleChangeRowsPerPage = typeRequest => event => {
    this.setState(
      {
        pageSize: +event.target.value
      },
      () => this.getMyProducts(typeRequest)
    );
  };
  handleChangeTab = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const {
      products,
      product,
      selectedIds,
      promUrl,
      rozetkaUrl,
      count,
      loading,
      pageSize,
      currentPage,
      filters,
      value,
      updateManyProducts
    } = this.state;

    const menuRozetka = (
      <Menu>
        <div className={styles.addYml}>
          <div className={styles.body}>
            <div>
              <input type="text" value={rozetkaUrl} disabled />
              <CopyToClipboard
                text={rozetkaUrl ? rozetkaUrl.replace(/https/g, 'http'): ''}
                onCopy={() => this.handleCopied()}
              >
                <button className={styles.copy}>Копировать</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Menu>
    );

    const menuProm = (
      <Menu>
        <div className={styles.addYml}>
          <div className={styles.body}>
            <div>
              <input type="text" value={promUrl} disabled />
              <CopyToClipboard
                text={promUrl ? promUrl.replace(/https/g, 'http'): ''}
                onCopy={() => this.handleCopied()}
              >
                <button className={styles.copy}>Копировать</button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </Menu>
    );

    const rowSelection = {
      selectedIds,
      onSelectChange: this.onSelectChange,
      hideDefaultSelections: true,
      onAllSelection: this.onSelectAllChange
    };

    const config = {
      pagination: {
        pageSize: pageSize,
        pageSizeOptions: [10, 20, 50, 250, 500],
        showSizeChanger: true,
        total: count,
        current: currentPage
      }
    };
    return (
      <div className={styles.main}>
        <div>
          <div className={styles.wrap}>
            <h3 className={styles.title}>Мои товары</h3>
          </div>
        </div>
        <div className="page">
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChangeTab}
          >
            <Tab
              className={styles.tabTop}
              icon={<img className={styles.iconTopAll} src={ecommerceImg} />}
              label={`Товари в продажу `}
              {...a11yProps(0)}
              onClick={() =>
                this.setState({ currentPage: 1 }, () => this.getMyProducts())
              }
            />
            <Tab
              className={styles.tabTop}
              label="Товары в YML Rozetka"
              icon={<img className={styles.iconTopRozetka} src={rozetkaLogo} />}
              {...a11yProps(1)}
              onClick={() =>
                this.setState({ currentPage: 1 }, () =>
                  this.getMyProducts(typeRequest.rozetka)
                )
              }
            />
            <Tab
              className={styles.tabTop}
              label="Товары в YML Prom.ua"
              icon={<img className={styles.iconTopProm} src={promLogo} />}
              {...a11yProps(2)}
              onClick={() =>
                this.setState({ currentPage: 1 }, () =>
                  this.getMyProducts(typeRequest.prom)
                )
              }
            />
          </Tabs>
          {selectedIds.length > 1 ? <UpdateProducts
            onUpdate={this.handleUpdate}
            resetFieldsProduct={this.resetFieldsProduct}
            productIds={selectedIds}
            visible={product.id ? true : false}
            currentTab={value}
            updateLocalProducts={this.updateLocalProducts}
          /> : <NewProduct
              onUpdate={this.handleUpdate}
              resetFieldsProduct={this.resetFieldsProduct}
              product={product}
              update={product.id ? true : false}
              currentTab={value}
            />}

          <TabPanel value={value} index={0}>
            {value === 0 &&
              <div className={styles.inactiveGoodsTable}>
                <div className={styles.productsBtns}>
                  <div className={styles.topButtons}>
                    <Paper style={{ marginRight: 'auto' }}>
                      <div className={styles.totalProducts}>
                        Товаров: <span>{count}</span>
                      </div>
                    </Paper>

                    <MyButton
                      myvariant="withIcon"
                      title="Добавить в YML"
                      disabled={selectedIds.length === 0}
                      onClick={this.handleCloseYmlConfirmOpen}
                    ></MyButton>
                    <Modal
                      bodyStyle={{ display: 'none' }}
                      visible={this.state.ymlConfirmVisible}
                      title="Выберите в какой YML добавить ваш Товар."
                      onCancel={this.handleCloseYmlConfirmClose}
                      footer={
                        <div className={styles.xmlComfirmDiv}>
                          <button
                            className={`btn`}
                            onClick={() => this.handleAddToYml('rozetka')}
                          >
                            Rozetka YML
                        </button>
                          <button
                            className={`btn`}
                            onClick={() => this.handleAddToYml('prom')}
                          >
                            Prom YML
                        </button>
                        </div>
                      }
                    ></Modal>
                    <Dropzone
                      onDrop={e => this.handleUploadFile(e, 'yml')}
                      accept=".xml"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <MyButton
                            myvariant="withIcon"
                            title="Загрузить YML файл c Rozetka"
                          ></MyButton>
                        </div>
                      )}
                    </Dropzone>

                    <Dropzone
                      onDrop={e => this.handleUploadFile(e, 'promYml')}
                      accept=".xml"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />

                          <MyButton
                            myvariant="withIcon"
                            title="Загрузить YML файл c Prom.ua"
                          ></MyButton>
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  <MyTable
                    {...config}
                    tableTypes={tableTypes.myProducts}
                    showCheckbox
                    showIdContractor
                    // showProductPrice
                    // showRecommendedPrice
                    showPercent
                    showSellingPrice
                    myproduct
                    openProduct={this.handleOpenWindow}
                    handleDeleteProducts={this.handleRemoveProducts}
                    edit
                    filters={filters}
                    loading={loading}
                    changeFilters={this.handleChangeFilters}
                    rowSelection={rowSelection}
                    products={products}
                    handleChangeTable={this.handleChangeTable()}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage()}
                  />
                </div>
              </div>}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {value === 1 &&
              <div className={styles.inactiveGoodsTable}>
                <div className={styles.productsBtns}>
                  <div className={styles.topButtons}>
                    <Paper style={{ marginRight: 'auto' }}>
                      <div className={styles.totalProducts}>
                        Товаров: <span>{count}</span>
                      </div>
                    </Paper>

                    <Dropdown overlay={menuRozetka} trigger={['click']}>
                      <MyButton
                        disable={!rozetkaUrl}
                        myvariant="withIcon"
                        title="Скачать YML Rozetka"
                      ></MyButton>
                    </Dropdown>
                    <MyButton
                      myvariant="withIcon"
                      title="Удалить из YML"
                      disabled={selectedIds.length === 0}
                      onClick={this.handleDeleteFromYml(typeRequest.rozetka)}
                    ></MyButton>
                  </div>


                  <MyTable
                    {...config}
                    tableTypes={tableTypes.myProducts}
                    showIdContractor
                    // showRecommendedPrice
                    showPercent
                    showSellingPrice
                    showCheckbox
                    myproduct
                    openProduct={this.handleOpenWindow}
                    handleDeleteProducts={this.handleRemoveProducts}
                    edit
                    filters={filters}
                    loading={loading}
                    changeFilters={this.handleChangeFilters}
                    rowSelection={rowSelection}
                    products={products}
                    handleChangeTable={this.handleChangeTable(
                      typeRequest.rozetka
                    )}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage(
                      typeRequest.rozetka
                    )}
                  />
                </div>
              </div>}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {value === 2 &&
              <div className={styles.inactiveGoodsTable}>
                <div className={styles.productsBtns}>
                  <div className={styles.topButtons}>
                    <Paper style={{ marginRight: 'auto' }}>
                      <div className={styles.totalProducts}>
                        Товаров: <span>{count}</span>
                      </div>
                    </Paper>

                    <Dropdown overlay={menuProm} trigger={['click']}>
                      <MyButton
                        disabled={!promUrl}
                        myvariant="withIcon"
                        title="Скачать YML Prom"
                      ></MyButton>
                    </Dropdown>

                    <MyButton
                      myvariant="withIcon"
                      title="Удалить из YML"
                      disabled={selectedIds.length === 0}
                      onClick={this.handleDeleteFromYml(typeRequest.prom)}
                    ></MyButton>
                  </div>

                  <MyTable
                    {...config}
                    tableTypes={tableTypes.myProducts}
                    myproduct
                    showCheckbox
                    showPercent
                    showSellingPrice
                    showIdContractor
                    // showRecommendedPrice
                    openProduct={this.handleOpenWindow}
                    handleDeleteProducts={this.handleRemoveProducts}
                    edit
                    filters={filters}
                    loading={loading}
                    changeFilters={this.handleChangeFilters}
                    rowSelection={rowSelection}
                    products={products}
                    handleChangeTable={this.handleChangeTable(typeRequest.prom)}
                    handleChangeRowsPerPage={this.handleChangeRowsPerPage(
                      typeRequest.prom
                    )}
                  />
                </div>
              </div>}
          </TabPanel >
        </div >
      </div >
    );
  }
}

export default MyProducts;
