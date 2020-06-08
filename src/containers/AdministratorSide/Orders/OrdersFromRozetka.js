import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Button,
  Tabs,
  Table,
  Tooltip,
  Icon,
  Popover,
  Timeline,
  notification
} from 'antd';
import moment from 'moment';

// import SearchOrders from "./SearchOrders";
import SearchOrders from '../ContractorOrders/SearchOrders';
import {
  getOrders,
  passToContractor,
  sendToContractor
} from '../../../actions/ordersAction';
import { statusList } from './statusList';
import CreateTTN from './CreateTTN';

import styles from './Orders.module.css';

const TabPane = Tabs.TabPane;

const colors = {
  '1': '#cbbe1d',
  '2': '#770b85',
  '5': '#fb3f4c',
  '6': '#12bd0d',
  '11': '#fb3f4c',
  '12': '#999',
  '18': '#fb3f4c',
  '26': '#3860f6',
  '28': '#fb3f4c',
  '29': '#999'
};

const columns = [
  {
    title: '№ заказа',
    dataIndex: 'rozetkaId',
    key: 'rozetkaId',
    render: id => <span>№ {id}</span>
  },
  {
    title: 'Дата заказа',
    dataIndex: 'created',
    key: 'created',
    render: (date, order) => (
      <span>
        {moment(date).format('DD-MM-YYYY HH:mm')}
        <img
          style={{ width: '30px', margin: '0 0 0 30px' }}
          src={order.items.length > 0 ? order.items[0].imageUrl : ''}
          alt=""
        />
      </span>
    )
  },
  {
    title: 'К-во',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (item, order) => (
      <span className="product-avatar">
        {order.items.length > 0 ? order.items[0].quantity : '0'} шт.
      </span>
    )
  },
  {
    title: 'Сумма',
    dataIndex: 'cost',
    key: 'cost'
  },
  {
    title: 'Статус заказа',
    dataIndex: 'status',
    key: 'status',
    render: (status, order) => {
      let selectedStatus = statusList.find(item => item.id === order.status);
      let dates = [];
      let newHistory = [];

      const sortedArr = order.statusHistory.sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
      });

      for (let i = 0; i < order.statusHistory.length; i++) {
        if (sortedArr.length > 0) {
          if (sortedArr[i + 1]) {
            if (
              moment(sortedArr[i].created).format('YYYY-MM-DDTHH:mm:ss') ===
              moment(sortedArr[i + 1].created).format('YYYY-MM-DDTHH:mm:ss')
            ) {
              dates.push(sortedArr[i]);
            } else {
              dates.push(sortedArr[i]);
              newHistory.push({
                title: moment(sortedArr[i].created).format('YYYY-MM-DD'),
                date: dates
              });

              dates = [];
            }
          }
        }
      }
      return (
        <span className={styles.orderStatusInTable}>
          <span style={{ color: colors[status], fontWeight: 'bold' }}>
            {selectedStatus.title}
          </span>
          <Popover
            content={
              <div>
                <Timeline>
                  {newHistory.map((item, index) => {
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
                        {item.date.map((date, index) => (
                          <div key={index}>
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

class OrdersFromRozetka extends Component {
  state = {
    orders: [],

    count: 0,
    currentPage1: 1,
    currentPage2: 1,
    currentPage3: 1
  };

  getOrders1 = async ({
    id,
    min_date,
    max_date,
    status,
    user_fio,
    user_phone
  }) => {
    const { currentPage1 } = this.state;

    const urlParams = [
      id ? `&id=${id}` : '',
      min_date ? `&min_date=${min_date}` : '',
      max_date ? `&max_date=${max_date}` : '',
      status ? `&status=${status}` : '',
      user_fio ? `&user_fio=${user_fio}` : '',
      user_phone ? `&user_phone=${user_phone}` : ''
    ];

    const url1 = `?status_group=1&page=${currentPage1 + urlParams.join('')}`;
    const res1 = await getOrders(url1);

    this.setState({
      orders1: res1.results,

      count1: res1.count
    });
    console.log('this.state', this.state);
  };

  getOrders2 = async ({
    id,
    min_date,
    max_date,
    status,
    user_fio,
    user_phone
  }) => {
    const { currentPage2 } = this.state;

    const urlParams = [
      id ? `&id=${id}` : '',
      min_date ? `&min_date=${min_date}` : '',
      max_date ? `&max_date=${max_date}` : '',
      status ? `&status=${status}` : '',
      user_fio ? `&user_fio=${user_fio}` : '',
      user_phone ? `&user_phone=${user_phone}` : ''
    ];

    const url2 = `?status_group=2&page=${currentPage2 + urlParams.join('')}`;
    const res2 = await getOrders(url2);

    this.setState({
      orders2: res2.results,
      count2: res2.count
    });
  };

  getOrders3 = async ({
    id,
    min_date,
    max_date,
    status,
    user_fio,
    user_phone
  }) => {
    const { currentPage3 } = this.state;

    const urlParams = [
      id ? `&id=${id}` : '',
      min_date ? `&min_date=${min_date}` : '',
      max_date ? `&max_date=${max_date}` : '',
      status ? `&status=${status}` : '',
      user_fio ? `&user_fio=${user_fio}` : '',
      user_phone ? `&user_phone=${user_phone}` : ''
    ];

    const url3 = `?status_group=3&page=${currentPage3 + urlParams.join('')}`;
    const res3 = await getOrders(url3);

    this.setState({
      orders3: res3.results,
      count3: res3.count
    });
  };

  handlePassToContractor = async (id, items) => {
    console.log('id', id, items);
    console.log('systemProduct', items[0].systemProduct);

    await sendToContractor({ orderId: id });

    items.map(item => {
      console.log('item', item);
      if (!item.systemProduct) {
        notification.error({
          message: `Товар ${item.name} не отправлен так как не имеет своего поставщика. Один или несколько товаров не имеют своего поставщика`
        });
      } else {
        notification.success({
          message: 'Отправлено'
        });
      }
      this.getAllOrders();
    });

    // await sendToContractor({orderId: id});

    // notification.success({
    //   message: 'Отправлено',
    // });

    // this.getAllOrders();
  };

  getAllOrders = () => {
    this.getOrders1('');
    this.getOrders2('');
    this.getOrders3('');
  };

  handleChangeTable = (e, type) => {
    if (type === '1') {
      this.setState(
        {
          currentPage1: e.current
        },
        () => this.getOrders1({ page: e.current })
      );
    } else if (type === '2') {
      this.setState(
        {
          currentPage2: e.current
        },
        () => this.getOrders2({ page: e.current })
      );
    } else if (type === '3') {
      this.setState(
        {
          currentPage3: e.current
        },
        () => this.getOrders3({ page: e.current })
      );
    }
  };

  componentDidMount() {
    if (this.props.user.role !== 'CONTRACTOR') {
      this.getAllOrders();
    }
  }

  render() {
    const {
        count1,
        count2,
        count3,
        currentPage1,
        currentPage2,
        currentPage3
      } = this.state,
      config1 = {
        pagination: {
          pageSize: 10,
          total: count1,
          current: currentPage1
        }
      },
      config2 = {
        pagination: {
          pageSize: 10,
          total: count2,
          current: currentPage2
        }
      },
      config3 = {
        pagination: {
          pageSize: 10,
          total: count3,
          current: currentPage3
        }
      };

    const { orders1, orders2, orders3 } = this.state;
    return (
      <div>
        <SearchOrders onSearch={this.getAllOrders} />

        <Tabs type="card">
          <TabPane tab="В обработке" key="1">
            <div>
              <Table
                {...config1}
                columns={columns}
                expandedRowRender={record => {
                  return (
                    <div className={styles.orderDescription}>
                      <div className={styles.product}>
                        <div className={styles.productList}>
                          {record.items.map(product => (
                            <div className={styles.productItem}>
                              <img
                                src={product.imageUrl ? product.imageUrl : ''}
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
                          {`${record.amount} грн`}
                        </div>
                      </div>

                      <div className={styles.actions}>
                        <Tooltip
                          title="Заказу уже присвоен ТТН"
                          trigger={record.ttn ? 'hover' : 'none'}
                        >
                          <Button
                            className="createTTN_mainButton sendToContractor"
                            // style={{
                            //   margin: 8,
                            //   padding: '0 8px',
                            //   width: 'auto',
                            //   backgroundColor: '#8bb8ec'
                            // }}
                            onClick={() =>
                              this.handlePassToContractor(
                                record.id,
                                record.items
                              )
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
                                      name: record.items[0].name
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
                          // buttonName="Отправить самому"
                          order={record}
                          refreshData={this.getOrders1}
                          // disabled={!this.props.user.apiKey}
                        />
                        {/* <button
                                                className="btn"
                                                style={{
                                                    margin: 8,
                                                    padding: '0 8px',
                                                    width: 'auto',
                                                    backgroundColor: '#2171cf'
                                                }}
                                                >
                                                Отправить самому
                                                </button> */}
                        {/* <button className='btn'
                                                        onClick={() => this.handlePassToContractor(record.id)}>Отправить
                                                    поставщику
                                                </button> */}
                      </div>
                    </div>
                  );
                }}
                dataSource={orders1}
                onChange={e => this.handleChangeTable(e, '1')}
              />
            </div>
          </TabPane>

          <TabPane tab="Успешно завершены" key="2">
            <div>
              <Table
                {...config2}
                columns={columns}
                expandedRowRender={record => <span>{record.description}</span>}
                dataSource={orders2}
                onChange={e => this.handleChangeTable(e, '2')}
              />
            </div>
          </TabPane>

          <TabPane tab="Неуспешно завершены" key="3">
            <div>
              <Table
                {...config3}
                columns={columns}
                expandedRowRender={record => <span>{record.description}</span>}
                dataSource={orders3}
                onChange={e => this.handleChangeTable(e, '3')}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OrdersFromRozetka);
