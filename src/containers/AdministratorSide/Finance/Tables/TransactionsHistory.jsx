import React, {Component} from 'react'
import styles from '../Finance.module.css'
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

import {transactionsFull} from '../../../../actions/userActions';


// const contractorData = [{
//     key: '1',
//     type: 'Пополнение баланса',
//     orderNumber: 12412412515,
//     date: '03/03/2019 14:12',
//     change: '+1000.00'
// }, {
//     key: '2',
//     type: 'Заказы',
//     orderNumber: 12412412516,
//     date: '04/03/2019 14:12',
//     change: '-50.00'
// }, {
//     key: '3',
//     type: 'Возвраты',
//     orderNumber: 12412412517,
//     date: '05/03/2019 14:12',
//     change: '+50.00'
// }];

const partnerData = [{
    key: '1',
    type: 'Покупка пакета',
    orderNumber: 12412412515,
    date: '03/03/2019 14:12',
    change: '+27000.00'
}, {
    key: '2',
    type: 'Заказы',
    orderNumber: 12412412516,
    date: '04/03/2019 14:12',
    change: '+3000.00'
}, {
    key: '3',
    type: 'Вывод средств',
    orderNumber: 12412412517,
    date: '05/03/2019 14:12',
    change: '-1000.00'
}, {
    key: '4',
    type: 'Возвраты',
    orderNumber: 12412412518,
    date: '06/03/2019 14:12',
    change: '-1000.00'
}];


class TransactionsHistory extends Component {
    state = {
        loading: true,
        results: [],
    }

    // updateTableData = async () => {
    //     const {
    //       currentPage,
    //       pageSize,
    //     } = this.state;
    
    //     const url = `?page_size=${pageSize}&page=${currentPage}`;
    
    //     const newData = await transactionsFull(url);
    
    //     this.setState({
    //       loading: false,
    //       products: all.results,
    //       count: all.count,
    //       inStock: inStock.count,
    //       notInStock: notInStock.count
    //     });
    //   };
    

    handleChangeTable = async pagination => {
        this.setState({ loading: true, });
        const query = `?page=${pagination.current}`
        const data = await transactionsFull(query);
        this.setState({...data, loading: false});
      };
    
    async componentDidMount () {
        const data = await transactionsFull();
        console.log('data', data)
        this.setState({...data, loading: false});
    }

    render() {
        const { count, loading, results } = this.state;
        
        return this.props.role === 'PARTNER' 
            ? 
                <div className={styles.transactionsHistory}>
                    <Table 
                        {...CONFIG('операций')} 
                        dataSource={partnerData} 
                        columns={FINANCE_COLUMNS.partner.transactionsHistory} />
                </div>
            : 
                <div className={styles.transactionsHistory}>
                    <Table 
                        {...CONFIG('операций', count)} 
                        loading={loading}
                        dataSource={results} 
                        columns={FINANCE_COLUMNS.contractor.transactionsHistory}
                        onChange={this.handleChangeTable} />
                </div>
            ;
    }
}

export default TransactionsHistory;