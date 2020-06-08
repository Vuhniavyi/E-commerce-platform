import React, {Component} from 'react';
import styles from '../Finance.module.css';
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

const data = [];

for (let i = 0; i < 31; i++) {
    data.push({
      key: i,
      date: `${String(i+1).padStart(2, "0")}/01/2019 14:${10+i}`,
      type: Math.round(Math.random()) ? 'Банковская карта' : 'Банковский счет',
      requestNumber: `МП-${(Math.random()*Math.pow(10, 10)).toFixed()}`,
      cost: `${1000 + +(Math.random()*100).toFixed()}.00 грн`,
      status: Math.round(Math.random()) ? 'Выплачено' : 'Не выплачено',
    });
};

class WithdrawalRequests extends Component {

    render() {
        return (
            <div className={styles.invoiceForPayment}>
                <Table {...CONFIG('заявок')} 
                    dataSource={data} 
                    columns={FINANCE_COLUMNS.partner.withdrawalRequests} />
            </div>
        );
    }
}

export default WithdrawalRequests;