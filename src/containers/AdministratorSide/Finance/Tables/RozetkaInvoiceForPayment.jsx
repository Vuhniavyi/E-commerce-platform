import React, {Component} from 'react';
import styles from '../Finance.module.css';
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

const data = [{
  key: 1,
  date: 'date',
  type: 'type',
  accountNumber: 'accountNumber',
  amount: 'amount',
  status: 'status',
},{
  key: 2,
  date: 'date',
  type: 'type',
  accountNumber: 'accountNumber',
  amount: 'amount',
  status: 'status',
}];

class RozetkaInvoiceForPayment extends Component {

    render() {
        return (
            <div className={styles.invoiceForPayment}>
                <Table {...CONFIG('счетов')} 
                  dataSource={data} 
                  columns={FINANCE_COLUMNS.partner.rozetkaInvoiceForPayment} />
            </div>
        );
    }
}

export default RozetkaInvoiceForPayment;