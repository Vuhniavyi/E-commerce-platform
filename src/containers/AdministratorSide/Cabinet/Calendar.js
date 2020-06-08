import React from 'react';
import 'react-daypicker/lib/DayPicker.css';
import DayPicker from 'react-daypicker';
import styles from './Cabinet.module.css';
import { Table, Icon } from 'antd';

const columns = [
  {
    title: 'Отчетный период',
    dataIndex: 'period',
    key: 'period'
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Excel-файл',
    dataIndex: 'excel',
    key: 'excal',
    render: () => <Icon type="upload" className={styles.dwicon} />
  }
];

const data = [
  {
    period: 'Март 2019',
    date: '01/03 - 07/03',
    excel: ''
  },
  {
    period: 'Март 2019',
    date: '01/03 - 07/03',
    excel: ''
  },
  {
    period: 'Март 2019',
    date: '01/03 - 07/03',
    excel: ''
  }
];
const handleDayClick = day => {
  console.log(day);
};
const Calendar = () => {
  return (
    <div className={styles.newsWrapper}>
      <DayPicker onDayClick={handleDayClick} className={styles.datapicker} />
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

export default Calendar;
