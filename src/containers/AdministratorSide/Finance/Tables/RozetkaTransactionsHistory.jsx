import React from 'react';
import styles from '../Finance.module.css';
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

// const data = [{
//   key: 1,
//   operationId: 'operationId',
//   date: 'date',
//   type: 'type',
//   orederId: 'orederId',
//   productId: 'productId',
//   price: 'price',
//   amount: 'amount',
//   total: 'total',
//   accrual: 'accrual',
//   writeOff: 'writeOff',
// },{
//   key: 2,
//   operationId: 'operationId',
//   date: 'date',
//   type: 'type',
//   orederId: 'orederId',
//   productId: 'productId',
//   price: 'price',
//   amount: 'amount',
//   total: 'total',
//   accrual: 'accrual',
//   writeOff: 'writeOff',
// }];

const RozetkaTransactionHistory = ({data}) => {
  return  (
    <div className={styles.invoiceForPayment}>
        <Table {...CONFIG('транзакций', data.count)} 
          dataSource={data.results} 
          columns={FINANCE_COLUMNS.partner.rozetkaTransactionHistory} />
    </div>
  )
};

export default RozetkaTransactionHistory;