import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styles from './Finance.module.css';
import { Tabs } from 'antd';
import Recharge from '../components/Modal/Recharge';
import TableTemplate from './TableTemplate';
import { transactionsBalance } from '../../../actions/userActions';
import WayForPayButton from '../../../components/WayForPayButton/WayForPayButton'
import WayForPayModal from '../../../containers/AdministratorSide/components/Modal/WayForPayModal'

// import TransactionsHistory from "./Tables/TransactionsHistory";
// import InvoiceForPayment from "./Tables/InvoiceForPayment";

const TabPane = Tabs.TabPane;
// const balance = 1000;


const ContractorLayout = props => {
  const [balances, setBalances] = useState(null);
  useEffect(() => {
    transactionsBalance().then(balances => setBalances(balances));
  }, []);

  

  // console.log('balances, setBalances', balances, setBalances)

  const { user } = props;
  // console.log('balances, setBalances',user)

  return (
    <Tabs type="card">
      <TabPane
        tab={
          <div style={{ color: 'black', fontSize: '16px' }}>
            История транзакций
          </div>
        }
        key="1"
      >
        <div className={styles.balanceInfo}>
          {/* <div className={styles.paidForPeriod}>
					<h5>Доход</h5>
                    <span className={styles.balance__income}>0.00грн</span>
				</div>
                <div className={styles.paidForPeriod}>
					<h5>Расход</h5>
                    <span className={styles.balance__outgo}>0.00грн</span>
                </div> */}
          <div className={styles.paidForPeriod}>
            <h5>Баланс</h5>
            <span>
              <span className={styles.balance}>
                {balances ? balances.balance : 0} грн
              </span>
            </span>
          </div>
          <div className={styles.paidForPeriod}>
            <h5>В резерве</h5>
            <span className={styles.balance__outgo}>
              {balances && balances.blocked !== null ? balances.blocked : 0} грн
            </span>
          </div>
          <div className={styles.balanceActions}>
            {/* <Recharge title="Пополнение баланса" buttonName="Пополнить" /> */}
            <WayForPayModal title="Пополнение баланса" buttonName="Пополнить"/>
          </div>
        </div>

        <TableTemplate
          action="transactionsHistory"
          moduleName="financeColumns"
          tableName="transactionsHistory"
          units="транзакций"
          user={user}
        />
      </TabPane>
      {/* <TabPane tab="Счета на оплату" key="2">
            <TableTemplate 
                action='transactionsHistory'
                query='&sourse=1'
                moduleName='financeColumns'
                tableName='invoicesForPayment'
                units='счетов'
                user={user} />
        </TabPane>
        <TabPane tab="Взаиморасчёты c продавцами" key="3">
            <TableTemplate 
                action='ordersHistory'
                moduleName='financeColumns'
                tableName='mutualSettlements'
                units='записей'
                user={user} />
        </TabPane> */}
      {/* <TabPane tab="Счета на оплату" key="4">
            <TableTemplate 
                actions={[ 'transactionsRechargeByLiqpay', 'rechargeByInvoice', ]}
                moduleName='financeColumns'
                tableName='invoiceForPayment'
                units='счетов'
                user={user} />
        </TabPane> */}
    </Tabs>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ContractorLayout);
