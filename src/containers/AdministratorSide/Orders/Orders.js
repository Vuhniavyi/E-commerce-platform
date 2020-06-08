import React, { useState, useRef } from 'react';
import { Tabs, Modal, Icon } from 'antd';
import { useSelector } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import OrdersFromRozetka from './OrdersFromRozetka';
import OrdersFromProm from './OrdersFromProm';
import OrdersBuy from './OrderBuy';
import NewOrder from './components/NewOrder/NewOrder';

const TabPanel = Tabs.TabPane;

const Orders = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeKey, setActiveKey] = useState('Rozetka');

  const novaPoshtaApiKey = useSelector(state => state.user.novaPoshtaApiKey)

  const onChangeActiveTab = key => {
    setActiveKey(key);
    if (key === 'NewOrder') openModal();
  }

  const closeModal = () => {
    setShowModal(false);
    setActiveKey('Self-repayment');
  }

  const openModal = () => setShowModal(true);

  const titleCreateOrder = novaPoshtaApiKey ? "Добавить новый заказ" : "Для самостоятельной отпраки введите ключ Новой Почты в 'Настройки компании'";

  return (
    <>
      <h3 className="page-title">Мои заказы</h3>
      <div className="page">
        <Tabs type="card" activeKey={activeKey} onChange={onChangeActiveTab}>
          <TabPanel tab="Заказы из Rozetka" key="Rozetka">
            <OrdersFromRozetka />
          </TabPanel>
          <TabPanel tab="Заказы из Prom.ua" key="Prom" >
            <OrdersFromProm />
          </TabPanel>
          <TabPanel tab="Заказы для самовыкупа" key="Self-repayment" >
            {activeKey === 'Self-repayment' && <OrdersBuy />}
          </TabPanel>
          <TabPanel disabled={!novaPoshtaApiKey} tab={
            <Tooltip title={titleCreateOrder} >
              <div>
                <Icon style={{
                  fontSize: '16px',
                  marginRight: 0
                }} type="plus-circle" />
              </div>
            </Tooltip>
          } key="NewOrder">
            <NewOrder visible={showModal} onCancel={closeModal} />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default Orders;

// Ref 
// Description
// CityDescription