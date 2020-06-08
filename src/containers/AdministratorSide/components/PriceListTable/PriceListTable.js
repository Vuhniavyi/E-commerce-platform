import React, {Component} from 'react'
import 'antd/dist/antd.css';
import {Table} from "antd";

const dataSource = [{
    key: '1',
    priceList: 'Прайс-лист №1',
    date: '14/03/2019 14:03',
    status: 'Одобрен'
}, {
    key: '2',
    priceList: 'Прайс-лист №2',
    date: '14/03/2019 14:03',
    status: 'Одобрен'
}];

const columns = [{
    title: 'Прайс-лист',
    dataIndex: 'priceList',
    key: 'priceList',
}, {
    title: 'Дата загрузки',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
}];



class PriceListTable extends Component {


    render() {
        return (
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default PriceListTable;





