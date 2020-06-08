import React, { Component } from 'react';
import styles from './Cabinet.module.css';
import 'antd/dist/antd.css';
import News from './News';
import Pocket from './Pocket';
import '../../../App.css';
import Calendar from './Calendar';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
// import { Modal, Icon } from 'antd';
import Profile from './Profile';
import userAvatar from '../../../img/pictures/userImage.png';

import {
  getProfile,
  sendInvoice,
  buyPackByLiqPay
} from '../../../actions/userActions';
import { getProfile as getCompanyProfile } from '../../../actions/companyActions';

class Cabinet extends Component {
  state = {
    user: {
      avatar: userAvatar
    },
    company: {},
    packId: 0, // № пакета, меняется при нажатии кнопки "Купить"
    data: '', // LiqPay data
    signature: '', // LiqPay signature
    currentPack: 3, // тестовое значение для отображения активным пакета "SILVER"
    visible: false // тригер для модального окна
  };

  showModal = async e => {
    const pack = +e.target.dataset.pack;
    await this.setState(
      {
        packId: pack,
        visible: true
      }
    );
    this.getLiqPaySignature();
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleSendInvoice = async () => {
    await sendInvoice({
      pocketId: this.state.packId
    });
    this.setState({
      visible: false
    });
  };

  getLiqPaySignature = () => {
    buyPackByLiqPay({ pocketId: this.state.packId }).then(data =>
      this.setState({ ...data })
    );
  };

  async componentDidMount() {
    const [user, company] = await Promise.all([
      getProfile(),
      getCompanyProfile()
    ]);
    this.setState({
      user,
      company
    });
  }

  render() {
    const { user, company, data, signature } = this.state;

    return (
      <div className="page">
        <Paper className={styles.wrapper}>
          <div className={`${styles.userCard}`}>
            <Profile user={user} company={company} />
            <Pocket />
          </div>
          <div className={`${styles.userCard}`}>
            <div>
              <h2>Лента новостей</h2>
              <News avatar={user.avatarImage} />
            </div>
            <div>
              <h2>Календарь заказов</h2>
              <Calendar />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cabinet);


const inventory = {
  items: ['Knife', 'Gas mask'],
  add(itemName) {
    console.log(`Adding ${itemName} to inventory`);

    this.items.push(itemName);
  },
  remove(itemName) {
    console.log(`Removing ${itemName} from inventory`);

    this.items = this.items.filter(item => item !== itemName);
  },
};

const invokeInventoryAction = function(itemName, action) {
  console.log(`Invoking action on ${itemName}`);
  action(itemName);
};

invokeInventoryAction('Medkit', inventory.add);
// Invoking action on Medkit
// Adding Medkit to inventory

console.log(inventory.items); // ['Knife', 'Gas mask', 'Medkit']

invokeInventoryAction('Gas mask', inventory.remove);
// Invoking action on Gas mask
// Removing Gas mask from inventory

console.log(inventory.items); // ['Knife', 'Medkit']
