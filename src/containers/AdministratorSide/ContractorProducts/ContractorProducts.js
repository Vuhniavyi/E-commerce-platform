import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Tooltip, Modal } from 'antd';
import Dropzone from 'react-dropzone';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Icon as MaterialIcon } from '@material-ui/core';

import styles from './ContractorProducts.module.css';
import templateExcel from '../../../img/instru/template.xlsx';
import Icons from '../components/Icons/Icons';
import { rootStyle } from '../../../rootStyle';

// import CategoryList from "./CategoryList";
import MyButton from '../components/Buttons/Button';
import MyTable from '../components/Table/MyTable';
import {
  getContractorProducts,
  uploadXls,
  getContractorCategories,
  removeContractorProduct,
  getDownloadsStatus
} from '../../../actions/productsActions';
import { getProfile } from '../../../actions/userActions';
import TableTypes from 'constants/tableTypes';
import NewProduct from '../components/Modal/NewProduct';
import UpdateProducts from '../../AdministratorSide/components/Modal/UpdateProducts';



class ContractorProducts extends Component {
  state = {
    haveRozetkaAkaunt: false,
    havePromAkaunt: false,
    loading: true,
    selectedIds: [],
    products: [],
    product: {},
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
    currentPage: 1,
    pageSize: 10,

    openExcelModal: false,
    uploadExel: false,
    uploadRozetka: false,
    uploadProm: false,
    inStock: 0,
    notInStock: 0,
    updateManyProducts: false,
    createNewProduct: false,
  };

  getMyProducts = async () => {
    const {
      currentPage,
      pageSize,
      filters: {
        category_id,
        name,
        brand,
        in_stock,
        vendor_code,
        min_price,
        max_price,
        user_id,
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
    ];

    const url = `?page_size=${pageSize}&page=${currentPage +
      urlParams.join('')}`;

    const [all, inStock, notInStock] = await Promise.all([
      getContractorProducts(url),
      getContractorProducts(`?in_stock=${true}`),
      getContractorProducts(`?in_stock=${false}`)
    ]);

    this.setState({
      loading: false,
      products: all.results,
      count: all.count,
      inStock: inStock.count,
      notInStock: notInStock.count
    });
  };

  resetSelects = () => {
    this.setState({ selectedIds: [] })
  }

  handleUploadFile = async (file, type) => {
    const formData = new FormData();
    formData.append('xls_file', file[0]);
    formData.append('file_type', type);

    await uploadXls(formData);
    this.props.history.push('/admin/products/download_history');
    this.handleUpdate();
  };

  handleUploadFileProm = async () => {
    const formData = new FormData();
    // formData.append('xls_file', file[0]);
    formData.append('file_type', "prom");

    await uploadXls(formData);
    this.props.history.push('/admin/products/download_history');
    this.handleUpdate();
  };

  handleChangeFilters = ({ target: { name, value } }) => {
    this.setState(
      {
        loading: true,
        filters: {
          ...this.state.filters,
          [name]: value
        }
      },
      () => this.getMyProducts()
    );
  };

  handleRemoveProducts = async () => {
    this.setState({ loading: true });
    const { selectedIds } = this.state;

    await removeContractorProduct({ productListIds: selectedIds });

    this.handleUpdate();
  };
  handleChangeRowsPerPage = event => {
    this.setState(
      {
        pageSize: +event.target.value
      },
      () => this.getMyProducts()
    );
  };
  handleChangeTable = (page, current) => {
    this.setState(
      {
        currentPage: current + 1,
        pageSize: this.state.pageSize
      },
      () => this.getMyProducts()
    );
    this.resetSelects()
  };

  openProduct = product => {
    this.setState(
      {
        product: product
      });
  };

  handleUpdate = () => {
    this.getMyProducts();
    this.resetFieldsProduct();
  };
  resetFieldsProduct = () => {
    this.setState({
      loading: false,
      selectedIds: [],
      product: {}
    });
  };

  handleSelectCategory = category => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          category_id: category.key
        }
      },
      () => this.getMyProducts()
    );
  };

  checkUploader = async () => {
    const res = await getDownloadsStatus();
    let innerArr = [],
      rozetkaArr = [];
    let promArr = [];

    res.forEach(item => {
      if (item.fileType === 'inner') {
        innerArr.push(item);
      } else {
        rozetkaArr.push(item);
      }
    });

    if (
      innerArr.every(
        item => item.isUploaded || item.errors || item.errors === 'No errors'
      )
    ) {
      this.setState({
        uploadExel: true
      });
    }

    if (
      rozetkaArr.every(
        item => item.isUploaded || item.errors || item.errors === 'No errors'
      ) ||
      rozetkaArr.length === 0
    ) {
      this.setState({
        uploadRozetka: true
      });
    }

    if (
      promArr.every(
        item => item.isUploaded || item.errors || item.errors === 'No errors'
      ) ||
      promArr.length === 0
    ) {
      this.setState({
        uploadProm: true
      });
    }
  };

  setExcelModalVisible = () => {
    this.setState({
      openExcelModal: !this.state.openExcelModal
    });
  };

  componentWillReceiveProps(nextProps) {
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

  async componentDidMount() {
    this.getMyProducts();
    this.checkUploader();

    const res = await getProfile();
    if (res.rozetkaPassword && res.rozetkaUsername) {
      this.setState({
        haveRozetkaAkaunt: true
      });
    }
    if (res.tokenProm) {
      this.setState({
        havePromAkaunt: true
      });
    }
  };

  showUpdateProducts = () => this.setState({ updateManyProducts: true });

  closeUpdateProducts = () => this.setState({ updateManyProducts: false, selectedIds: [] });

  createNewProduct = () => this.setState({ createNewProduct: false });

  updateLocalProducts = (newProducts, newParams) => {
    const { products } = this.state;
    const updatedProducts = products.map(p => {
      const isUpdatedProduct = newProducts.find(i => p.id === i.id);

      if (isUpdatedProduct) {

        const newProduct = {
          ...p,
          ...newParams,
          category: typeof newParams.category !== 'undefined' ? newProducts[0].category : p.category,
          manualOptions: typeof newParams.manualOptions !== 'undefined' ? isUpdatedProduct.manualOptions : p.manualOptions,
        }

        return newProduct
      }
      return p;
    })

    this.setState({
      products: updatedProducts
    })
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

  handleOpenWindow = indexProduct => {
    if (this.state.selectedIds.length > 1) {
      this.showUpdateProducts();
    }
    const product = this.state.products[indexProduct];
    this.setState({ product });
  };

  render() {
    const {
      haveRozetkaAkaunt,
      havePromAkaunt,
      selectedIds,
      products,
      loading,
      product,
      count,
      currentPage,
      filters,
      openExcelModal,
      uploadExel,
      uploadRozetka,
      uploadProm,
      inStock,
      notInStock,
      createdType,
      pageSize
    } = this.state;

    console.log('selectedIds', this.state);

    
    const config = {
      pagination: {
        pageSize: pageSize,
        pageSizeOptions: ['10', '20', '50', '250', '500'],
        showSizeChanger: true,
        total: count,
        current: currentPage
      }
    };
    const rowSelection = {
      selectedIds,
      onSelectChange: this.onSelectChange,
      hideDefaultSelections: true,
      onAllSelection: this.onSelectAllChange
    };
    return (
      <div className="page">
        <div className={`page-title `}>
          Мои товары
          <Tooltip title="Инструкция по добавлению товаров." placement="top">
            <Icons
              variants="default"
              icon="help"
              className={styles.questionIcon}
            // onClick={() => this.props.history.push('/admin/instruction')}
            />
          </Tooltip>
        </div>

        <div className="page-content">
          <div className={styles.categoriesBlock}>
            <div className={styles.actions}>
              <Paper className={styles.paper}>
                <div className={styles.totalProducts}>
                  <div>
                    Всего товаров:{' '}
                    <span className={styles.totalDigits}>{count}</span>
                  </div>
                  <div>
                    -в наличии:{' '}
                    <span className={styles.totalDigits}>{inStock}</span>
                  </div>
                  <div>
                    -нет в наличии:{' '}
                    <span className={styles.totalDigits}>{notInStock}</span>
                  </div>
                </div>
              </Paper>
              {selectedIds.length > 1 ? <UpdateProducts
                onUpdate={this.handleUpdate}
                resetFieldsProduct={this.resetFieldsProduct}
                productIds={selectedIds}
                visible={product.id ? true : false}
                updateLocalProducts={this.updateLocalProducts}
              /> : <NewProduct
                  onUpdate={this.handleUpdate}
                  resetFieldsProduct={this.resetFieldsProduct}
                  product={product}
                  update={product.id ? true : false}
                />}
              {/* <MyButton
                title="Добавить товар"
                myvariant="withIcon"
                onClick={this.showModal}
              /> */}
              <MyButton
                title="Загрузить Excel файл"
                myvariant="withIcon"
                disabled={!uploadExel}
                onClick={this.setExcelModalVisible}
              />
              {/* <Button
                classes={this.props.classes}
                disabled={!uploadExel}
                onClick={this.setExcelModalVisible}
              >
                Загрузить Excel файл
              </Button> */}
              {/* <button
                className="btn"
                disabled={!uploadExel}
                onClick={this.setExcelModalVisible}
              >
                Загрузить Excel файл
              </button> */}
              {/* Модальное окно для загрузки Excel файла */}
              <Modal
                width={579}
                footer={null}
                visible={openExcelModal}
                onCancel={this.setExcelModalVisible}
              >
                <div className={styles.excelModal}>
                  <p className={styles.excelModal__description}>
                    Выбрать и загрузить EXCEL
                  </p>

                  <Dropzone
                    onDrop={e => this.handleUploadFile(e, 'inner')}
                    accept=".xls, .xlsx"
                    multiple={false}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <MyButton
                          title="Загрузить файл c диска"
                          myvariant="withIcon"
                          onClick={this.setExcelModalVisible}
                        />
                        {/* <Button classes={this.props.classes}>
                          
                        </Button> */}
                        {/* <button
                          className={`btn ${styles.excelModal__button}`}
                          style={{ margin: 0 }}
                        >
                          Загрузить файл c диска
                        </button> */}
                      </div>
                    )}
                  </Dropzone>

                  <Button
                    className={[
                      styles.excelModal__button,
                      styles.excelModal__button_last
                    ].join(' ')}
                    type="primary"
                    ghost
                  >
                    <a href={templateExcel} download>
                      <p className={styles.excelModal__button_last_text}>
                        Скачать пример файла
                      </p>
                    </a>
                  </Button>
                </div>
              </Modal>

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
                    // disabled={!uploadExel}
                    ></MyButton>
                    {/* <button className="btn" disabled={!uploadExel}>
                      Загрузить YML файл
                    </button> */}
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
                    // disabled={!uploadExel}
                    ></MyButton>
                    {/* <button className="btn" disabled={!uploadExel}>
                      Загрузить YML файл
                    </button> */}
                  </div>
                )}
              </Dropzone>

              {/* {!haveRozetkaAkaunt ? (
                <Tooltip title="Поля логин и пароль с «Rozetka marketplace» не заполнены">
                  <MyButton
                    myvariant="withIcon"
                    title="Загрузить с Rozetka"
                    disabled={!uploadRozetka}
                  ></MyButton>
                </Tooltip>
              ) : (
                <Dropzone
                  disabled={!uploadRozetka}
                  onDrop={e => this.handleUploadFile(e, 'rozetka')}
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <input {...getInputProps()} />
                      <MyButton
                        title="Загрузить с Rozetka"
                        disabled={!uploadRozetka}
                        myvariant="withIcon"
                      ></MyButton>
                    </div>
                  )}
                </Dropzone>
              )} */}

              {!havePromAkaunt ? (
                <Tooltip title="Токин с «Prom.ua» не заполнен">
                  <MyButton
                    // style={{ display: 'inline-block' }}
                    myvariant="withIcon"
                    // disabled
                    title="Загрузить с Prom.ua"
                    disabled={!uploadProm}
                  ></MyButton>
                  {/* <Button></Button> */}
                </Tooltip>
              ) : (
                  // <Dropzone
                  //   disabled={!uploadProm}
                  //   onDrop={e => this.handleUploadFileProm(e, 'prom')}
                  //   multiple={false}
                  // >
                  //   {({ getRootProps, getInputProps }) => (
                  //     <div {...getRootProps({ className: 'dropzone' })}>
                  //       <input {...getInputProps()} />
                  <MyButton
                    onClick={this.handleUploadFileProm}
                    title="Загрузить с Prom.ua"
                    disabled={!uploadProm}
                    myvariant="withIcon"
                  // classes={this.props.classes}
                  ></MyButton>
                  // {/* <button className="btn" disabled={!uploadRozetka}>
                  //   Загрузить с Rozetka
                  // </button> */}
                  //     </div>
                  //   )}
                  // </Dropzone>
                )}


              <NavLink to='/admin/products/download_history'>
                <MyButton
                  title="История загрузок"
                // onClick={() =>
                //   this.props.history.push('/admin/products/download_history')
                // }
                ></MyButton>
              </NavLink>
            </div>
            <MyTable
              {...config}
              tableTypes={TableTypes.allProductsContractor}
              showCheckbox
              showProductPriceContractor
              showRecommendedPrice
              filters={filters}
              openProduct={this.handleOpenWindow}
              handleDeleteProducts={this.handleRemoveProducts}
              edit
              changeFilters={this.handleChangeFilters}
              rowSelection={rowSelection}
              products={products}
              loading={loading}
              handleChangeTable={this.handleChangeTable}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default compose(
  withStyles(rootStyle),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ContractorProducts);
