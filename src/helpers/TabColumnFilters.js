export const FINANCE_FILTERS = {
  contractor: {
    invoice: {
      status: [
        {
          text: 'Оплачено',
          value: 'Оплачено',
        },
        {
          text: 'Не оплачено',
          value: 'Не оплачено',
        },
      ],
      type: [
        {
          text: 'Cчет-фактура',
          value: 'Cчет-фактура',
        },
        {
          text: 'LigPay',
          value: 'LigPay',
        },
      ],
    },
    transactionsHistory: {
      type: [
        {
          text: 'Пополнение баланса',
          value: 'Пополнение баланса',
        },
        {
          text: 'Заказы',
          value: 'Заказы',
        },
        {
          text: 'Возвраты',
          value: 'Возвраты',
        },
      ],
    },
  },
  partner: {
    transactionsHistory: {
      source: [
        {
          text: 'Покупка пакета',
          value: 2,
        },
        {
          text: 'Заказы',
          value: 4,
        },
        {
          text: 'Вывод средств',
          value: 3,
        },
        {
          text: 'Возврат товара',
          value: 5,
        },
      ],
      id: [
        {
          text: '1',
          value: '1',
        },{
          text: '2',
          value: '2',
        }
    ]
    },
    withdrawalRequests: {
      status: [
        {
          text: 'Выплачено',
          value: 'Выплачено',
        },
        {
          text: 'Не выплачено',
          value: 'Не выплачено',
        },
      ],
      type: [
        {
          text: 'Банковская карта',
          value: 'Банковская карта',
        },
        {
          text: 'Банковский счет',
          value: 'Банковский счет',
        },
      ],
    },
    rozetkaTransactionsHistory: {
      operationType: [
        {
          text: 'Резервирование суммы по сделанному заказу',
          value: 1,
        },
        {
          text: 'Комиссия за продажу',
          value: 2,
        },
        {
          text: 'Снятие резерва за невыполненный заказ',
          value: 3,
        },
      ]
    }
  },
};