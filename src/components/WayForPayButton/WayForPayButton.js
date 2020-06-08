import React, { useEffect, useState } from 'react';
import hmacMD5 from 'crypto-js/hmac-md5';
import styles from '../../containers/AdministratorSide/components/Modal/Modal.module.css';

// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
import prepareDataFromWayForPayAPI from 'utils/wayForPay';
import {
  transactionsWayforpayContractor,
  transactionsWayforpayContractorSend
} from '../../actions/userActions';

const WayForPayButton = ({ amount }) => {
  const [params, setParams] = useState(null);
  useEffect(() => {
    transactionsWayforpayContractor().then(params => setParams(params));
  }, []);

  const wayForPay = window.wayforpay;

  const prepareParams = () => {
    const {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      currency,
      productName,
      productCount,
      productPrice,
      merchantSecretKey
    } = params;
    const objectParams = {
      merchantAccount,
      merchantDomainName,
      orderReference,
      orderDate,
      amount,
      currency,
      productName,
      productCount,
      productPrice
    };

    objectParams.merchantAccount = merchantAccount;
    const hash = hmacMD5(
      prepareDataFromWayForPayAPI(objectParams),
      merchantSecretKey
    ).toString();
    objectParams.merchantSignature = hash;

    return objectParams;
  };

  const pay = function() {
    wayForPay.run(
      prepareParams(),
      function(response) {
        // on aprooved
        console.log('response 1', response);
        transactionsWayforpayContractorSend(response);
      },
      function(response) {
        //declined
        console.log('response 2', response);
        transactionsWayforpayContractorSend(response);
      },
      function(response) {
        // on pending or in processing
        console.log('response 3', response);
        transactionsWayforpayContractorSend(response);
      }
    );
  };

  return (
    <button className={styles.payBtnNew} onClick={pay}>
Попольнить    </button>
  );
};

export default WayForPayButton;
