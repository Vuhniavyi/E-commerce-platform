import axios from 'axios';

export const liqPay = (data) => {
    axios({
        method: "POST",
        url: `www.liqpay.ua/api/3/checkout`,
        data,
        headers: { 'Content-Type': type || 'application/json' }
    })
}