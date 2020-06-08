import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Icon, Popover, Timeline, Tabs, Button, Tooltip } from 'antd';
import SearchOrders from './SearchOrders';
import moment from 'moment';
import { getContractorOrders } from 'actions/ordersAction';
import { getOrdersSelf } from 'actions/ordersAction';
import { statusList } from 'constants/ordersStatusList';

import Paper from '@material-ui/core/Paper';
import { getImageInProduct } from 'utils/helpers';

import defaultImage from '../../../img/pictures/no-productimage.png';
import CreateTTN from '../Orders/CreateTTN';
import CreateTTNOrderSelf from './components/CreateTTNOrderSelf/CreateTTNOrderSelf';
import OrderSelfExpended from './components/OrderSelfExpended/OrderSelfExpended';
import OrderExpended from './components/OrderExpended/OrderExpended';
import Spinner from 'components/SpinnerAntd/Spinner';
import styles from './ContractorOrders.module.css';

const TabPanel = Tabs.TabPane;

const columns = [
  {
    title: '№ заказа',
    dataIndex: 'id',
    key: 'orderNumber',
    render: (date, item) => <span>{item.baseOrder.rozetkaId}</span>
  },
  {
    title: 'Дата заказа',
    dataIndex: 'dateOrder',
    key: 'dateOrder',
    render: (date, item) => (
      <span>{moment(item.baseOrder.created).format('DD-MM-YYYY HH:mm')}</span>
    )
  },
  {
    title: 'Товар',
    dataIndex: 'itemPhotos',
    key: 'itemPhotos',
    render: itemPhotos => (
      <span className="product-avatar">
        {/*<img*/}
        {/*src={itemPhotos.length > 0 ? itemPhotos[0].url : ''}*/}
        {/*alt=""/>*/}
      </span>
    )
  },
  {
    title: 'Сумма',
    dataIndex: 'amount',
    key: 'amount',
    render: (date, item) => <span>{item.baseOrder.amount}</span>
  },
  {
    title: 'Статус заказа',
    dataIndex: 'status',
    key: 'status',
    render: (status, order) => {
      let selectedStatus = statusList.find(item => item.id === status);
      // let dates = [];
      let newHistory = [];

      // const sortedArr = order.statusHistory.sort(function (a, b) {
      //     return new Date(b.created) - new Date(a.created);
      // });

      // for (let i = 0; i < order.statusHistory.length; i++) {
      //     if (sortedArr.length > 0) {
      //         if (sortedArr[i + 1]) {
      //             if (moment(sortedArr[i].created).format('YYYY-MM-DD') === moment(sortedArr[i + 1].created).format('YYYY-MM-DD')) {
      //                 dates.push(sortedArr[i]);
      //             } else {
      //                 dates.push(sortedArr[i]);
      //
      //                 newHistory.push({
      //                     title: moment(sortedArr[i].created).format('YYYY-MM-DD'),
      //                     date: dates
      //                 });
      //
      //                 dates = [];
      //             }
      //         }
      //     }
      // }

      return (
        <span>
          <span
            className={styles.status}
            style={{ color: status === 5 ? '#02850e' : '#cbbe1d' }}
          >
            {selectedStatus.title}
          </span>
          <Popover
            content={
              <div>
                <Timeline>
                  {newHistory.map(item => {
                    const getStatus = id => {
                      let status = statusList.find(status => status.id === id);
                      return status.title;
                    };

                    return (
                      <Timeline.Item>
                        <strong>
                          {' '}
                          {moment(item.title).format('DD-MM-YYYY')}
                        </strong>
                        {item.date.map(date => (
                          <div>
                            {moment(date.created).format('HH:mm')} -{' '}
                            {getStatus(date.statusId)}
                          </div>
                        ))}
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              </div>
            }
          >
            <Icon type="clock-circle" style={{ color: '#4A90E2' }} />
          </Popover>
        </span>
      );
    }
  }
];

const columnsSelfRepayment = [
  {
    title: '№ заказа',
    dataIndex: 'id',
    key: 'orderNumber',
    render: (id, item) => <span>{id}</span>
  },
  {
    title: 'Дата заказа',
    dataIndex: 'dateCreate',
    key: 'dateOrder',
    render: (dateCreate, item) => (
      <span>{moment(dateCreate).format('DD-MM-YYYY HH:mm')}</span>
    )
  },
  {
    title: 'Товар',
    dataIndex: 'product',
    key: 'itemPhotos',
    render: (itemPhotos, order) => (
      <div className={styles.wrapImg}>
        <img
          className={styles.img}
          src={getImageInProduct(order.product)}
          alt="productAvatar"
        />
      </div>
    )
  },
  {
    title: 'Сумма',
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: (totalPrice, item) => <span>{totalPrice}</span>
  },
  {
    title: 'Статус заказа',
    dataIndex: 'statusHistory',
    key: 'status',
    render: (statusHistory, order) => {
      const statusId = statusHistory[0] ? statusHistory[0].statusId : 1;

      let selectedStatus = statusList.find(item => item.id === statusId);
      // let dates = [];
      let newHistory = [];

      // const sortedArr = order.statusHistory.sort(function (a, b) {
      //     return new Date(b.created) - new Date(a.created);
      // });

      // for (let i = 0; i < order.statusHistory.length; i++) {
      //     if (sortedArr.length > 0) {
      //         if (sortedArr[i + 1]) {
      //             if (moment(sortedArr[i].created).format('YYYY-MM-DD') === moment(sortedArr[i + 1].created).format('YYYY-MM-DD')) {
      //                 dates.push(sortedArr[i]);
      //             } else {
      //                 dates.push(sortedArr[i]);
      //
      //                 newHistory.push({
      //                     title: moment(sortedArr[i].created).format('YYYY-MM-DD'),
      //                     date: dates
      //                 });
      //
      //                 dates = [];
      //             }
      //         }
      //     }
      // }

      return (
        <span>
          <span
            className={styles.status}
            style={{ color: statusId === 5 ? '#02850e' : '#cbbe1d' }}
          >
            {selectedStatus.title}
          </span>
          <Popover
            content={
              <div>
                <Timeline>
                  {newHistory.map(item => {
                    const getStatus = id => {
                      let status = statusList.find(status => status.id === id);
                      return status.title;
                    };

                    return (
                      <Timeline.Item>
                        <strong>
                          {moment(item.title).format('DD-MM-YYYY')}
                        </strong>
                        {item.date.map(date => (
                          <div>
                            {moment(date.created).format('HH:mm')} -{' '}
                            {getStatus(date.statusId)}
                          </div>
                        ))}
                      </Timeline.Item>
                    );
                  })}
                </Timeline>
              </div>
            }
          >
            <Icon type="clock-circle" style={{ color: '#4A90E2' }} />
          </Popover>
        </span>
      );
    }
  }
];

class ContractorOrders extends Component {
  state = {
    orders: [],
    baseOrder: {},
    loading: false,
    count: 0,
    currentPage: 1,
    tabIdx: '1'
  };

  componentDidMount() {
    this.getOrders();
  }

  getOrdersSelf = async ({ page } = {}) => {
    const currentPage = page || this.state.currentPage;

    const url = `?page=${currentPage}`;

    this.startLoader();

    const response = await getOrdersSelf(url);

    this.setState({
      orders: response.results,
      count: response.count,
      loading: false
    });
  };

  getOrders = async ({
    id,
    minDate,
    maxDate,
    status,
    userFio,
    userPhone,
    key,
    page
  } = {}) => {
    const statusGroup = key || this.state.tabIdx;
    const currentPage = page || this.state.currentPage;
    const urlParams = [
      id ? `&id=${id}` : '',
      minDate ? `&min_date=${minDate}` : '',
      maxDate ? `&max_date=${maxDate}` : '',
      status ? `&status=${status}` : '',
      userFio ? `&user_fio=${userFio}` : ''
      // user_phone ? `&user_phone=${user_phone}` : ''
    ];
    const url = `?status_group=${statusGroup}&page=${currentPage +
      urlParams.join('')}`;

    this.startLoader();

    const { results, count } = await getContractorOrders(url);

    this.setState({
      orders: results,
      count: count,
      loading: false
    });
  };

  callingOrders = params => {
    const currentTab = this.state.tabIdx;
    if (currentTab === '4') {
      this.getOrdersSelf(params);
    } else {
      this.getOrders(params);
    }
  };

  handleChangePage = ({ current }) => {
    this.callingOrders({ current });
  };

  handleFilterOrders = params => {
    this.callingOrders(params);
  };

  handleChangeTab = key => {
    if (key === '4') {
      this.getOrdersSelf();
    } else {
      this.getOrders({ key });
    }
  };

  startLoader = () => this.setState({ loading: true, orders: [] });

  updateTtnOrder = (id, ttn) => {
    this.setState(prevState => ({
      orders: prevState.orders.map(order =>
        order.id === id ? { ...order, ttn } : order
      )
    }));
  };

  handleChange = key => {
    this.setState({ tabIdx: key });
  };

  render() {
    const { count, currentPage, tabIdx, orders, loading } = this.state;

    const config = {
      pagination: {
        pageSize: 10,
        total: count,
        current: currentPage
      }
    };

    return (
      <div className="page">
        <h3 className="page-title">Мои заказы</h3>
        <SearchOrders onSubmit={this.handleFilterOrders} />
        <Tabs
          type="card"
          defaultActiveKey="1"
          value={tabIdx}
          onChange={this.handleChange}
          onTabClick={this.handleChangeTab}
        >
          {/* <TabPanel tab="В обработке" key="1">
            {tabIdx === '1' && <Table
              {...config}
              columns={columns}
              dataSource={orders}
              loading={loading}
              onChange={e => this.handleChangePage(e)}
              expandedRowRender={order => console.log('order', order) || <div>hey</div>} />}
          </TabPanel> */}
          <TabPanel tab="В обработке" key="1">
            {tabIdx === '1' && (
              <Table
                {...config}
                columns={columns}
                dataSource={orders}
                loading={loading}
                onChange={e => this.handleChangePage(e)}
                expandedRowRender={record => {
                  return (
                    // <div>{record.baseOrder.amount}</div>
                    <div className={styles.orderDescription}>
                      <div className={styles.product}>
                        <div className={styles.productList}>
                          {record.itemProducts.map(product => (
                            <div className={styles.productItem}>
                              <img
                                style={{ width: 50 }}
                                src={
                                  product.imageUrls
                                    ? product.imageUrls[0].url
                                    : ''
                                }
                                alt=""
                              />

                              <div>{product.name}</div>

                              <div className={styles.productPrice}>
                                <div>Товаров: {product.quantity}</div>
                                <div>Всего за товары: {product.price}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className={styles.delivery}>
                          <h4>Способ доставки:</h4>
                          {record.delivery && (
                            <span>
                              {`${record.delivery.deliveryServiceName}, №${record.delivery.placeNumber}`}
                              <br />
                              {` ${record.delivery.city}`} <br />
                              {` ${record.delivery.recipientTitle}`}
                            </span>
                          )}
                        </div>
                        {record.ttn && (
                          <div className={styles.delivery}>
                            <h4>ТТН:</h4>
                            <span>{record.ttn}</span>
                          </div>
                        )}

                        <div className={styles.total}>
                          <h4>Всего к оплате:</h4>
                          {`${record.baseOrder.amount} грн`}
                        </div>
                      </div>

                      <div className={styles.actions}>
                        <Tooltip
                          title="Заказу уже присвоен ТТН"
                          trigger={record.ttn ? 'hover' : 'none'}
                        >
                          <Button
                            className="createTTN_mainButton sendToContractor"
                            onClick={() =>
                              this.handlePassToContractor(record.id)
                            }
                            disabled={record.ttn}
                          >
                            Отправить поставщику
                          </Button>
                        </Tooltip>
                        <Tooltip
                          title="Заказу уже присвоен ТТН"
                          trigger={record.ttn ? 'hover' : 'none'}
                        >
                          {!record.ttn && (
                            <Button className="createTTN_mainButton searchOtherContractor">
                              <Link
                                to={{
                                  pathname: 'categories',
                                  state: {
                                    filters: {
                                      name: record.itemProducts[0].name
                                    }
                                  }
                                }}
                              >
                                Найти товар у другого поставщика
                              </Link>
                            </Button>
                          )}
                        </Tooltip>
                        <CreateTTN
                          contractorOrder={record.itemProducts}
                          order={record.baseOrder}
                          refreshData={this.getOrders1}
                        />
                      </div>
                    </div>
                  );
                }}
              />
            )}
          </TabPanel>
          <TabPanel tab="Успешно завершены" key="2">
            {tabIdx === '2' && (
              <Table
                {...config}
                columns={columns}
                dataSource={orders}
                loading={loading}
                onChange={e => this.handleChangePage(e)}
                expandedRowRender={record => <span>{record.description}</span>}
              />
            )}
          </TabPanel>
          <TabPanel tab="Неуспешно завершены" key="3">
            {tabIdx === '3' && (
              <Table
                {...config}
                columns={columns}
                dataSource={orders}
                loading={loading}
                onChange={e => this.handleChangePage(e)}
                expandedRowRender={record => <span>{record.description}</span>}
              />
            )}
          </TabPanel>
          <TabPanel tab="Заказы самовыкупа" key="4">
            {tabIdx === '4' && (
              <Table
                {...config}
                columns={columnsSelfRepayment}
                dataSource={orders}
                loading={loading}
                onChange={e => this.handleChangePage(e)}
                expandedRowRender={order => (
                  <OrderSelfExpended
                    order={order}
                    ActionButtons={[
                      <CreateTTNOrderSelf
                        updateTtnOrder={this.updateTtnOrder}
                        order={order}
                      />
                    ]}
                  />
                )}
              />
            )}
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorOrders);
