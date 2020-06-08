import React from 'react';
import { connect } from 'react-redux';
import { Icon, Input, notification, Popconfirm, Tooltip } from 'antd';
import MyButton from '../components/Buttons/Button';
import { updateProfile } from '../../../actions/userActions';
import { getCounterparties } from '../../../actions/requestNovaPoshta';
import TextField from '@material-ui/core/TextField';
import styles from './CompanySettings.module.css';

const NovaPoshtaApiKey = ({ user, updateProfile }) => {
  let novaPoshtaApiKey = null;

  function addApiKey() {
    if (!novaPoshtaApiKey) {
      notification.error({
        message: 'Поле Api ключ не может быть пустое!'
      });
      return;
    }
    getCounterparties(novaPoshtaApiKey)
      .then(({ data }) =>
        data.success
          ? data.data[0].Ref
          : data.errors.forEach(el => notification.error({ message: el }))
      )
      .then(
        senderRef =>
          senderRef &&
          updateProfile({
            novaPoshtaApiKey,
            senderRef
          }).then(() =>
            notification.success({
              message: 'Сохранено'
            })
          )
      );
  }

  function deleteApiKey() {
    updateProfile({
      novaPoshtaApiKey: null
    }).then(() =>
      notification.success({
        message: 'Ключ успешно удалён'
      })
    );
  }

  return (
    <div className={styles.novapostaApiKey}>
      {user.novaPoshtaApiKey ? (
        <>
          <i style={{ background: '#eeeeee', borderRadius: 4 }}>
            {user.novaPoshtaApiKey}
          </i>
          <Popconfirm
            title={
              <b>
                {/* Вместе с ключём также удалится все остальные данные относящиеся
                к Новой Почте!
                <br /> */}
                Уверены что хотите удалить?
              </b>
            }
            onConfirm={deleteApiKey}
            onCancel={null}
            okText="Да, удалить"
            cancelText="Нет, я передумал"
          >
            <Tooltip placement="right" title="Удалить ключ">
              <Icon
                type="close-circle"
                style={{ color: 'red', marginLeft: 15 }}
              />
            </Tooltip>
          </Popconfirm>
        </>
      ) : (
        <>
          <TextField
            label="Введите Ваш ключ API Новой почты"
            onChange={e => {
              novaPoshtaApiKey = e.target.value;
            }}
            style={{ width: 300, marginRight: 30 }}
            required
          />
          <MyButton
            myvariant="green"
            title="Сохранить ключ"
            onClick={addApiKey}
          />
        </>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: user => dispatch(updateProfile(user))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NovaPoshtaApiKey);
