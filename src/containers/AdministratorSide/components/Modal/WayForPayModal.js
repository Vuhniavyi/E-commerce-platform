import React, { Component } from 'react';
import styles from './Modal.module.css';
import { Modal, Tabs, Input, notification } from 'antd';
import {
  unbalances,
  rechargeInvoice,
  rechargeByLiqPay
} from '../../../../actions/userActions';
import WayForPayButton from '../../../../components/WayForPayButton/WayForPayButton';

const { TabPane } = Tabs;
const initialState = {
  visible: false,
  email: '',
  bankAccount: '',
  creditCard: '',
  amount: ''
};

  
class WayForPayModal extends Component {
  state = {
    ...initialState,
    activeTabKey:
      this.props.buttonName === 'Вывести'
        ? 'Карта'
        : 'Пополнить картой WayForPay'
  };

  

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      activeTabKey:
        this.props.buttonName === 'Вывести'
          ? 'Карта'
          : 'Пополнить картой WayForPay',
      ...initialState
    });
  };

  handleCancel = e => {
    this.setState({
      activeTabKey:
        this.props.buttonName === 'Вывести'
          ? 'Карта'
          : 'Пополнить картой WayForPay',
      ...initialState
    });
  };

  // API requests
  handleWithdrawalToCard = async () => {
    const { amount, creditCard } = this.state;
    const created = Date.now();
    notification.info({
      message: 'Вывод на карту',
      description: `после этого финансовому директору останется перевести на карту \n ${creditCard} \n сумму: ${amount}`
    });
    await unbalances({ amount, created, creditCard });
  };
  handleSendInvoice = async () => {
    const { amount } = this.state;
    await rechargeInvoice({ amount });
    this.setState({ visible: false });
  };

  // проверяем что вводит пользователь и если это число, то записываем в state
  onChangeSumInput = async e => {
    let { value } = e.target;
    !isNaN(Number(value)) && (await this.setState({ amount: value }));
    if (
      this.state.activeTabKey === 'Пополнить картой WayForPay' ||
      this.state.activeTabKey === 'Счет фактура'
    ) {
      // и если это вкладка WayForPay, то и подпись запрашиваем для операции
      rechargeByLiqPay({ amount: this.state.amount }).then(data =>
        this.setState({ ...data })
      );
    }
  };



  onBlurSumInput = () => {};

  renderReplenish = () => {
    return (
      <Tabs
        type="card"
        activeKey={this.state.activeTabKey}
        onChange={key => this.setState({ activeTabKey: key })}
      >
        <TabPane
          tab="Пополнить картой WayForPay"
          key="Пополнить картой WayForPay"
        >
          <form
            className={styles.tabFlex}
            onSubmit={this.formSubmit}
            id="Пополнить картой WayForPay"
          >
            <div className={styles.inputGroup}>
              <label>Сумма</label>
              <Input
                onChange={this.onChangeSumInput}
                placeholder="99 999 грн"
                value={this.state.amount}
                type="text"
                required
                maxLength={7}
              />
            </div>
          </form>
        </TabPane>
      </Tabs>
    );
  };

  render() {
    const { activeTabKey, amount } = this.state;
    return (
      <>
        <button
          className={styles.replenish}
          onClick={this.showModal}
          disabled={false}
        >
          {this.props.buttonName}
        </button>

        <Modal
          width={690}
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          className={styles.buyPackage}
          footer={false}
        >
          {this.props.buttonName === 'Вывести'
            ? this.renderWithdraw()
            : this.renderReplenish()}
          {activeTabKey === 'Пополнить картой WayForPay' ? (
            amount ? (
              <button className={styles.payBtn}>
                <WayForPayButton
                  amount={amount}
                />
              </button>
            ) : (
              <button
                form={this.state.activeTabKey}
                type="submit"
                className={styles.payBtn}
              >
                <WayForPayButton
                  amount={amount}
                />
              </button>
            )
          ) : this.props.buttonName === 'Вывести' ? (
            <button
              form={this.state.activeTabKey}
              type="submit"
              className={styles.payBtn}
              disabled={this.state.amount < 1000}
            >
              {this.props.buttonName}
            </button>
          ) : (
            <button
              form={this.state.activeTabKey}
              type="submit"
              className={styles.payBtn}
            >
              {this.props.buttonName}
            </button>
          )}
        </Modal>
      </>
    );
  }


}

export default WayForPayModal;
