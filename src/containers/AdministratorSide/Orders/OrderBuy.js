import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
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
import SearchOrders from "../ContractorOrders/SearchOrders";
import { getOrders, passToContractor, getOrdersSelf } from 'actions/ordersAction';
import { statusList } from './statusList';
import CreateTTN from './CreateTTN';
import { getImageInProduct } from '../../../utils/helpers';

import styles from './Orders.module.css'

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
  '29': '#999',
};

const columns = [
  {
    title: '№ заказа',
    dataIndex: 'id',
    key: 'order-number',
    render: (id) => (
      <span>№ {id}</span>
    )
  },
  {
    title: 'Дата заказа',
    dataIndex: 'dateCreate',
    key: 'created',
    render: (date, order) => (
      <span>
        {moment(date).format('DD-MM-YYYY HH:mm')}
        <img style={{ width: '30px', margin: '0 0 0 30px' }}
        />
      </span>
    )
  },
  {
    title: 'К-во',
    dataIndex: 'quantity',
    key: 'quantity',
    render: (item, order) => (
      <span className='product-avatar'>
        {order.count} шт.
      </span>
    )
  },
  {
    title: 'Сумма',
    dataIndex: 'totalPrice',
    key: 'totalPrice'
  },
  {
    title: 'Статус заказа',
    dataIndex: 'statusHistory',
    key: 'status',
    render: (status, order) => {
      let selectedStatus = statusList.find(item => {
        if (order.statusHistory.length > 0) {
          return item.id === order.statusHistory[0].statusId
        }
      }) || {
        title: '',
      };
      let dates = [];
      let newHistory = [];

      const sortedArr = order.statusHistory.sort(function (a, b) {
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

              dates = []
            }
          }
        }
      }
      return (
        <span className={styles.orderStatusInTable}>
          <span style={{ color: colors[status], fontWeight: 'bold' }}>{selectedStatus.title}
          </span>
          <Popover content={(
            <div>
              <Timeline>
                {newHistory.map((item, index) => {
                  const getStatus = (id) => {
                    let status = statusList.find(status => status.id === id);
                    return status.title;
                  };

                  return (
                    <Timeline.Item>
                      <strong> {moment(item.title).format('DD-MM-YYYY')}</strong>
                      {item.date.map((date, index) => (
                        <div key={index}>
                          {moment(date.created).format('HH:mm')} - {getStatus(date.statusId)}
                        </div>
                      ))}
                    </Timeline.Item>
                  )
                })}
              </Timeline>
            </div>
          )}>
            <Icon type="clock-circle" style={{ color: '#4A90E2' }} />
          </Popover>
        </span>
      )
    }
  },
];

class OrdersTable extends Component {
  state = {
    orders: [],

    count: 0,
    currentPage: 1,
  };

  getOrders = async () => {
    const { currentPage } = this.state;

    const url = `?page=${currentPage}`;

    const response = await getOrdersSelf(url);

    this.setState({
      orders: response.results,
      count: response.count
    })

  };

  handlePassToContractor = async (id) => {
    await passToContractor(id);

    notification.success({
      message: 'Отправлено',
    });

    this.getAllOrders();
  };

  handleChangeTable = (e, type) => {
    if (type === '1') {
      this.setState({
        currentPage: e.current
      }, () => this.getOrders({ page: e.current }))
    }
  };

  componentDidMount() {
    if (this.props.user.role !== 'CONTRACTOR') {
      this.getOrders();
    }
  };

  render() {
    const { count, page } = this.state;

    const config1 = {
      pagination: {
        pageSize: 10,
        total: count,
        current: page
      }
    };

    const { orders } = this.state;

    return (
      <div>
        <SearchOrders
          onSearch={this.getAllOrders}
        />

        <Tabs type="card">
          <TabPane tab="В обработке" key="1">
            <div>
              <Table
                {...config1}
                columns={columns}
                expandedRowRender={record => {
                  const { product, count, totalPrice, cityName, fullName, postOfficeName } = record;
                  return (
                    <div className={styles.orderDescription} >
                      <div className={styles.product}>
                        <div className={styles.productList}>
                          <div className={styles.productItem}>
                            <img className={styles.imgExpand} src={getImageInProduct(product)} alt='' />
                            <div>{product.name}</div>
                            <div className={styles.productPrice}>
                              <div>Товаров: {count}</div>
                              <div>Всего за товары: {totalPrice}</div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.delivery}>
                          <h4>Способ доставки:</h4>
                          {<span>
                            {`${postOfficeName}}`}<br />
                            {`${cityName}`} <br />
                            {`${fullName}`}
                          </span>}
                        </div>
                        <div className={styles.total}>
                          <h4>Всего к оплате:</h4>
                          {`${totalPrice} грн`}
                        </div>
                      </div>
                      <div className={styles.actions}>
                      </div>
                    </div>
                  )
                }}
                dataSource={orders}
                onChange={(e) => this.handleChangeTable(e, '1')}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);





