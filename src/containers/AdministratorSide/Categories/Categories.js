import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Icon as MaterialIcon, Paper } from '@material-ui/core';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';

import {
  getAllProducts,
  copyProducts
} from '../../../actions/productsActions';
import MyTable from '../components/Table/MyTable';
import MyButton from '../components/Buttons/Button';
import AddProductsModal from './components/AddProductsModal';
import tableTypes from 'constants/tableTypes';
import styles from './Categories.module.css';

let count = 0;
class Categories extends Component {
  state = {
    selectedIds: [],
    products: [],
    loading: true,
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
    selectedProducts: [],
    count: 0,
    pageSize: 10,
    currentPage: 1,
    visibleModal: false
  };

  parseProducts = products => {
    const selectedIds = [];
    const selectedProducts = [];

    products.forEach(product => {
      selectedIds.push(product.id);
      selectedProducts.push({ ...product, newCount: product.count });
    });

    return [selectedIds, selectedProducts]
  }

  filterSelectedProducts = id => {
    const { selectedProducts } = this.state;
    const newSelectedIds = [];
    const newSelectedProducts = [];

    selectedProducts.forEach(product => {
      if (product.id !== id) {
        newSelectedIds.push(product.id);
        newSelectedProducts.push({ ...product, newCount: product.count })
      }
    });

    return [newSelectedIds, newSelectedProducts];
  }

  onSelectAllChange = event => {
    const { products } = this.state;
    if (event.target.checked) {
      const [selectedIds, selectedProducts] = this.parseProducts(products);

      return this.setState({
        selectedIds,
        selectedProducts,
      });
    }
    this.setState({ selectedIds: [], selectedProducts: [] });
  };

  onSelectChange = (id) => {
    const { selectedIds, products } = this.state;
    const isSelectedId = selectedIds.includes(id);

    if (isSelectedId) {
      const [newSelectedIds, newSelectedProducts] = this.filterSelectedProducts(id);
      this.setState({ selectedIds: newSelectedIds, selectedProducts: newSelectedProducts });
    } else {
      const product = products.find(p => p.id === id);

      this.setState(({ selectedIds, selectedProducts }) => ({
        selectedIds: [...selectedIds, id],
        selectedProducts: [
          ...selectedProducts,
          { ...product, newCount: product.count }
        ]
      }));
    }
  };

  getProducts = async () => {
    this.setState({ loading: true });
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
        user_id
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
      user_id ? `&user_id=${user_id}` : ''
    ];

    const url = `?page_size=${pageSize}&page=${currentPage +
      urlParams.join('')}`;
    const res = await getAllProducts(url);

    this.setState({
      loading: false,
      products: res.results,
      count: res.count
    });
  };

  handleChangeTable = (page, current) => {
    this.setState(
      {
        currentPage: current + 1,
        pageSize: this.state.pageSize
      },
      () => this.getProducts()
    );
  };
  handleChangeRowsPerPage = event => {
    this.setState(
      {
        pageSize: +event.target.value
      },
      () => this.getProducts()
    );
  };
  handleCopyProducts = async () => {
    const products = this.state.selectedProducts.map(p => ({
      id: p.id,
      count: p.newCount
    }));
    await copyProducts({
      products
    });

    this.closeModal();
    this.getProducts();

    this.setState({
      selectedIds: [],
      selectedProducts: []
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
      () => this.getProducts()
    );
  };

  handleSelectCategory = category => {
    this.setState(
      {
        filters: {
          ...this.state.filters,
          category_id: category.key
        }
      },
      () => this.getProducts()
    );
  };

  openModal = () =>
    this.setState({
      visibleModal: true
    });

  closeModal = () =>
    this.setState({
      visibleModal: false
    });

  onChangeCountSelectedProducts = id => event => {
    const product = this.state.selectedProducts.find(
      product => product.id === id
    );

    const value =
      event.target.value === ''
        ? event.target.value
        : parseInt(event.target.value);

    if ((value > 0 && value <= product.count) || value === '') {
      product.newCount = value;
    }

    this.setState({
      selectedProducts: this.state.selectedProducts.map(p =>
        p.id === product.id ? product : p
      )
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
        () => this.getProducts()
      );
    }
  }

  async componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate() {
    count++
  }

  render() {
    const {
      selectedIds,
      products,
      count,
      pageSize,
      currentPage,
      filters,
      loading,
      visibleModal,
      selectedProducts
    } = this.state;

    const rowSelection = {
      selectedIds,
      onSelectChange: this.onSelectChange,
      hideDefaultSelections: true,
      onAllSelection: this.onSelectAllChange
    };

    const config = {
      pagination: {
        pageSize: pageSize,
        pageSizeOptions: [10, 20, 50, 100, 500],
        showSizeChanger: true,
        total: count,
        current: currentPage
      }
    };

    return (
      <div className={styles.main}>
        <div>
          <div className={`page-title ${styles.top}`}>
            Все Товары
            <Tooltip title="Инструкция по добавлению товаров." placement="top">
              <MaterialIcon
                // onClick={() =>
                //   this.props.history.push('/admin/instruction_sellers')
                // }
                className={styles.questionIcon}
              // style={{ display: 'inline-block', marginLeft: 50 }}
              >
                help
              </MaterialIcon>
            </Tooltip>
          </div>
        </div>
        <div className="page">
          <div className={`${styles.categories} page-content`}>
            <div className={styles.categoriesBlock}>
              <div className={styles.actions}>
                <Paper className={styles.totalProducts}>
                  <div>
                    Всего товаров: <span>{count}</span>
                  </div>
                </Paper>
                <MyButton
                  disabled={selectedIds.length === 0}
                  myvariant="withIcon"
                  title="Добавить в мои товары"
                  onClick={this.openModal}
                />

                <MyButton
                  disabled
                  myvariant="withIcon"
                  title="Добавить в мой магазин"
                  onClick={this.handleCopyProducts}
                />
              </div>
              <AddProductsModal
                products={selectedProducts}
                onChangeCountSelectedProducts={this.onChangeCountSelectedProducts}
                modalProps={{
                  "width": 925,
                  "title": <h2 className={styles.antModalTitle}>Добавить в мои товары</h2>,
                  "visible": visibleModal,
                  "onCancel": this.closeModal,
                  "onOk": this.handleCopyProducts
                }}
              />
             
              <MyTable
                {...config}
                tableTypes={tableTypes.allProductsPartner}
                showCheckbox
                showProductPrice
                showIdContractor
                // editProduct={() => this.openProduct(product)}
                products={products}
                rowSelection={rowSelection}
                isAllProducts
                filters={filters}
                loading={loading}
                changeFilters={this.handleChangeFilters}
                handleChangeTable={this.handleChangeTable}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              // removeProducts={this.handleRemoveProducts}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, null)(Categories);
