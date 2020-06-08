import React, { Component, PureComponent } from 'react';

import { TextField, Button } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

import { statusList } from 'constants/ordersStatusList';
import styles from './SearchOrders.module.css';

class SearchOrders extends PureComponent {
  state = {
    orderId: '',
    productName: '',
    minDate: new Date(),
    maxDate: new Date(),
    status: '',
    userFio: '',
  };

  prepareFiltersData = () => {
    const { orderId, productName, minDate, maxDate, status, userFio } = this.state;
    const params = {};

    if (orderId.trim() !== '') params.id = orderId;

    if (productName.trim() !== '') params.productName = productName;

    if (status.trim() !== '') params.status = status;

    if (userFio.trim() !== '') params.userFio = userFio;

    return params;
  }
  
  handleSubmit = e => {
    e.preventDefault();

    const params = this.prepareFiltersData();

    console.log(('params', params));
    this.props.onSubmit(params);
  }

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  handleChangeStatus = ({ target: { value } }) => {
    this.setState({
      status: value
    });
  };

  handleChangeDate = name => (dateType, date) => {
    this.setState({
      [name]: date
    });
  };

  render() {
    const {
      orderId,
      productName,
      minDate,
      maxDate,
      status,
      userFio
    } = this.state;

    return (
      <Paper>
        <form className={styles.searchOrders} onSubmit={this.handleSubmit}>
          <div className={styles.orderNumber}>
            <TextField
              label="Номер заказа"
              value={orderId}
              name="orderId"
              fullWidth
              onChange={this.handleChangeInput}
              margin="normal"
            />
          </div>

          <div className={styles.orderNumber}>
            <TextField
              label="Название товара/Код товара"
              value={productName}
              name="productName"
              fullWidth
              onChange={this.handleChangeInput}
              margin="normal"
            />
          </div>

          <div className={styles.orderDate}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={styles.pickerWrap}>
                <div className={styles.margin}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Дата заказа"
                    value={minDate}
                    onChange={this.handleChangeDate('minDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </div>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Дата заказа"
                  value={maxDate}
                  onChange={this.handleChangeDate('maxDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </div>

          <div className={styles.orderStatus}>
            <InputLabel id="demo-simple-select-disabled-label">Статус заказа</InputLabel>
            <Select
              labelId="demo-simple-select-disabled-label"
              value={status}
              onChange={this.handleChangeStatus}
              fullWidth
            >
              {statusList.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className={styles.orderNumber}>
            <TextField
              label="ФИО покупателя"
              value={userFio}
              name="userFio"
              fullWidth
              onChange={this.handleChangeInput}
              margin="normal"
            />
          </div>
          <div>
            <Button
              type="submit"
              className={styles.button}
              margin="normal"
            >Отфильтровать</Button>
          </div>
        </form>
      </Paper >
    );
  }
}

export default SearchOrders;
