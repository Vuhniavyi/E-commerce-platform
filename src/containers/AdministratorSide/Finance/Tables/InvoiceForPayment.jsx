import React, {Component} from 'react';
import styles from '../Finance.module.css';
// import 'antd/dist/antd.css';
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

const data = [];

for (let i = 0; i < 31; i++) {
    data.push({
      key: i,
      date: `${String(i+1).padStart(2, "0")}/01/2019 14:${10+i}`,
      type: Math.round(Math.random()) ? 'Cчет-фактура' : 'LigPay',
      accountNumber: `МП-${(Math.random()*Math.pow(10, 10)).toFixed()}`,
      cost: `${1000 + +(Math.random()*100).toFixed()}.00 грн`,
      status: Math.round(Math.random()) ? 'Оплачено' : 'Не оплачено',
    });
};

class InvoiceForPayment extends Component {

    render() {
        return (
            <div className={styles.invoiceForPayment}>
                <Table {...CONFIG('счетов')} dataSource={data} columns={FINANCE_COLUMNS.contractor.invoiceForPayment} />
            </div>
        );
    }
}

export default InvoiceForPayment;