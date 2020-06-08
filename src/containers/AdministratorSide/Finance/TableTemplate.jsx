import React, { Component } from 'react';
import styles from './Finance.module.css';
import { Table, Icon } from 'antd';
import { COLUMNS } from '../../../helpers/TabColumns';
// import { CONFIG } from '../../../helpers/TabConfig';
import * as userActions from '../../../actions/userActions';
import * as productsActions from '../../../actions/productsActions';
import { Paper } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import Icons from '../components/Icons/Icons';
import statusesTransactionContractor from 'constants/statusesTransactionContractor';
import statusesTransactionPartner from 'constants/statusesTransactionPartner';

const baseQuery = '?page=1&page_size=10';
const antIcon = <Icon type="loading" style={{ fontSize: 42 }} spin />;

class TableTemplate extends Component {
  state = {
    columns: [],
    count: 0,
    dataSource: [],
    loading: { indicator: antIcon, spinning: true }
  };

  // const config = {
  //   columns: COLUMNS[moduleName][userRole.toLowerCpase()][tableName],
  //   dataSource: data.results,
  //   ...CONFIG('транзакций', data.count),
  // }

  handleChangeTable = async (pagination, filters, sorter, extra) => {
    this.setState({ loading: { indicator: antIcon, spinning: true } });
    const { action } = this.props;
    const { current, pageSize } = pagination;
    const filtersToString = Object.entries(filters)
      .map(fil =>
        fil
          .map((el, i, arr) =>
            i % 2 ? el.map(a => `&${arr[i - 1]}=${a}`).join('') : ''
          )
          .join('')
      )
      .join('');
    const query = `?page=${current}&page_size=${pageSize}${this.props.query}${filtersToString}`;

    const { count = 0, results = [] } = await userActions[action](query);
    const dataSource = results;

    this.setState({
      count,
      dataSource,
      loading: { spinning: false }
    });
  };

  parsedTransactionAmount = units => {
    let unitsResult;
    console.log('units', units);

    units.map(i => {
      const unitAmount = i.amount;
      const unitAgentCommission = i.agentCommission;
      console.log('amount', unitAmount, unitAgentCommission);

      unitsResult =
        unitAgentCommission && unitAgentCommission.length > 0
          ? unitAgentCommission
          : unitAmount;
      console.log('transactionResult', unitsResult);

      return { ...i, unitsResult };
    });
  };

  parsedTransactionStatus = transactions => {
    let transactionInfo;
    console.log('transactionInfo', transactions);

    return this.props.user.role === 'CONTRACTOR'
      ? transactions.map(t => {
          const status = t.transactionStatus;
          switch (status) {
            case 0:
              transactionInfo = statusesTransactionContractor[status];
              break;
            case 1:
              transactionInfo = statusesTransactionContractor[status];
              break;
            case 2:
              transactionInfo = statusesTransactionContractor[status];
              break;
            default:
              transactionInfo = { name: '-', color: 'black' };
              break;
          }
          return { ...t, transactionInfo };
        })
      : transactions.map(t => {
          const status = t.transactionStatus;
          switch (status) {
            case 0:
              transactionInfo = statusesTransactionPartner[status];
              break;
            case 1:
              transactionInfo = statusesTransactionPartner[status];
              break;
            case 2:
              transactionInfo = statusesTransactionPartner[status];
              break;
            default:
              transactionInfo = { name: '-', color: 'black' };
              break;
          }
          return { ...t, transactionInfo };
        });

    //  return transactions.map(t => {
    //    const status = t.transactionStatus;
    //     switch (status) {
    //       case 0:
    //         transactionStatus = statusesTransactionPartner[status];
    //         break;
    //       case 1:
    //         transactionStatus = statusesTransactionPartner[status];
    //         break;
    //       case 2:
    //         transactionStatus = statusesTransactionPartner[status];
    //         break;
    //       default:
    //         transactionStatus = '-';
    //         break;
    //     }

    //     return { ...t, transactionStatus };
    //   });
  };

  // LIFECYCLE METHODS
  componentWillMount() {
    const { moduleName, tableName, user } = this.props;
    console.log('this.props', this.props);

    const columns = COLUMNS[moduleName][user.role.toLowerCase()][tableName];
    this.setState({
      columns
    });
  }

  async componentDidMount() {
    const { action = '', query = '' } = this.props;

    let data;
    switch (action) {
      case 'transactionsHistory':
        const { count = 0, results = [] } = await userActions[action](
          baseQuery + query
        ); // делаем запрос данных
        console.log('results', results);
        this.setState({
          count,
          dataSource: this.parsedTransactionStatus(results),
          loading: { spinning: false }
        });
        break;
      case 'getDownloadsStatus':
        data = await productsActions[action]();
        data.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));

        this.setState({
          count: data.length,
          dataSource: data,
          loading: { spinning: false }
        });
        break;
      case 'productsActions':
        data = await productsActions[action]();
        data.sort((a, b) => Date.parse(b.created) - Date.parse(a.created));

        this.setState({
          count: data.length,
          dataSource: data,
          loading: { spinning: false }
        });
        break;
      default:
        break;
    }
  }

  render() {
    const { units, willHaveFullData = false } = this.props;
    const total = this.state.count;

    const CONFIG = {
      // pagination: {
      defaultCurrent: 1,
      pageSizeOptions: ['10', '20', '50', '250', '500'],
      showSizeChanger: true,
      showTotal: (total, range) =>
        `${range[0]}-${range[1]} из ${total} ${units}`,
      total
      // }
    };

    return (
      <div className={styles.invoiceForPayment}>
        <Paper className={styles.invoiceForPaymentIn}>
          <Table
            pagination={false}
            // {...CONFIG}
            {...this.state}
            locale={{
              emptyText: (
                <div className={styles.nodata}>
                  <Icons
                    variants="default"
                    icon="warning"
                    style={{ fontSize: 42 }}
                  />{' '}
                  Данный отсутствуют!
                </div>
              )
            }}
            onChange={willHaveFullData ? null : this.handleChangeTable}
          />
          <TablePagination
            rowsPerPageOptions={CONFIG.pageSizeOptions}
            count={CONFIG.total}
            onChangePage={
              willHaveFullData ? () => null : this.handleChangeTable
            }
            page={0}
            rowsPerPage={10}
          />
        </Paper>
      </div>
    );
  }
}

export default TableTemplate;
