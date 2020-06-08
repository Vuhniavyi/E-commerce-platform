import React, { Component } from 'react';
import {
  AutoComplete,
  Button,
  Modal,
  Popconfirm,
  Icon,
  Select,
  Tooltip,
  notification
} from 'antd';

import {
  fetchSettlements,
  fetchWarehouses
} from '../../../actions/requestNovaPoshta';

import {
  getNovaPoshtaSavedData,
  updateNovaPoshtaData
} from '../../../actions/novaPoshtaActions';
// import { Button } from 'antd/lib/radio';

const { Option } = Select;

const initialState = {
  settlementValue: '',
  settlementRef: '',
  settlements: [],
  warehouseValue: '',
  warehouseRef: '',
  warehouses: []
};

class NovaPoshtaAddressList extends Component {
  state = {
    ...initialState,
    addressesList: [],
    modalVisible: false
  };

  toogleModal = () => {
    this.setState({ ...initialState, modalVisible: !this.state.modalVisible });
  };

  onSettlementSearch = async value => {
    const { apiKey } = this.props;
    const trimedValue = value.trim();
    this.setState({ settlementValue: trimedValue });
    if (!value.trim()) {
      this.setState({ ...initialState });
    }

    try {
      const data = await fetchSettlements(apiKey, trimedValue);
      const transformResult = data.map(
        ({ DescriptionRu, AreaDescriptionRu, Ref }) => ({
          text: DescriptionRu + ', ' + AreaDescriptionRu,
          value: Ref
        })
      );

      if (this.state.settlementValue === value) {
        this.setState(() => ({ settlements: [...new Set(transformResult)] }));
      }
    } catch (err) {
      throw Error('onSettlementSearch', err);
    }
  };

  onSettlementSelect = (value, option) => {
    this.setState(
      {
        settlementValue: option.props.children,
        settlementRef: value
      },
      () => this.fetchWarehouses()
    );
  };

  fetchWarehouses = async () => {
    const { apiKey } = this.props;
    const { settlementRef } = this.state;

    try {
      const data = await fetchWarehouses(apiKey, { SettlementRef: settlementRef });
      this.setState({
        warehouses: [...data]
      });
    } catch (err) {
      throw Error('fetchWarehouses', err);
    }
  };

  onWarehouseSelect = (value, option) => {
    this.setState(
      {
        warehouseValue: option.props.children,
        warehouseRef: value
      },
      this.sendDataToFormSubmit
    );
  };

  addAddress = async () => {
    const {
      addressesList,
      settlementValue,
      settlementRef,
      warehouseValue,
      warehouseRef
    } = this.state;
    const data = {
      addresses: [
        ...addressesList,
        { settlementValue, settlementRef, warehouseValue, warehouseRef }
      ]
    };
    await updateNovaPoshtaData(data).then(data => {
      this.setState({
        ...initialState
      });
    });
    await this.getNovaPoshtaSavedData();
    await this.toogleModal();
  };

  removeAddress = async ref => {
    const addresses = this.state.addressesList.filter(
      el => el.warehouseRef !== ref
    );
    const data = {
      addresses
    };
    await updateNovaPoshtaData(data);
    notification.success({ message: 'Адрес удалён' });
    this.getNovaPoshtaSavedData();
  };
  removeAllAddress = async () => {
    const data = {
      addresses: []
    };
    await updateNovaPoshtaData(data);
    notification.success({ message: 'Все адреса удалёны' });
    this.getNovaPoshtaSavedData();
  };

  getNovaPoshtaSavedData = () => {
    getNovaPoshtaSavedData()
      .then(data => data.addresses)
      .then(addressesList => this.setState({ addressesList }));
  };

  componentDidMount = () => {
    this.getNovaPoshtaSavedData();
  };

  render() {
    const {
      addressesList,
      settlements,
      warehouses,
      settlementValue,
      warehouseValue,
      modalVisible
    } = this.state;
    const {
      toogleModal,
      onSettlementSearch,
      onSettlementSelect,
      onWarehouseSelect,
      addAddress,
      removeAddress,
      removeAllAddress
    } = this;
    const options = warehouses.map(({ DescriptionRu, Ref }) => (
      <Option
        key={Ref}
        disabled={addressesList.some(el => el.warehouseRef === Ref)}
      >
        {DescriptionRu}
      </Option>
    ));

    return (
      <>
        <h2>Oтделение для отправки:</h2>
        {addressesList.length ? (
          <ul style={{ marginLeft: 20 }}>
            {addressesList.map(el => (
              <li>
                <i style={{ background: '#eeeeee', borderRadius: 4 }}>
                  {el.settlementValue}, {el.warehouseValue}
                </i>
                <Popconfirm
                  title={<b>Вы уверены что хотите удалить этот адрес?</b>}
                  onConfirm={() => removeAddress(el.warehouseRef)}
                  onCancel={null}
                  okText="Да, удалить"
                  cancelText="Нет, я передумал"
                >
                  <Tooltip placement="right" title="Удалить адрес">
                    <Icon
                      type="close-circle"
                      style={{ color: 'red', marginLeft: 15 }}
                    />
                  </Tooltip>
                </Popconfirm>
              </li>
            ))}
          </ul>
        ) : null}
        <Button onClick={toogleModal} style={{ marginBottom: 14 }}>
          Добавить отделение для отправки
        </Button>
        <Popconfirm
          title={<b>Вы уверены что хотите все адреса?</b>}
          onConfirm={removeAllAddress}
          onCancel={null}
          okText="Да, удалить"
          cancelText="Нет, я передумал"
        >
          <Button style={{ margin: '0 0 14px 14px' }} type="danger">
            Удалить все отделения для отправки
          </Button>
        </Popconfirm>

        <Modal
          title="Добавить отделение для отправки"
          visible={modalVisible}
          onOk={addAddress}
          footer={
            <>
              {/* <Button onClick={toogleModal}>Выйти без сохранения</Button> */}
              <Button
                type="primary"
                onClick={addAddress}
                disabled={!settlementValue || !warehouseValue}
              >
                Сохранить адрес
              </Button>
            </>
          }
          onCancel={toogleModal}
        >
          {modalVisible && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AutoComplete
                placeholder="Город"
                style={{ width: 300 }}
                value={settlementValue}
                dataSource={settlements}
                onChange={onSettlementSearch}
                onSelect={onSettlementSelect}
              />
              <Select
                placeholder="Отделение"
                style={{ width: 300, marginTop: 10 }}
                onSelect={onWarehouseSelect}
                defaultActiveFirstOption={false}
                showArrow={warehouses.length}
                disabled={!warehouses.length}
              // showSearch
              // filterOption={false}
              // onSearch={this.handleWarehouseSearch}
              // notFoundContent={null}
              >
                {options}
              </Select>
            </div>
          )}
        </Modal>
      </>
    );
  }
}

export default NovaPoshtaAddressList;
