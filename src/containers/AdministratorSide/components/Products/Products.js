import React, { Component } from 'react'
import 'antd/dist/antd.css';
import { Table, Modal } from "antd";
import styles from './Products.module.css'
import iphone from "../../../../img/iphone.png";
import iphonexr from "../../../../img/iphone.png";
import edit from "../../../../img/edit.svg";


const columns = [
  {
    title: 'Код товара',
    dataIndex: 'id',
  },
  {
    title: 'Артикул',
    dataIndex: 'vendorCode',
  },
  {
    title: 'Название товара',
    dataIndex: 'name',
    render: (productName, item) => (
      <span className={styles.productItemName}>
        <span className={styles.productImg}>
          <img src={item.coverImages.length > 0 ? item.coverImages[0].imageDecoded : ''} alt="" />
        </span>
        <span>
          {productName}
        </span>
      </span>
    ),
    width: 235,
  },
  {
    title: 'Категория',
    dataIndex: 'category',
  },
  {
    title: 'Цена',
    dataIndex: 'price',
  },
  {
    title: 'Наличие',
    dataIndex: 'count',
    render: (availability, item) => (
      <span className={styles.editBlock}>
        <span className={styles.availability}>
          {availability}
        </span>
        {/*<button className={styles.edit}>*/}
        {/*<img src={item.edit} alt=""/>*/}
        {/*</button>*/}
      </span>
    ),
  },
];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    productCode: '141515d3234',
    vendorCode: 'Jf21414dS',
    product: iphone,
    productName: `iPhone XR 64GB Space Grey ${i}`,
    category: 'Телефоны,MP3, GPS',
    price: '23844.00 грн',
    availability: `В наличии.`,
    edit: edit,
  });
}

class Products extends Component {

  state = {
    selectedRowKeys: [],
    visible: false// Check here to configure the default column
  };

  onSelectChange = (selectedRowKeys) => {
    this.props.onSelectedProducts(selectedRowKeys);

    this.setState({ selectedRowKeys });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }


  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    };
    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.products}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.showModal()
              },        // click row
            };
          }}
        />
        <div>
          <Modal
            title="iPhone XR 64GB Space Grey"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={false}
            className={styles.productCard}
          >
            <div className={styles.productInfo}>
              <div className={styles.productInfoImg}>
                <img src={iphonexr} alt="" />
              </div>

              <div className={styles.specifications}>
                <div className={styles.specificationsItems}>
                  <div>
                    <label>Поставщик</label>
                    <span>Nazar Market</span>
                  </div>
                  <div>
                    <label>Наличие</label>
                    <span>В наличии</span>
                  </div>
                  <div>
                    <label>Цена</label>
                    <span>23844.00 грн</span>
                  </div>
                </div>
                <div className={styles.specificationsItems}>
                  <div>
                    <label>Артикул</label>
                    <span>Jf21414dS</span>
                  </div>
                  <div>
                    <label>Категория</label>
                    <span>Телефоны, MP3, GPS</span>
                  </div>
                  <div>
                    <label>Бренд</label>
                    <span>Apple</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5 className={styles.descriptionTitle}>Описание</h5>
              <div className={styles.descriptionText}>
                <p>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне.
                    Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.
                    В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов,
                    используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил
                    без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации
                    в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и,
                    в более недавнее время,  программы электронной вёрстки типа Aldus PageMaker, в шаблонах
                                    которых используется Lorem Ipsum.</p>
              </div>
            </div>

          </Modal>
        </div>
      </div>
    );
  }
}

export default Products;





