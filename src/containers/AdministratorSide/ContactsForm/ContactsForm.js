import React, { Component } from 'react';
import styles from './ContactsForm.module.css';
import { Button } from 'antd';

class ContactsForm extends Component {
  render() {
    return (
      <div>
        <form className={styles.contactForm}>
          <h5 className={styles.title}>Контактная форма</h5>
          <div>
            <label>Имя</label>
            <input type="text" />
          </div>
          <div>
            <label>Емеил</label>
            <input type="email" />
          </div>
          <div>
            <label>Тема</label>
            <input type="text" />
          </div>
          <div>
            <label>Сообщение</label>
            <textarea></textarea>
          </div>
          <Button style={{ width: 300, color: '#fff' }}>Отправить</Button>
        </form>
      </div>
    );
  }
}

export default ContactsForm;
