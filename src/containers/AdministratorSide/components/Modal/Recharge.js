import React, { Component } from 'react'
import styles from './Modal.module.css'
import { Modal, Tabs, Input, notification } from "antd"
import { unbalances, rechargeInvoice, rechargeByLiqPay } from '../../../../actions/userActions';

const { TabPane } = Tabs;
const initialState = {
  visible: false,
  email: '',
  bankAccount: '',
  creditCard: '',
  amount: '',
}
class Recharge extends Component {

  state = {
    ...initialState,
    activeTabKey: this.props.buttonName === "Вывести" ? "Карта" : "Пополнить картой LiqPay",
  }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  handleOk = (e) => {
    this.setState({
      activeTabKey: this.props.buttonName === "Вывести" ? "Карта" : "Пополнить картой LiqPay",
      ...initialState,
    })
  }

  handleCancel = (e) => {
    this.setState({
      activeTabKey: this.props.buttonName === "Вывести" ? "Карта" : "Пополнить картой LiqPay",
      ...initialState,
    })
  }

  // API requests
  handleWithdrawalToCard = async () => {
    const { amount, creditCard } = this.state;
    const created = Date.now();
    notification.info({
      message: 'Вывод на карту',
      description: `после этого финансовому директору останется перевести на карту \n ${creditCard} \n сумму: ${amount}`
    });
    await unbalances({ amount, created, creditCard });
  }
  handleSendInvoice = async () => {
    const { amount, email } = this.state;

    console.log(`после этого клиету прийдёт счёт-фактура на почту </br> e-mail: ${email} \n на сумму: ${amount}`);
    await rechargeInvoice({ amount });
    this.setState({ visible: false })
  }

  // проверяем что вводит пользователь и если это число, то записываем в state
  onChangeSumInput = async (e) => {
    let { value } = e.target;
    !isNaN(Number(value)) && await this.setState({ amount: value });
    if (this.state.activeTabKey === "Пополнить картой LiqPay" || this.state.activeTabKey === "Счет фактура") { // и если это вкладка LiqPay, то и подпись запрашиваем для операции
      rechargeByLiqPay({ amount: this.state.amount })
        .then(data => this.setState({ ...data }))
    }
  }
  onBlurSumInput = () => { }

  onChangeBankAccountInput = (e) => {
    let { value } = e.target;

    !isNaN(Number(value)) && this.setState({ bankAccount: value })
  }

  onChangeCardInput = (e) => {
    let { value } = e.target;

    !isNaN(Number(value)) && this.setState({ creditCard: value })
  }
  onBlurCardlInput = () => { }

  onChangeEmailInput = (e) => {
    let { value } = e.target;
    this.setState({ email: value })
  }


  formSubmit = (e) => {
    e.preventDefault();
    switch (this.state.activeTabKey) {
      case "Карта":
        this.handleWithdrawalToCard();
        break;
      case "Банковский счёт":
        break;
      case "Пополнить картой LiqPay":
        break;
      case "Счет фактура":
        this.handleSendInvoice()
        break;
      default:
        break;
    }
    this.handleOk()
  }

  renderWithdraw = () => {
    return (
      <Tabs
        type="card"
        activeKey={this.state.activeTabKey}
        onChange={key => this.setState({ activeTabKey: key })}
      >
        <TabPane
          tab="Карта"
          key="Карта"
        >
          <form className={styles.tabFlex} onSubmit={this.formSubmit} id="Карта">
            <div className={styles.inputGroup}>
              <label>Номер карты</label>
              <Input
                onChange={this.onChangeCardInput}
                //onBlur={this.onBlurEmailInput}
                placeholder="ХХХХ_ХХХХ_ХХХХ_ХХХХ"
                value={this.state.creditCard}
                type="text"
                required
                minlength={16}
                maxLength={16}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Сумма <span style={{ color: '#FF0000' }}>*</span></label>
              <Input
                onChange={this.onChangeSumInput}
                //onBlur={this.onBlurSumInput}
                placeholder="99 999 грн"
                value={this.state.amount}
                type="number"
                min={1000}
                required
              />
              <div style={{ textAlign: "end" }}>
                <span style={{ color: "#FF0000" }}>*</span>
                <span>не менее 1000 грн</span>
              </div>
            </div>
          </form>
        </TabPane>
        <TabPane
          tab="Банковский счёт"
          key="Банковский счёт"
        >
          <form className={styles.tabFlex} onSubmit={this.formSubmit} id="Банковский счёт">
            <div className={styles.inputGroup}>
              <label>Номер счета</label>
              <Input
                onChange={this.onChangeBankAccountInput}
                //onBlur={this.onBlurCardlInput}
                placeholder="Номер счета"
                value={this.state.bankAccount}
                type="text"
                required
                maxLength={16}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Сумма <span style={{ color: '#FF0000' }}>*</span></label>
              <Input
                onChange={this.onChangeSumInput}
                //onBlur={this.onBlurSumInput}
                placeholder="99 999 грн"
                value={this.state.amount}
                type="number"
                min={1000}
                required
              />
              <div style={{ textAlign: "end" }}>
                <span style={{ color: "#FF0000" }}>*</span>
                <span>не менее 1000 грн</span>
              </div>
            </div>
          </form>
        </TabPane>
      </Tabs>
    )
  }

  renderReplenish = () => {
    return (
      <Tabs
        type="card"
        activeKey={this.state.activeTabKey}
        onChange={key => this.setState({ activeTabKey: key })}
      >
        <TabPane
          tab="Пополнить картой LiqPay"
          key="Пополнить картой LiqPay"
        >
          <form className={styles.tabFlex} onSubmit={this.formSubmit} id="Пополнить картой LiqPay">
            <div className={styles.inputGroup}>
              <label>Сумма</label>
              <Input
                onChange={this.onChangeSumInput}
                // onBlur={this.onBlurSumInput}
                placeholder="99 999 грн"
                value={this.state.amount}
                type="text"
                required
                maxLength={7}
              />
            </div>

          </form>
        </TabPane>
        <TabPane
          tab="Счет фактура"
          key="Счет фактура"
        >
          <form className={styles.tabFlex} onSubmit={this.formSubmit} id="Счет фактура">
            {/* <div className={styles.inputGroup}>                            
							<label>E-mail</label>
							<Input
								onChange={this.onChangeEmailInput}
								//onBlur={this.onBlurEmailInput}
								placeholder="example@example.com"
								type="email"
								required
								maxLength={254}
							/>
						</div> */}

            <div className={styles.inputGroup}>
              <label>Сумма</label>
              <Input
                onChange={this.onChangeSumInput}
                //onBlur={this.onBlurSumInput}
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
    )
  }

  render() {
    const { activeTabKey, amount, data, signature } = this.state;

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
            : this.renderReplenish()
          }
          {activeTabKey === "Пополнить картой LiqPay"
            ? <form method="POST" action="https://www.liqpay.ua/api/3/checkout" acceptCharset="utf-8">
              <input type="hidden" name="data" value={data} />
              <input type="hidden" name="signature" value={signature} />
              {amount
                ? <button className={styles.payBtn}>
                  {this.props.buttonName}
                </button>
                : <button form={this.state.activeTabKey} type="submit" className={styles.payBtn}>
                  {this.props.buttonName}
                </button>
              }
            </form>
            : this.props.buttonName === 'Вывести'
              ? <button form={this.state.activeTabKey} type="submit" className={styles.payBtn} disabled={this.state.amount < 1000}>
                {this.props.buttonName}
              </button>
              : <button form={this.state.activeTabKey} type="submit" className={styles.payBtn}>
                {this.props.buttonName}
              </button>
          }
        </Modal>
     
      </>
    );
  }
}

export default Recharge;