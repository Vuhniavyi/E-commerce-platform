import React, {Component} from 'react';
import styles from '../Finance.module.css';
import { Table } from 'antd';
import { FINANCE_COLUMNS } from '../../../../helpers/TabColumns';
import { CONFIG } from '../../../../helpers/TabConfig';

const data = [{
  key: 1,
  id: 'id',
  period: 'period',
  date: 'date',
  status: 'status',
},{
  key: 2,
  id: 'id',
  period: 'period',
  date: 'date',
  status: 'status',
}];

class RozetkaSalesReports extends Component {

    render() {
        return (
            <div className={styles.invoiceForPayment}>
                <Table {...CONFIG('отчётов')} dataSource={data} columns={FINANCE_COLUMNS.partner.rozetkaSalesReports} />
            </div>
        );
    }
}

export default RozetkaSalesReports;