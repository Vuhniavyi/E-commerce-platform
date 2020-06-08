import React, { Component } from 'react';
import styles from './Finance.module.css';
import { Table } from 'antd';
import { COLUMNS } from '../../../helpers/TabColumns';
import { CONFIG } from '../../../helpers/TabConfig';
import * as userActions from '../../../actions/userActions';

class TableTemplate extends Component {
  state = {
    columns: [],
    count: 0,
    dataSource: [],
    loading: true,
  }

  // const config = {
  //   columns: COLUMNS[moduleName][userRole.toLowerCase()][tableName],
  //   dataSource: data.results,
  //   ...CONFIG('транзакций', data.count),
  // }

  // handleChangeTable = async pagination => {
  //   const {action} = this.props;  
  //   this.setState({ loading: true, });
  //   const query = `?page=${pagination.current}`
  //   const data = await actions[action](query);
  //   this.setState({
  //     dataSource: data.results,
  //     loading: false,
  //   });
  // };

  // LIFECYCLE METHODS
  componentWillMount() {
    const { moduleName, tableName, user } = this.props;
    const columns = COLUMNS[moduleName][user.role.toLowerCase()][tableName];
    this.setState({
      columns,
    });
  }

  async componentDidMount() {
    const { actions } = this.props; // в компонент может м
    const getData = action => userActions[action]();
    const [...data] = await Promise.all(actions.map(getData));
    const dataSource = data.reduce((acc, el) => [...acc, ...el.results], []);
    // const count = data.reduce((acc, el) => acc+el.count, 0);
    const count = dataSource.length;
    // // const {count, results} = await actions[action](); //делаем запрос данных
    this.setState({
      count,
      dataSource,
      loading: false,
    });
  }

  render() {
    const { count } = this.state;
    const { units } = this.props

    return (
      <div className={styles.invoiceForPayment}>
        <Table {...this.state}
          {...CONFIG(units, count)}
        // onChange={this.handleChangeTable}
        />
      </div>
    )
  }
};

export default TableTemplate;