// import React from 'react';
// import { Icon, Tooltip } from 'antd';
// import financeStyles from '../containers/AdministratorSide/Finance/Finance.module.css';
// import { NUMBER, STRING } from './TabColumnSorters';
// import { FINANCE_FILTERS } from './TabColumnFilters';
// import { onFilter } from './TabColumnOnFilter';
// import Icons from '../containers/AdministratorSide/components/Icons/Icons';
// import CircularProgress from '@material-ui/core/CircularProgress';

// const months = [
//   'январь',
//   'февраль',
//   'март',
//   'апрель',
//   'май',
//   'июнь',
//   'июль',
//   'август',
//   'сентябрь',
//   'октябрь',
//   'ноябрь',
//   'декабрь'
// ];
// const convertTimestamp = {
//   toPeroidFormat: timestamp => {
//     const date = new Date(timestamp);
//     return `${months[date.getMonth()]} ${date.getFullYear()} г.`;
//   },
//   toDateFormat: timestamp => {
//     const date = new Date(timestamp);
//     return `${(date.getDate() + '').padStart(2, 0)}.${(
//       date.getMonth() +
//       1 +
//       ''
//     ).padStart(2, 0)}.${date.getFullYear()}`;
//   },
//   toTimeFormat: timestamp => {
//     const date = new Date(timestamp);
//     return `${(date.getDate() + '').padStart(2, 0)}.${(
//       date.getMonth() +
//       1 +
//       ''
//     ).padStart(2, 0)}.${date.getFullYear()}
//     ${(date.getHours() + '').padStart(2, 0)}:${(
//       date.getMinutes() + ''
//     ).padStart(2, 0)}`;
//   }
// };
// // const peroidFormat = (timestamp) => {
// //   const date = new Date(timestamp);
// //   return `${months[date.getMonth()]} ${date.getFullYear()} г.`
// // };
// // const dateFormat = (timestamp) => {
// //   const date = new Date(timestamp);
// //   return `${(date.getDate()+'').padStart(2,0)}.${(date.getMonth()+1+'').padStart(2,0)}.${date.getFullYear()}`
// // };
// // const timeFormat = (timestamp) => {
// //   const date = new Date(timestamp);
// //   return `${(date.getDate()+'').padStart(2,0)}.${(date.getMonth()+1+'').padStart(2,0)}.${date.getFullYear()}
// //   ${(date.getHours() + '').padStart(2,0)}:${(date.getMinutes() + '').padStart(2,0)}`
// // };

// const ROZETKA_OPERATIONS = [
//   '',
//   'Резервирование суммы по сделанному заказу',
//   'Комиссия за продажу',
//   'Снятие резерва за невыполненный заказ',
//   'Пополнение счета',
//   'Оплата доступа к платформе',
//   'Корретировка баланса',
//   'Корректировка заказа',
//   'Изменение количества в заказе',
//   'Удаление товара из заказа',
//   'Резервирование суммы по добавленному товару',
//   'Корретировка счета абонплаты (проведена вручную)',
//   'Пополнение счета за доступ к платформе',
//   'Корретировка счета, сделанная программно',
//   'Возврат заказа',
//   'Корректировка роялти по заказу - возврат комиссии по заказу',
//   'Корректировка счета роялти - между абонплатой и роялти'
// ];

// // const TRANSACTION_SOURCES = [
// //   '',
// //   'Пополнение баланса',
// //   'Покупка пакета',
// //   'Вывод средств',
// //   'Успешный заказ',
// //   'Возврат товара'
// // ];

// const DOWNLOAD_HISTORY = {
//   prom: 'prom',
//   promYml: 'promYml',
//   yml: 'YML',
//   inner: 'XLS',
//   rozetka: 'Rozetka'
// };

// export const COLUMNS = {
//   financeColumns: {
//     contractor: {
//       invoicesForPayment: [
//         {
//           title: 'Дата',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created)
//           // sorter: STRING('date'),
//           // width: 200,
//         },
//         {
//           title: 'Тип',
//           dataIndex: 'liqpayOrderId',
//           key: 'liqpayOrderId',
//           render: liqpayOrderId => (liqpayOrderId ? 'LiqPay' : 'Счет-фактура')
//           // filters: FINANCE_FILTERS.contractor.invoice.type,
//           // onFilter: onFilter.indexOf('type'),
//           // width: 200,
//         },
//         {
//           title: 'ID оплаты',
//           dataIndex: 'id',
//           key: 'id'
//           // sorter: STRING('accountNumber'),
//           // width: 200,
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => (
//             <div style={{ textAlign: 'end' }}>{(+amount).toFixed(2)}</div>
//           ),
//           // sorter: STRING('cost'),
//           width: 100
//         },
//         {
//           title: 'Статус',
//           dataIndex: 'isApproved',
//           key: 'isApproved',
//           render: isApproved =>
//             isApproved ? (
//               <span style={{ color: 'green' }}>APPROVED</span>
//             ) : (
//               <span style={{ color: 'red' }}>NOT APPROVED</span>
//             )
//           // filters: FINANCE_FILTERS.contractor.invoice.status,
//           // onFilter: onFilter.indexOf('status'),
//           // width: 150,
//         },
//         {
//           dataIndex: 'invoiceFile',
//           key: 'invoiceFile',
//           render: invoiceFile => (
//             <span className={financeStyles.icons}>
//               <Tooltip title="Скачать файл">
//                 <a href={invoiceFile} download>
//                   <Icon
//                     type="download"
//                     className={financeStyles.icons_download}
//                   />
//                 </a>
//               </Tooltip>
//               {/* <Tooltip title={<span style={{textAlign: "center"}}><div>Загрузить файл</div>подтверждения оплаты</span>}>
//                 <Icon type="upload" className={financeStyles.icons_upload}/>
//               </Tooltip> */}
//             </span>
//           )
//           // width: 100,
//         }
//       ],
//       transactionsHistory: [
//         {
//           title: 'Дата',
//           dataIndex: 'source',
//           key: 'source'
//           // filters: FINANCE_FILTERS.contractor.transactionsHistory.type,
//           // onFilter: onFilter.indexOf('type'),
//           // width: 350,
//         },
//         {
//           title: 'ID операции',
//           dataIndex: 'id',
//           key: 'id'
//           // sorter: NUMBER('orderNumber'),
//           // width: 150,
//         },
//         {
//           title: 'Дата операции',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created)
//           // sorter: STRING('date'),
//           // width: 300,
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => amount.split('.')[0]
//           // sorter: NUMBER('change'),
//         }
//       ],
//       mutualSettlements: [
//         {
//           title: 'Дата',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created)
//         },
//         {
//           title: 'ID продавца',
//           dataIndex: 'partner',
//           key: 'partner'
//         },
//         {
//           title: 'ID заказа',
//           dataIndex: 'systemOrder',
//           key: 'systemOrder'
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => (+amount).toFixed(2)
//           // }, {
//           //   title: 'Коммисия Rozetka',
//           //   dataIndex: 'id',
//           //   key: 'id',
//         },
//         {
//           title: 'Отчисления продавцу',
//           dataIndex: 'zero',
//           key: 'zero'
//         },
//         {
//           title: 'Остаток',
//           dataIndex: 'zero',
//           key: 'zero'
//         },
//         {
//           title: 'Баланс',
//           dataIndex: 'zero',
//           key: 'zero'
//           // }, {
//           //   title: 'Дополнительные расходы',
//           //   dataIndex: 'zero',
//           //   key: 'zero',
//         },
//         {
//           title: 'Статус',
//           dataIndex: 'zero',
//           key: 'zero'
//         }
//       ]
//     },
//     partner: {
//       transactionsHistory: [
//         {
//           title: 'Тип операции',
//           dataIndex: 'source',
//           key: 'source'
//           // filters: FINANCE_FILTERS.partner.transactionsHistory.source,
//           // onFilter: onFilter.indexOf('source'),
//           // width: 350,
//         },
//         {
//           title: 'ID операции',
//           dataIndex: 'id',
//           key: 'id'
//           // sorter: NUMBER('orderNumber'),
//           // width: 300,
//         },
//         {
//           title: 'Дата операции',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created)
//           // sorter: STRING('date'),
//           // width: 300,
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => (+amount).toFixed(2)
//           // sorter: NUMBER('change'),
//         }
//       ],
//       withdrawalRequests: [
//         {
//           title: 'Дата',
//           dataIndex: 'date',
//           key: 'date'
//           // sorter: STRING('date'),
//           // width: 200,
//         },
//         {
//           title: 'Тип',
//           dataIndex: 'type',
//           key: 'type'
//           // filters: FINANCE_FILTERS.partner.withdrawalRequests.type,
//           // onFilter: onFilter.indexOf('type'),
//           // width: 200,
//         },
//         {
//           title: 'Номер заявки',
//           dataIndex: 'requestNumber',
//           key: 'requestNumber'
//           // sorter: STRING('requestNumber'),
//           // width: 200,
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'cost',
//           key: 'cost'
//           // sorter: STRING('cost'),
//           // width: 150,
//         },
//         {
//           title: 'Статус',
//           dataIndex: 'status',
//           key: 'status'
//           // width: 150,
//           // filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
//           // onFilter: onFilter.indexOf('status'),
//         }
//       ],
//       rozetkaTransactionsHistory: [
//         {
//           title: 'Номер операции',
//           dataIndex: 'logId',
//           key: 'log_id'
//           // width: 200,
//         },
//         {
//           title: 'Дата операции',
//           dataIndex: 'transactionTs',
//           key: 'transaction_ts',
//           render: transactionTs => convertTimestamp.toTimeFormat(transactionTs)
//           // width: 200,
//         },
//         {
//           title: 'Тип операции',
//           dataIndex: 'operationType',
//           key: 'operation_type',
//           render: operationType =>
//             ROZETKA_OPERATIONS[operationType] || operationType
//           // filters: FINANCE_FILTERS.partner.rozetkaTransactionsHistory.operationType,
//           // width: 150,
//         },
//         {
//           title: 'ID заказа',
//           dataIndex: 'orderId',
//           key: 'order_id'
//           // width: 150,
//         },
//         {
//           title: 'ID товара',
//           dataIndex: 'productId',
//           key: 'productId'
//           // width: 150,
//         },
//         {
//           title: 'Цена',
//           dataIndex: 'price',
//           key: 'price',
//           render: price => (+price).toFixed(2)
//           // width: 150,
//         },
//         {
//           title: 'Количество',
//           dataIndex: 'quantity',
//           key: 'quantity'
//           // width: 150,
//         },
//         {
//           title: 'Общая стоимость',
//           dataIndex: 'cost',
//           key: 'cost',
//           render: cost => (+cost).toFixed(2)
//           // width: 150,
//         },
//         {
//           title: 'Начисление',
//           dataIndex: 'accrual',
//           key: 'accrual'
//           // width: 100,
//         },
//         {
//           title: 'Списание',
//           dataIndex: 'writeOff',
//           key: 'writeOff'
//           // width: 100,
//         },
//         {
//           title: 'Баланс Rozetka',
//           dataIndex: 'currentBalance',
//           key: 'currentBalance',
//           render: (currentBalance, record) => (
//             <>
//               <span style={{ fontSize: 15, fontWeight: 700 }}>
//                 {(+currentBalance + +record.sumInGray).toFixed(2)}
//               </span>
//               <br />
//               <span style={{ fontSize: 13, fontWeight: 400, color: '#999' }}>
//                 (-{(+record.sumInGray).toFixed(2)})
//               </span>
//             </>
//           )
//           // width: 100,
//         }
//       ],
//       rozetkaInvoices: [
//         {
//           title: 'Дата',
//           dataIndex: 'dateOfInvoice',
//           key: 'dateOfInvoice',
//           render: dateOfInvoice => convertTimestamp.toTimeFormat(dateOfInvoice)
//           // width: 150,
//         },
//         {
//           title: 'Тип',
//           dataIndex: 'type',
//           key: 'type'
//           // width: 150,
//         },
//         {
//           title: 'Номер счета',
//           dataIndex: 'number',
//           key: 'number'
//           // width: 200,
//         },
//         {
//           title: 'Сумма счета',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => (+amount).toFixed(2)
//           // width: 150,
//         },
//         {
//           title: 'Статус оплаты',
//           dataIndex: 'status',
//           key: 'status'
//         },
//         {
//           title: '',
//           dataIndex: 'fileInvoice',
//           key: 'fileInvoice',
//           render: fileInvoice => (
//               <span className={financeStyles.icons}>
//                 <Tooltip placement="top" title="Скачать файл">
//                   <a href={fileInvoice} style={{ width: 'inherit' }}>
//                     <Icon
//                       type="download"
//                       className={financeStyles.icons_download}
//                     />
//                   </a>
//                 </Tooltip>
//               </span>
//             )
//           // width: 70,
//         }
//       ],
//       rozetkaSalesReports: [
//         {
//           title: 'ID',
//           dataIndex: 'id',
//           key: 'id'
//           // width: 150,
//         },
//         {
//           title: 'Rozetka ID',
//           dataIndex: 'rozetkaId',
//           key: 'rozetkaId'
//           // width: 150,
//         },
//         {
//           title: 'Период отсчета',
//           dataIndex: 'reportPeriod',
//           key: 'reportPeriod',
//           render: reportPeriod => convertTimestamp.toPeroidFormat(reportPeriod)
//           // width: 150,
//         },
//         {
//           title: 'Дата создания',
//           dataIndex: 'createdAt',
//           key: 'createdAt',
//           render: createdAt => convertTimestamp.toTimeFormat(createdAt)
//           // width: 150,
//         },
//         {
//           title: 'Статус',
//           dataIndex: 'status',
//           key: 'status'
//         },
//         {
//           title: '',
//           dataIndex: 'reportFile',
//           key: 'reportFile',
//           render: reportFile => (
//               <span className={financeStyles.icons}>
//                 <Tooltip title="Скачать файл">
//                   <a href={reportFile} style={{ width: 'inherit' }}>
//                     <Icon
//                       type="download"
//                       className={financeStyles.icons_download}
//                     />
//                   </a>
//                 </Tooltip>
//               </span>
//             )
//           // width: 118,
//         }
//       ],
//       mutualSettlements: [
//         {
//           title: 'Дата',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created)
//         },
//         {
//           title: 'ID поставщика',
//           dataIndex: 'id',
//           key: 'id'
//         },
//         {
//           title: 'ID заказа',
//           dataIndex: 'systemOrder',
//           key: 'systemOrder'
//         },
//         {
//           title: 'Сумма',
//           dataIndex: 'amount',
//           key: 'amount',
//           render: amount => (+amount).toFixed(2)
//           // }, {
//           //   title: 'Коммисия Rozetka',
//           //   dataIndex: 'id',
//           //   key: 'id',
//         },
//         {
//           title: 'Отчисления поставщику',
//           dataIndex: 'zero',
//           key: 'zero'
//         },
//         {
//           title: 'Остаток',
//           dataIndex: 'zero',
//           key: 'zero'
//         },
//         {
//           title: 'Баланс',
//           dataIndex: 'zero',
//           key: 'zero'
//           // }, {
//           //   title: 'Дополнительные расходы',
//           //   dataIndex: 'zero',
//           //   key: 'zero',
//         },
//         {
//           title: 'Статус',
//           dataIndex: 'zero',
//           key: 'zero'
//         }
//       ]
//     }
//   },
//   contractorProducts: {
//     contractor: {
//       uploadsHistory: [
//         {
//           title: 'Дата',
//           dataIndex: 'created',
//           key: 'created',
//           render: created => convertTimestamp.toTimeFormat(created),
//           width: 200
//         },
//         {
//           title: 'Тип файла',
//           dataIndex: 'fileType',
//           key: 'file_type',
//           className: 'column-middle',
//           render: file_type => DOWNLOAD_HISTORY[file_type],
//           width: 150
//         },
//         {
//           title: 'Количество товаров в документе',
//           dataIndex: 'totalProductsCount',
//           key: 'total_products_count',
//           className: 'column-middle'
//         },
//         {
//           title: 'Количество товаров загруженных на платформу',
//           dataIndex: 'importedProductsCount',
//           key: 'imported_products_count',
//           className: 'column-middle'
//         },
//         {
//           title: 'Статус загрузки',
//           dataIndex: 'isUploaded',
//           key: 'is_uploaded',
//           className: 'column-middle',
//           render: is_uploaded =>
//             is_uploaded ? (
//               <Icons
//                 variants="default"
//                 icon="check_circle"
//                 style={{ color: 'green' }}
//               />
//             ) : (
//               <CircularProgress />
//             )
//         },
//         {
//           title: 'Ошибки',
//           dataIndex: 'errors',
//           key: 'errors',
//           className: 'column-middle',
//           render: errors =>
//             !errors || errors === 'No errors' ? (
//               <Icons
//                 variants="default"
//                 icon="check_circle"
//                 style={{ color: 'green' }}
//               />
//             ) : (
//               <Tooltip title={errors}>
//                 <Icon
//                   type="warning"
//                   style={{ fontSize: '24px', color: 'red' }}
//                 />
//               </Tooltip>
//             )
//         },
//         {
//           title: 'Файл',
//           dataIndex: 'xlsFile',
//           key: 'xls_file',
//           className: 'column-middle',
//           render: xls_file => (
//             <Tooltip title="Загрузить файл">
//               <a
//                 href={'http://api.buy-sell.com.ua' + xls_file}
//                 download
//                 // target="_blank"
//                 style={{ display: 'inline-block' }}
//               >
//                 <Icons
//                   style={{ color: '#26c6da' }}
//                   variants="default"
//                   icon="cloud_download"
//                   // style={{ fontSize: '24px', color: '#4A90E2' }}
//                 />
//               </a>
//             </Tooltip>
//           )
//         }
//       ]
//     }
//   }
// };

// // Code below need to be deleted

// export const FINANCE_COLUMNS = {
//   contractor: {
//     invoiceForPayment: [
//       {
//         title: 'Дата',
//         dataIndex: 'date',
//         key: 'date',
//         sorter: STRING('date')
//         // width: 200,
//       },
//       {
//         title: 'Тип',
//         dataIndex: 'type',
//         key: 'type',
//         filters: FINANCE_FILTERS.contractor.invoice.type,
//         onFilter: onFilter.indexOf('type')
//         // width: 200,
//       },
//       {
//         title: 'ID оплаты',
//         dataIndex: 'accountNumber',
//         key: 'accountNumber',
//         sorter: STRING('accountNumber')
//         // width: 200,
//       },
//       {
//         title: 'Сумма',
//         dataIndex: 'cost',
//         key: 'cost',
//         sorter: STRING('cost')
//         // width: 150,
//       },
//       {
//         title: 'Статус',
//         dataIndex: 'status',
//         key: 'status',
//         filters: FINANCE_FILTERS.contractor.invoice.status,
//         onFilter: onFilter.indexOf('status')
//         // width: 150,
//       },
//       {
//         render: () => (
//           <span className={financeStyles.icons}>
//             <Tooltip title="Скачать файл">
//               <Icon type="download" className={financeStyles.icons_download} />
//             </Tooltip>
//             <Tooltip
//               title={
//                 <span style={{ textAlign: 'center' }}>
//                   <div>Загрузить файл</div>подтверждения оплаты
//                 </span>
//               }
//             >
//               <Icon type="upload" className={financeStyles.icons_upload} />
//             </Tooltip>
//           </span>
//         )
//         // width: 100,
//       }
//     ],
//     transactionsHistory: [
//       {
//         title: 'Тип операции',
//         dataIndex: 'source',
//         key: 'source'
//         // width: 350,
//         // filters: FINANCE_FILTERS.contractor.transactionsHistory.type,
//         // onFilter: onFilter.indexOf('type'),
//       },
//       {
//         title: 'ID операции',
//         dataIndex: 'id',
//         key: 'id'
//         // width: 150,
//         // sorter: NUMBER('orderNumber'),
//       },
//       {
//         title: 'Дата операции',
//         dataIndex: 'created',
//         key: 'created',
//         // width: 300,
//         render: created => {
//           const date = new Date(created);
//           return `${(date.getDate() + '').padStart(2, 0)}.${(
//             date.getMonth() +
//             1 +
//             ''
//           ).padStart(2, 0)}.${date.getFullYear()}`;
//         }
//         // sorter: STRING('date'),
//       },
//       {
//         title: 'Сумма',
//         dataIndex: 'amount',
//         key: 'amount',
//         render: amount => amount.split('.')[0]
//         // sorter: NUMBER('change'),
//       }
//     ]
//   },
//   partner: {
//     transactionsHistory: [
//       {
//         title: 'Тип операции',
//         dataIndex: 'type',
//         key: 'type',
//         filters: FINANCE_FILTERS.partner.transactionsHistory.type,
//         onFilter: onFilter.indexOf('type')
//         // width: 350,
//       },
//       {
//         title: 'ID операции',
//         dataIndex: 'orderNumber',
//         key: 'orderNumber',
//         sorter: NUMBER('orderNumber')
//         // width: 300,
//       },
//       {
//         title: 'Дата операции',
//         dataIndex: 'date',
//         key: 'date',
//         sorter: STRING('date')
//         // width: 300,
//       },
//       {
//         title: 'Сумма',
//         dataIndex: 'change',
//         key: 'change',
//         sorter: NUMBER('change')
//       }
//     ],
//     withdrawalRequests: [
//       {
//         title: 'Дата',
//         dataIndex: 'date',
//         key: 'date',
//         sorter: STRING('date')
//         // width: 200,
//       },
//       {
//         title: 'Тип',
//         dataIndex: 'type',
//         key: 'type',
//         filters: FINANCE_FILTERS.partner.withdrawalRequests.type,
//         onFilter: onFilter.indexOf('type')
//         // width: 200,
//       },
//       {
//         title: 'Номер заявки',
//         dataIndex: 'requestNumber',
//         key: 'requestNumber',
//         sorter: STRING('requestNumber')
//         // width: 200,
//       },
//       {
//         title: 'Сумма',
//         dataIndex: 'cost',
//         key: 'cost',
//         sorter: STRING('cost')
//         // width: 150,
//       },
//       {
//         title: 'Статус',
//         dataIndex: 'status',
//         key: 'status',
//         filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
//         onFilter: onFilter.indexOf('status')
//         // width: 150,
//       }
//     ],
//     rozetkatransactionsHistory: [
//       {
//         title: 'Номер операции',
//         dataIndex: 'operationId',
//         key: 'operationId',
//         width: 200
//       },
//       {
//         title: 'Дата операции',
//         dataIndex: 'date',
//         key: 'date',
//         width: 200
//       },
//       {
//         title: 'Тип операции',
//         dataIndex: 'type',
//         key: 'type',
//         width: 150
//       },
//       {
//         title: 'ID заказа',
//         dataIndex: 'orederId',
//         key: 'orederId',
//         width: 150
//       },
//       {
//         title: 'ID товара',
//         dataIndex: 'productId',
//         key: 'productId',
//         width: 150
//       },
//       {
//         title: 'Цена',
//         dataIndex: 'price',
//         key: 'price',
//         width: 150
//       },
//       {
//         title: 'Количество',
//         dataIndex: 'amount',
//         key: 'amount',
//         width: 150
//       },
//       {
//         title: 'Общая стоимость',
//         dataIndex: 'total',
//         key: 'total',
//         width: 150
//       },
//       {
//         title: 'Начисление',
//         dataIndex: 'accrual',
//         key: 'accrual',
//         width: 100
//       },
//       {
//         title: 'Списание',
//         dataIndex: 'writeOff',
//         key: 'writeOff',
//         width: 100
//       }
//     ],
//     rozetkaInvoiceForPayment: [
//       {
//         title: 'Дата',
//         dataIndex: 'date',
//         key: 'date',
//         width: 200
//       },
//       {
//         title: 'Тип',
//         dataIndex: 'type',
//         key: 'type',
//         width: 200
//       },
//       {
//         title: 'Номер счета',
//         dataIndex: 'accountNumber',
//         key: 'accountNumber',
//         width: 200
//       },
//       {
//         title: 'Сумма счета',
//         dataIndex: 'amount',
//         key: 'amount',
//         width: 150
//       },
//       {
//         title: 'Статус оплаты',
//         dataIndex: 'status',
//         key: 'status',
//         width: 150
//       },
//       {
//         title: 'Файл',
//         // dataIndex: 'file',
//         // key: 'file',
//         render: () => (
//           <span className={financeStyles.icons}>
//             <Tooltip title="Скачать файл">
//               <Icon type="download" className={financeStyles.icons_download} />
//             </Tooltip>
//           </span>
//         )
//       }
//     ],
//     rozetkaSalesReports: [
//       {
//         title: 'ID',
//         dataIndex: 'id',
//         key: 'id',
//         width: 200
//       },
//       {
//         title: 'Период отсчета',
//         dataIndex: 'period',
//         key: 'period',
//         width: 200
//       },
//       {
//         title: 'Дата создания',
//         dataIndex: 'date',
//         key: 'date',
//         width: 200
//       },
//       {
//         title: 'Статус',
//         dataIndex: 'status',
//         key: 'status',
//         width: 150
//       },
//       {
//         title: 'Файл отчета',
//         // dataIndex: 'file',
//         // key: 'file',
//         render: () => (
//           <span className={financeStyles.icons}>
//             <Tooltip title="Скачать файл">
//               <Icon type="download" className={financeStyles.icons_download} />
//             </Tooltip>
//           </span>
//         )
//       }
//     ]
//   }
// };






//OurFinanceTable

import React from 'react';
import { Icon, Tooltip } from 'antd';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BASE_URL } from 'constants/apiUrls';
import financeStyles from '../containers/AdministratorSide/Finance/Finance.module.css';
import Icons from '../containers/AdministratorSide/components/Icons/Icons';
import { NUMBER, STRING } from './TabColumnSorters';
import { FINANCE_FILTERS } from './TabColumnFilters';
import { onFilter } from './TabColumnOnFilter';

const months = [
  'январь',
  'февраль',
  'март',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь'
];
const convertTimestamp = {
  toPeroidFormat: timestamp => {
    const date = new Date(timestamp);
    return `${months[date.getMonth()]} ${date.getFullYear()} г.`;
  },
  toDateFormat: timestamp => {
    const date = new Date(timestamp);
    return `${(date.getDate() + '').padStart(2, 0)}.${(
      date.getMonth() +
      1 +
      ''
    ).padStart(2, 0)}.${date.getFullYear()}`;
  },
  toTimeFormat: timestamp => {
    const date = new Date(timestamp);
    return `${(date.getDate() + '').padStart(2, 0)}.${(
      date.getMonth() +
      1 +
      ''
    ).padStart(2, 0)}.${date.getFullYear()}
    ${(date.getHours() + '').padStart(2, 0)}:${(
        date.getMinutes() + ''
      ).padStart(2, 0)}`;
  }
};
// const peroidFormat = (timestamp) => {
//   const date = new Date(timestamp);
//   return `${months[date.getMonth()]} ${date.getFullYear()} г.`
// };
// const dateFormat = (timestamp) => {
//   const date = new Date(timestamp);
//   return `${(date.getDate()+'').padStart(2,0)}.${(date.getMonth()+1+'').padStart(2,0)}.${date.getFullYear()}`
// };
// const timeFormat = (timestamp) => {
//   const date = new Date(timestamp);
//   return `${(date.getDate()+'').padStart(2,0)}.${(date.getMonth()+1+'').padStart(2,0)}.${date.getFullYear()}
//   ${(date.getHours() + '').padStart(2,0)}:${(date.getMinutes() + '').padStart(2,0)}`
// };

const ROZETKA_OPERATIONS = [
  '',
  'Резервирование суммы по сделанному заказу',
  'Комиссия за продажу',
  'Снятие резерва за невыполненный заказ',
  'Пополнение счета',
  'Оплата доступа к платформе',
  'Корретировка баланса',
  'Корректировка заказа',
  'Изменение количества в заказе',
  'Удаление товара из заказа',
  'Резервирование суммы по добавленному товару',
  'Корретировка счета абонплаты (проведена вручную)',
  'Пополнение счета за доступ к платформе',
  'Корретировка счета, сделанная программно',
  'Возврат заказа',
  'Корректировка роялти по заказу - возврат комиссии по заказу',
  'Корректировка счета роялти - между абонплатой и роялти'
];

const index = BASE_URL.indexOf('/api/v1');
const downloadBaseUrl = BASE_URL.slice(0, index);

// const TRANSACTION_SOURCES = [
//   '',
//   'Пополнение баланса',
//   'Покупка пакета',
//   'Вывод средств',
//   'Успешный заказ',
//   'Возврат товара'
// ];

const DOWNLOAD_HISTORY = {
  prom: 'prom',
  promYml: 'promYml',
  yml: 'YML',
  inner: 'XLS',
  rozetka: 'Rozetka'
};

export const COLUMNS = {
  financeColumns: {
    contractor: {
      invoicesForPayment: [
        {
          title: 'Дата',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created)
          // sorter: STRING('date'),
          // width: 200,
        },
        {
          title: 'Тип',
          dataIndex: 'liqpayOrderId',
          key: 'liqpayOrderId',
          render: liqpayOrderId => (liqpayOrderId ? 'LiqPay' : 'Счет-фактура')
          // filters: FINANCE_FILTERS.contractor.invoice.type,
          // onFilter: onFilter.indexOf('type'),
          // width: 200,
        },
        {
          title: 'ID оплаты',
          dataIndex: 'id',
          key: 'id'
          // sorter: STRING('accountNumber'),
          // width: 200,
        },
        {
          title: 'Сумма',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => (
            <div style={{ textAlign: 'end' }}>{(+amount).toFixed(2)}</div>
          ),
          // sorter: STRING('cost'),
          width: 100
        },
        {
          title: 'Статус',
          dataIndex: 'isApproved',
          key: 'isApproved',
          render: isApproved =>
            isApproved ? (
              <span style={{ color: 'green' }}>APPROVED</span>
            ) : (
                <span style={{ color: 'red' }}>NOT APPROVED</span>
              )
          // filters: FINANCE_FILTERS.contractor.invoice.status,
          // onFilter: onFilter.indexOf('status'),
          // width: 150,
        },
        {
          dataIndex: 'invoiceFile',
          key: 'invoiceFile',
          render: invoiceFile => (
            <span className={financeStyles.icons}>
              <Tooltip title="Скачать файл">
                <a href={invoiceFile} download>
                  <Icon
                    type="download"
                    className={financeStyles.icons_download}
                  />
                </a>
              </Tooltip>
              {/* <Tooltip title={<span style={{textAlign: "center"}}><div>Загрузить файл</div>подтверждения оплаты</span>}>
                <Icon type="upload" className={financeStyles.icons_upload}/>
              </Tooltip> */}
            </span>
          )
          // width: 100,
        }
      ],
      transactionsHistory: [
        {
          title: 'Дата операции',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created)
          // sorter: STRING('date'),
          // width: 300,
        },
        {
          title: 'ID операции',
          dataIndex: 'id',
          key: 'id'
          // sorter: NUMBER('orderNumber'),
          // width: 150,
        },          
        {
          title: 'Тип транзакции',
          dataIndex: 'source',
          key: 'source'
          // filters: FINANCE_FILTERS.contractor.transactionsHistory.type,
          // onFilter: onFilter.indexOf('type'),
          // width: 350,
        },
        {
          title: 'ID операции',
          dataIndex: 'id',
          key: 'id'
          // sorter: NUMBER('orderNumber'),
          // width: 150,
        },
        {
          title: 'Сума',
          dataIndex: 'transactionResult',
          key: 'transactionResult',
          // render: (agentCommission, amount) => <div>{agentCommission ? agentCommission : amount}</div>
          
          // sorter: NUMBER('orderNumber'),
          // width: 150,
        },
        // {
        //   title: 'Сумма',
        //   dataIndex: 'amount',
        //   key: 'amount',
        //   render: amount => amount.split('.')[0]
        //   // sorter: NUMBER('change'),
        // }
        {
          title: 'Статус',
          dataIndex: 'transactionInfo',
          key: 'transactionInfo',

          render: transactionInfo => <div style={{color: transactionInfo.color}}>{transactionInfo.name}</div>

          // render: transactionStatus => <div>{transactionStatus === 2 ? } </div>
          // width: 150,
          // filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
          // onFilter: onFilter.indexOf('status'),
        }
      ],
      mutualSettlements: [
        {
          title: 'Дата',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created)
        },
        {
          title: 'ID продавца',
          dataIndex: 'partner',
          key: 'partner'
        },
        {
          title: 'ID заказа',
          dataIndex: 'systemOrder',
          key: 'systemOrder'
        },
        {
          title: 'Сумма',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => (+amount).toFixed(2)
          // }, {
          //   title: 'Коммисия Rozetka',
          //   dataIndex: 'id',
          //   key: 'id',
        },
        {
          title: 'Отчисления продавцу',
          dataIndex: 'zero',
          key: 'zero'
        },
        {
          title: 'Остаток',
          dataIndex: 'zero',
          key: 'zero'
        },
        {
          title: 'Баланс',
          dataIndex: 'zero',
          key: 'zero'
          // }, {
          //   title: 'Дополнительные расходы',
          //   dataIndex: 'zero',
          //   key: 'zero',
        },
        {
          title: 'Статус',
          dataIndex: 'zero',
          key: 'zero'
        }
      ]
    },
    partner: {
      transactionsHistory: [
        {
          title: 'Дата операции',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created)
          // sorter: STRING('date'),
          // width: 300,
        },
        {
          title: 'ID операции',
          dataIndex: 'id',
          key: 'id'
          // sorter: NUMBER('orderNumber'),
          // width: 300,
        },
        {
          title: 'Номер заказа',
          dataIndex: 'orderId',
          key: 'orderId'
          // sorter: NUMBER('orderNumber'),
          // width: 300,
        },
        {
          title: 'Тип операции',
          dataIndex: 'source',
          key: 'source'
          // filters: FINANCE_FILTERS.partner.transactionsHistory.source,
          // onFilter: onFilter.indexOf('source'),
          // width: 350,
        },
        {
          title: 'Сумма',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => (+amount).toFixed(2)
          // sorter: NUMBER('change'),
        },
        {
          title: 'Статус',
          dataIndex: 'transactionInfo',
          key: 'transactionInfo',

          render: transactionInfo => <div style={{color: transactionInfo.color}}>{transactionInfo.name}</div>
          // width: 150,
          // filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
          // onFilter: onFilter.indexOf('status'),
        }
      ],
      withdrawalRequests: [
        {
          title: 'Дата',
          dataIndex: 'date',
          key: 'date'
          // sorter: STRING('date'),
          // width: 200,
        },
        {
          title: 'Тип',
          dataIndex: 'type',
          key: 'type'
          // filters: FINANCE_FILTERS.partner.withdrawalRequests.type,
          // onFilter: onFilter.indexOf('type'),
          // width: 200,
        },
        {
          title: 'Номер заявки',
          dataIndex: 'requestNumber',
          key: 'requestNumber'
          // sorter: STRING('requestNumber'),
          // width: 200,
        },
        {
          title: 'Сумма',
          dataIndex: 'cost',
          key: 'cost'
          // sorter: STRING('cost'),
          // width: 150,
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status'
          // width: 150,
          // filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
          // onFilter: onFilter.indexOf('status'),
        }
      ],
      rozetkaTransactionsHistory: [
        {
          title: 'Номер операции',
          dataIndex: 'logId',
          key: 'log_id'
          // width: 200,
        },
        {
          title: 'Дата операции',
          dataIndex: 'transactionTs',
          key: 'transaction_ts',
          render: transactionTs => convertTimestamp.toTimeFormat(transactionTs)
          // width: 200,
        },
        {
          title: 'Тип операции',
          dataIndex: 'operationType',
          key: 'operation_type',
          render: operationType =>
            ROZETKA_OPERATIONS[operationType] || operationType
          // filters: FINANCE_FILTERS.partner.rozetkaTransactionsHistory.operationType,
          // width: 150,
        },
        {
          title: 'ID заказа',
          dataIndex: 'orderId',
          key: 'order_id'
          // width: 150,
        },
        {
          title: 'ID товара',
          dataIndex: 'productId',
          key: 'productId'
          // width: 150,
        },
        {
          title: 'Цена',
          dataIndex: 'price',
          key: 'price',
          render: price => (+price).toFixed(2)
          // width: 150,
        },
        {
          title: 'Количество',
          dataIndex: 'quantity',
          key: 'quantity'
          // width: 150,
        },
        {
          title: 'Общая стоимость',
          dataIndex: 'cost',
          key: 'cost',
          render: cost => (+cost).toFixed(2)
          // width: 150,
        },
        {
          title: 'Начисление',
          dataIndex: 'accrual',
          key: 'accrual'
          // width: 100,
        },
        {
          title: 'Списание',
          dataIndex: 'writeOff',
          key: 'writeOff'
          // width: 100,
        },
        {
          title: 'Баланс Rozetka',
          dataIndex: 'currentBalance',
          key: 'currentBalance',
          render: (currentBalance, record) => (
            <>
              <span style={{ fontSize: 15, fontWeight: 700 }}>
                {(+currentBalance + +record.sumInGray).toFixed(2)}
              </span>
              <br />
              <span style={{ fontSize: 13, fontWeight: 400, color: '#999' }}>
                (-{(+record.sumInGray).toFixed(2)})
              </span>
            </>
          )
          // width: 100,
        }
      ],
      rozetkaInvoices: [
        {
          title: 'Дата',
          dataIndex: 'dateOfInvoice',
          key: 'dateOfInvoice',
          render: dateOfInvoice => convertTimestamp.toTimeFormat(dateOfInvoice)
          // width: 150,
        },
        {
          title: 'Тип',
          dataIndex: 'type',
          key: 'type'
          // width: 150,
        },
        {
          title: 'Номер счета',
          dataIndex: 'number',
          key: 'number'
          // width: 200,
        },
        {
          title: 'Сумма счета',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => (+amount).toFixed(2)
          // width: 150,
        },
        {
          title: 'Статус оплаты',
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: '',
          dataIndex: 'fileInvoice',
          key: 'fileInvoice',
          render: fileInvoice => (
            <span className={financeStyles.icons}>
              <Tooltip placement="top" title="Скачать файл">
                <a href={fileInvoice} style={{ width: 'inherit' }}>
                  <Icon
                    type="download"
                    className={financeStyles.icons_download}
                  />
                </a>
              </Tooltip>
            </span>
          )
          // width: 70,
        }
      ],
      rozetkaSalesReports: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
          // width: 150,
        },
        {
          title: 'Rozetka ID',
          dataIndex: 'rozetkaId',
          key: 'rozetkaId'
          // width: 150,
        },
        {
          title: 'Период отсчета',
          dataIndex: 'reportPeriod',
          key: 'reportPeriod',
          render: reportPeriod => convertTimestamp.toPeroidFormat(reportPeriod)
          // width: 150,
        },
        {
          title: 'Дата создания',
          dataIndex: 'createdAt',
          key: 'createdAt',
          render: createdAt => convertTimestamp.toTimeFormat(createdAt)
          // width: 150,
        },
        {
          title: 'Статус',
          dataIndex: 'status',
          key: 'status'
        },
        {
          title: '',
          dataIndex: 'reportFile',
          key: 'reportFile',
          render: reportFile => (
            <span className={financeStyles.icons}>
              <Tooltip title="Скачать файл">
                <a href={reportFile} style={{ width: 'inherit' }}>
                  <Icon
                    type="download"
                    className={financeStyles.icons_download}
                  />
                </a>
              </Tooltip>
            </span>
          )
          // width: 118,
        }
      ],
      mutualSettlements: [
        {
          title: 'Дата',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created)
        },
        {
          title: 'ID поставщика',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: 'ID заказа',
          dataIndex: 'systemOrder',
          key: 'systemOrder'
        },
        {
          title: 'Сумма',
          dataIndex: 'amount',
          key: 'amount',
          render: amount => (+amount).toFixed(2)
          // }, {
          //   title: 'Коммисия Rozetka',
          //   dataIndex: 'id',
          //   key: 'id',
        },
        {
          title: 'Отчисления поставщику',
          dataIndex: 'zero',
          key: 'zero'
        },
        {
          title: 'Остаток',
          dataIndex: 'zero',
          key: 'zero'
        },
        {
          title: 'Баланс',
          dataIndex: 'zero',
          key: 'zero'
          // }, {
          //   title: 'Дополнительные расходы',
          //   dataIndex: 'zero',
          //   key: 'zero',
        },
        {
          title: 'Статус',
          dataIndex: 'zero',
          key: 'zero'
        }
      ]
    }
  },
  contractorProducts: {
    contractor: {
      uploadsHistory: [
        {
          title: 'Дата',
          dataIndex: 'created',
          key: 'created',
          render: created => convertTimestamp.toTimeFormat(created),
          width: 200
        },
        {
          title: 'Тип файла',
          dataIndex: 'fileType',
          key: 'file_type',
          className: 'column-middle',
          render: file_type => DOWNLOAD_HISTORY[file_type],
          width: 150
        },
        {
          title: 'Количество товаров в документе',
          dataIndex: 'totalProductsCount',
          key: 'total_products_count',
          className: 'column-middle'
        },
        {
          title: 'Количество товаров загруженных на платформу',
          dataIndex: 'importedProductsCount',
          key: 'imported_products_count',
          className: 'column-middle'
        },
        {
          title: 'Статус загрузки',
          dataIndex: 'isUploaded',
          key: 'is_uploaded',
          className: 'column-middle',
          render: is_uploaded =>
            is_uploaded ? (
              <Icons
                variants="default"
                icon="check_circle"
                style={{ color: 'green' }}
              />
            ) : (
                <CircularProgress />
              )
        },
        {
          title: 'Ошибки',
          dataIndex: 'errors',
          key: 'errors',
          className: 'column-middle',
          render: errors =>
            !errors || errors === 'No errors' ? (
              <Icons
                variants="default"
                icon="check_circle"
                style={{ color: 'green' }}
              />
            ) : (
                <Tooltip title={errors}>
                  <Icon
                    type="warning"
                    style={{ fontSize: '24px', color: 'red' }}
                  />
                </Tooltip>
              )
        },
        {
          title: 'Файл',
          dataIndex: 'xlsFile',
          key: 'xls_file',
          className: 'column-middle',
          render: xls_file => (
            <Tooltip title="Загрузить файл">
              <a
                href={downloadBaseUrl + xls_file}
                download
                // target="_blank"
                style={{ display: 'inline-block' }}
              >
                <Icons
                  style={{ color: '#26c6da' }}
                  variants="default"
                  icon="cloud_download"
                // style={{ fontSize: '24px', color: '#4A90E2' }}
                />
              </a>
            </Tooltip>
          )
        }
      ]
    }
  }
};

// Code below need to be deleted

export const FINANCE_COLUMNS = {
  contractor: {
    invoiceForPayment: [
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        sorter: STRING('date')
        // width: 200,
      },
      {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        filters: FINANCE_FILTERS.contractor.invoice.type,
        onFilter: onFilter.indexOf('type')
        // width: 200,
      },
      {
        title: 'ID оплаты',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
        sorter: STRING('accountNumber')
        // width: 200,
      },
      {
        title: 'Сумма',
        dataIndex: 'cost',
        key: 'cost',
        sorter: STRING('cost')
        // width: 150,
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        filters: FINANCE_FILTERS.contractor.invoice.status,
        onFilter: onFilter.indexOf('status')
        // width: 150,
      },
      {
        render: () => (
          <span className={financeStyles.icons}>
            <Tooltip title="Скачать файл">
              <Icon type="download" className={financeStyles.icons_download} />
            </Tooltip>
            <Tooltip
              title={
                <span style={{ textAlign: 'center' }}>
                  <div>Загрузить файл</div>подтверждения оплаты
                </span>
              }
            >
              <Icon type="upload" className={financeStyles.icons_upload} />
            </Tooltip>
          </span>
        )
        // width: 100,
      }
    ],
    transactionsHistory: [
      {
        title: 'Тип операции',
        dataIndex: 'source',
        key: 'source'
        // width: 350,
        // filters: FINANCE_FILTERS.contractor.transactionsHistory.type,
        // onFilter: onFilter.indexOf('type'),
      },
      {
        title: 'ID операции',
        dataIndex: 'id',
        key: 'id'
        // width: 150,
        // sorter: NUMBER('orderNumber'),
      },
      {
        title: 'Дата операции',
        dataIndex: 'created',
        key: 'created',
        // width: 300,
        render: created => {
          const date = new Date(created);
          return `${(date.getDate() + '').padStart(2, 0)}.${(
            date.getMonth() +
            1 +
            ''
          ).padStart(2, 0)}.${date.getFullYear()}`;
        }
        // sorter: STRING('date'),
      },
      {
        title: 'Сумма',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => amount.split('.')[0]
        // sorter: NUMBER('change'),
      }
    ]
  },
  partner: {
    transactionsHistory: [
      {
        title: 'Тип операции',
        dataIndex: 'type',
        key: 'type',
        filters: FINANCE_FILTERS.partner.transactionsHistory.type,
        onFilter: onFilter.indexOf('type')
        // width: 350,
      },
      {
        title: 'ID операции',
        dataIndex: 'orderNumber',
        key: 'orderNumber',
        sorter: NUMBER('orderNumber')
        // width: 300,
      },
      {
        title: 'Дата операции',
        dataIndex: 'date',
        key: 'date',
        sorter: STRING('date')
        // width: 300,
      },
      {
        title: 'Сумма',
        dataIndex: 'change',
        key: 'change',
        sorter: NUMBER('change')
      }
    ],
    withdrawalRequests: [
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        sorter: STRING('date')
        // width: 200,
      },
      {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        filters: FINANCE_FILTERS.partner.withdrawalRequests.type,
        onFilter: onFilter.indexOf('type')
        // width: 200,
      },
      {
        title: 'Номер заявки',
        dataIndex: 'requestNumber',
        key: 'requestNumber',
        sorter: STRING('requestNumber')
        // width: 200,
      },
      {
        title: 'Сумма',
        dataIndex: 'cost',
        key: 'cost',
        sorter: STRING('cost')
        // width: 150,
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        filters: FINANCE_FILTERS.partner.withdrawalRequests.status,
        onFilter: onFilter.indexOf('status')
        // width: 150,
      }
    ],
    rozetkatransactionsHistory: [
      {
        title: 'Номер операции',
        dataIndex: 'operationId',
        key: 'operationId',
        width: 200
      },
      {
        title: 'Дата операции',
        dataIndex: 'date',
        key: 'date',
        width: 200
      },
      {
        title: 'Тип операции',
        dataIndex: 'type',
        key: 'type',
        width: 150
      },
      {
        title: 'ID заказа',
        dataIndex: 'orederId',
        key: 'orederId',
        width: 150
      },
      {
        title: 'ID товара',
        dataIndex: 'productId',
        key: 'productId',
        width: 150
      },
      {
        title: 'Цена',
        dataIndex: 'price',
        key: 'price',
        width: 150
      },
      {
        title: 'Количество',
        dataIndex: 'amount',
        key: 'amount',
        width: 150
      },
      {
        title: 'Общая стоимость',
        dataIndex: 'total',
        key: 'total',
        width: 150
      },
      {
        title: 'Начисление',
        dataIndex: 'accrual',
        key: 'accrual',
        width: 100
      },
      {
        title: 'Списание',
        dataIndex: 'writeOff',
        key: 'writeOff',
        width: 100
      }
    ],
    rozetkaInvoiceForPayment: [
      {
        title: 'Дата',
        dataIndex: 'date',
        key: 'date',
        width: 200
      },
      {
        title: 'Тип',
        dataIndex: 'type',
        key: 'type',
        width: 200
      },
      {
        title: 'Номер счета',
        dataIndex: 'accountNumber',
        key: 'accountNumber',
        width: 200
      },
      {
        title: 'Сумма счета',
        dataIndex: 'amount',
        key: 'amount',
        width: 150
      },
      {
        title: 'Статус оплаты',
        dataIndex: 'status',
        key: 'status',
        width: 150
      },
      {
        title: 'Файл',
        // dataIndex: 'file',
        // key: 'file',
        render: () => (
          <span className={financeStyles.icons}>
            <Tooltip title="Скачать файл">
              <Icon type="download" className={financeStyles.icons_download} />
            </Tooltip>
          </span>
        )
      }
    ],
    rozetkaSalesReports: [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 200
      },
      {
        title: 'Период отсчета',
        dataIndex: 'period',
        key: 'period',
        width: 200
      },
      {
        title: 'Дата создания',
        dataIndex: 'date',
        key: 'date',
        width: 200
      },
      {
        title: 'Статус',
        dataIndex: 'status',
        key: 'status',
        width: 150
      },
      {
        title: 'Файл отчета',
        // dataIndex: 'file',
        // key: 'file',
        render: () => (
          <span className={financeStyles.icons}>
            <Tooltip title="Скачать файл">
              <Icon type="download" className={financeStyles.icons_download} />
            </Tooltip>
          </span>
        )
      }
    ]
  }
};
