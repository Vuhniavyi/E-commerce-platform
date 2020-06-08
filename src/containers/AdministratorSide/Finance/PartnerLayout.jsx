import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import styles from './Finance.module.css';
import { Tabs, Tooltip, Icon, Button } from 'antd';
import { GREYZONE, AVAILABLE_FOR_PAYOUT } from 'constants/toolTips';
import Recharge from "../components/Modal/Recharge";
// import transactionsHistory from "./Tables/transactionsHistory";
// import WithdrawalRequests from "./Tables/WithdrawalRequests";
// import RozetkatransactionsHistory from './Tables/RozetkatransactionsHistory';
// import RozetkaInvoices from './Tables/RozetkaInvoiceForPayment';
// import RozetkaSalesReports from './Tables/RozetkaSalesReports';
import TableTemplate from './TableTemplate';
import { transactionsBalancePartner, getLanding } from '../../../actions/userActions';


const TabPane = Tabs.TabPane;

const PartnerLayout = props => {
  const [balances, setBalances] = useState(null);
  useEffect(() => {
    transactionsBalancePartner().then(balances => setBalances(balances));
  }, []);


  const { user } = props;

  return (
    <Tabs type="card">
      <TabPane 
        tab={<div style={{ color: 'black', fontSize: '16px' }}>История транзакций</div>}
        key="1">
        <div className={styles.balanceInfo}>
          {/* <div className={styles.paidForPeriod}>
					<h5>Доход</h5>
          <span className={styles.balance__income}>0.00грн</span>
				</div>
        <div className={styles.paidForPeriod}>
					<h5>Расход</h5>
          <span className={styles.balance__outgo}>0.00грн</span>
        </div> */}

          {/* <div className={styles.paidForPeriod}>
					<h5>Баланс</h5>
          <span className={styles.balance__total}>
            {(+user.frozenBalance + +user.userBalance).toFixed(2)}грн
          </span>
        </div> */}
          <div className={styles.ordersInProcessed}>
            <span className={styles.flex}>
              <h5>В резерве</h5>
              <Tooltip placement="right" title={GREYZONE}>
                <Icon
                  type="question-circle"
                  theme="twoTone"
                  style={{ fontSize: '16px' }}
                />
              </Tooltip>
            </span>
            <span className={styles.balance__grey}>
              {(balances ? balances.frozen : 0).toFixed(2)}грн
            </span>
          </div>
          <div className={styles.availableForPayment}>
            <h5>Сумма доступная к выводу</h5>
            <span className={styles.balance__available}>
              {(balances ? balances.available : 0).toFixed(2)}грн
            </span>
          </div>
          {/* <div className={styles.balanceActions}> */}
          {balances && balances.available >= 1000 ? (
            <Recharge title="Вывести средства" buttonName="Вывести" />
          ) : (
            <Tooltip placement="right" title={AVAILABLE_FOR_PAYOUT}>
              <Button
                style={{
                  height: 40,
                  width: 145,
                  fontFamily: 'Ubuntu',
                  fontSize: 16,
                  fontWeight: 'bold'
                }}
                disabled
              >
                Вывести
              </Button>
            </Tooltip>
          )}
          {/* </div> */}
        </div>
        <TableTemplate
          action="transactionsHistory"
          moduleName="financeColumns"
          tableName="transactionsHistory"
          units="транзакций"
          user={user}
        />
        {/* <h2>Пример</h2> */}
        {/* <transactionsHistory {...user}/> */}
      </TabPane>
      {/* <TabPane 
      tab={<div style={{ color: 'black', fontSize: '16px' }}>Финансовые отчёты платформ</div>}
      // tab="Финансовые отчёты платформ" 
      key="2">
        <Tabs type="card">
          <TabPane tab="Отчёты Rozetka" key="Rozetka">
            <Tabs type="card">
              <TabPane
                tab="История транзакций"
                key="rozetkaTransactionsHistory"
              >
                <TableTemplate
                  action="rozetkaTransactionsHistory"
                  moduleName="financeColumns"
                  tableName="rozetkaTransactionsHistory"
                  units="транзакций"
                  user={user}
                />
              </TabPane>
              <TabPane tab="Счета на оплату" key="rozetkaInvoices">
                <TableTemplate
                  action="rozetkaInvoices"
                  moduleName="financeColumns"
                  tableName="rozetkaInvoices"
                  units="счетов"
                  user={user}
                />
              </TabPane>
              <TabPane
                tab="Отчёты о проданых товарах "
                key="rozetkaSalesReports"
              >
                <TableTemplate
                  action="rozetkaSalesReports"
                  moduleName="financeColumns"
                  tableName="rozetkaSalesReports"
                  units="отчетов"
                  user={user}
                />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="Отчёты Prom" key="Prom" style={{ display: 'flex' }}>
            <img
              src="https://static1.squarespace.com/static/55118238e4b0ef57ce737dfb/57b8522d197aea4fdb59ede0/57c094c859cc68adae97f4d7/1472239382345/coming-soon.jpg?format=2500w"
              alt="coming soon"
              width="200"
              style={{ margin: 'auto' }}
            />
          </TabPane>
        </Tabs>
      </TabPane>
      <TabPane 
            tab={<div style={{ color: 'black', fontSize: '16px' }}>Взаиморасчёты c поставщиками</div>}

      // tab="Взаиморасчёты c поставщиками" 
      key="3">
        <TableTemplate
          action="ordersHistory"
          moduleName="financeColumns"
          tableName="mutualSettlements"
          units="записей"
          user={user}
        />
      </TabPane> */}
    </Tabs>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PartnerLayout);
