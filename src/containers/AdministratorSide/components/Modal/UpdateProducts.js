import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Modal, Cascader, notification } from 'antd';
import 'antd/dist/antd.css';
import { withStyles } from '@material-ui/styles';
import { Tab, Tabs, TextField } from '@material-ui/core';

import {
  getOptionsByCategory,
  getOptionsByCategoryWithTextArea,
  updateMassProducts,
} from '../../../../actions/productsActions';
import { getCategoriesForCascaderComponent } from '../../../../store/selectors/categoriesSelector';
import { TabPanel, a11yProps } from '../Tabs/Tabs';

import Options from './Options';
import MyButton from '../../components/Buttons/Button';
import { rootStyle } from '../../../../rootStyle.js';
import styles from '../../MyProducts/MyProducts.module.css';

class UpdateProducts extends Component {
  state = {
    brand: '',
    createdType: '',
    count: '',
    category: '',
    categoryPromX: '',
    promselectedCategories: '',
    cleanPrice: '',
    recommendedPrice: '',
    activeTabKey: 0,
    partnerPercent: '',
    contractorPriceForPartner: '',
    categoriesProm: [],
    selectedCategories: [],
    selectedCategoriesProm: [],
    options: [],
    optionByTextAreas: [],
    manualOptions: [],
    optionsArr: [],
    selectedOption: [],
    selectedOptionsArr: [],
    optionByTextAreasArr: [],
  };

  getOptionsByCategoryId = async () => {
    if (this.state.category) {
      const CATEGORY = this.state.category.id || this.state.category;

      await getOptionsByCategory(CATEGORY) // Получаем массив параметров с селективным заполнением для категории товара
        .then(data => {
          this.setState({
            optionsArr: data
          });
        });

      await getOptionsByCategoryWithTextArea(CATEGORY) // Получаем массив параметров с полуручным заполнением для категории товара
        .then(data => {
          this.setState({
            optionByTextAreasArr: data
          });
        });
    } else {
      this.setState({
        optionsArr: [],
        optionByTextAreasArr: []
      });
    }
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      // TabPanes
      // Tab 1
      brand: '',
      createdType: '',
      count: '',
      // Tab 2
      category: '',
      // categoryPromX: '',
      // Tab 3
      cleanPrice: '',
      // Tab 5
      options: [],
      optionByTextAreas: [],
      manualOptions: [],
      // все возможные опции для категории товара
      optionsArr: [],
      optionByTextAreasArr: [],
      // Выбранные опции для категории товара
      selectedOption: [],
      selectedOptionsArr: [],

      // hide modal
      // set default active Tab
      activeTabKey: 0,
      // reset default value for category selector
      selectedCategories: [],
      // reset others values
      recommendedPrice: '',
      contractorProduct: ''
    });
    this.props.resetFieldsProduct();
  };

  prepareDataUpdate = () => {
    const { brand,
      createdType,
      count,
      category,
      partnerPercent,
      manualOptions,
      cleanPrice,
      recommendedPrice
    } = this.state;

    const params = {};

    if (brand !== '') params.brand = brand;

    if (createdType !== '') params.createdType = createdType;

    if (partnerPercent !== '') params.partnerPercent = partnerPercent;

    if (count !== '') params.count = count;

    if (manualOptions.length !== 0) params.manualOptions = manualOptions;

    if (category !== '') params.category = category;

    if (cleanPrice !== '') params.cleanPrice = cleanPrice;

    if (recommendedPrice !== '') params.recommendedPrice = recommendedPrice;

    return params;
  }

  handleUpdateMassProducts = async () => {
    const { productIds, updateLocalProducts } = this.props;
    const params = this.prepareDataUpdate();

    const updatedProducts = productIds.map(id => ({
      id,
      ...params
    }))

    const { results } = await updateMassProducts(updatedProducts);

    updateLocalProducts(results, params);

    this.handleCancel();
  }

  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  // let dataChangeNewType = React.createRef();

  onChangeCascader = (value, type) => {
    this.setState({
      options: [],
      optionByTextAreas: [],
      // manualOptions: [], //закоментировано так как теперь не нужно чтобы при смене категории обнулялись параметры введённые вручную. Если опять передумают - просто раскомментиру это ;)
      [`selectedCategories${type === 'category' ? '' : 'Prom'}`]: value,
      // selectedCategoriesProm: value,
      [type]: value[value.length - 1]
    });
  };

  // START CALLBACKS for Options
  // сохраняет выбранные параметры в state
  onChangeOptionsCascader = (value, groupId) => {
    // const [value] = value;
    if (!value) {
      const options = [
        ...this.state.options.filter(el => el.group !== groupId)
      ];
      this.setState({
        options
      });
      return;
    }

    const productOptionsArr = this.state.optionsArr;
    const selectedOption = (optionId => {
      const findGroupId = productOptionsArr.find(el =>
        el.values.find(el => el.id === optionId)
      ).id;
      return { group: findGroupId, value };
    })(value);
    const options = [
      ...this.state.options.filter(el => el.group !== selectedOption.group),
      selectedOption
    ];

    this.setState({
      options
    });
  };
  // записывает значение инпута в state

  changeManualOptions = e => {
    let { value } = e.target;
    const FIELDSET = e.target.dataset.fieldset;
    const TYPE = e.target.dataset.type;
    const ID = +e.target.dataset.id;

    if (FIELDSET === 'manual') {
      const updated = [
        ...this.state.manualOptions.map((el, i) =>
          i === ID ? { ...el, [TYPE]: value } : el
        )
      ];
      this.setState({
        manualOptions: updated
      });
    }
    if (FIELDSET === 'semimanual') {
      const updated = value
        ? [
          ...this.state.optionByTextAreas.filter(el => el.group !== ID),
          { group: ID, value: value }
        ]
        : [...this.state.optionByTextAreas.filter(el => el.group !== ID)];
      this.setState({
        optionByTextAreas: updated
      });
    }
  };
  // добавляет поле для полностью ручных параметров
  addManualOptions = () => {
    const { manualOptions } = this.state;

    manualOptions.length === 0
      ? this.setState((state, props) => ({
        manualOptions: [{ group: '', value: '' }]
      }))
      : manualOptions[manualOptions.length - 1].group === '' ||
        manualOptions[manualOptions.length - 1].value === ''
        ? notification.error({
          message:
            'Прежде чем добавить новый параметр, заполните поля предыдущего параметра'
        })
        : this.setState((state, props) => ({
          manualOptions: [...state.manualOptions, { group: '', value: '' }]
        }));
  };

  // удаляет поле для полностью ручных параметров
  removeManualOptions = ID => {
    this.setState((state, props) => ({
      manualOptions: state.manualOptions.filter((el, i) => i !== ID)
    }));
  };

  render() {
    const {
      brand,
      createdType,
      count,
      cleanPrice,
      selectedCategories,
      activeTabKey,
      options,
      optionByTextAreas,
      manualOptions,
      optionsArr,
      optionByTextAreasArr,
      partnerPercent,
      contractorPriceForPartner,
      recommendedPrice
    } = this.state;

    const { visible, categories } = this.props;

    if (!visible) {
      return null;
    }

    return (
      <Modal
        width={925}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={false}
      >
        <div className="modal">
          <Tabs
            value={activeTabKey}
            onChange={(evt, key) => this.setState({ activeTabKey: key })}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Основная информация" {...a11yProps(0)} />
            <Tab label="Категории" {...a11yProps(1)} />
            <Tab label="Цена" {...a11yProps(2)} />
            <Tab label="Параметры" {...a11yProps(3)} />
          </Tabs>
          <TabPanel value={activeTabKey} index={0}>
            <form className={styles.mainInfo}>
              <div className={styles.inputs}>
                <TextField
                  style={{ width: '45%' }}
                  label="Тип товара"
                  name="createdType"
                  type="text"
                  value={createdType}
                  required
                  onChange={this.handleChangeInput}
                  margin="normal"
                />
                <TextField
                  style={{ width: '45%' }}
                  label="Бренд"
                  name="brand"
                  required
                  type="text"
                  value={brand}
                  onChange={this.handleChangeInput}
                  margin="normal"
                />
                <TextField
                  style={{ width: '45%' }}
                  label=" Количество"
                  name="count"
                  type="number"
                  required
                  value={count}
                  onChange={this.handleChangeInput}
                  margin="normal"
                />
              </div>
              <div className={styles.bottomblock}>
                <span>
                  Обратите внимание, что при изминении поля, оно обновится во
                  всех вибраных товарах
                  </span>
                <MyButton
                  style={{ width: 200 }}
                  title="Сохранить"
                  myvariant="green"
                  onClick={this.handleUpdateMassProducts}
                />
              </div>
            </form>
          </TabPanel>
          <TabPanel value={activeTabKey} index={1}>
            <form className={styles.selectCategory}>
              <div className={styles.categorywrapper}>
                <label>
                  Выберите категорию для вашего товара Rozetka
                    <span style={{ color: 'red' }}>*</span>
                </label>
                <Cascader
                  defaultValue={selectedCategories}
                  value={selectedCategories}
                  options={categories}
                  onChange={val => this.onChangeCascader(val, 'category')}
                  changeOnSelect
                  placeholder="Please select"
                  popupPlacement="bottomRight"
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <span>
                  Обратите внимание, что при изменении поля, оно обновится во
                  всех вибраных товарах
                  </span>

                <MyButton
                  style={{ width: 200 }}
                  title="Сохранить"
                  myvariant="green"
                  onClick={this.handleUpdateMassProducts}
                />
              </div>
            </form>
          </TabPanel>
          <TabPanel value={activeTabKey} index={2}>
            <form className={styles.selectPrice}>
              {this.props.user.role === 'PARTNER' ? (
                <div>
                  {/* <p className={styles.priceTitle}>
                    Цена товара от поставщика:
                      <b>{contractorPriceForPartner} ₴</b>
                  </p> */}
                  <TextField
                    type="number"
                    label="Укажите свой процент наценки для товара (%)"
                    name="partnerPercent"
                    value={partnerPercent}
                    onChange={this.handleChangeInput}
                    style={{ width: 350 }}
                    margin="normal"
                  />
                  {/* <p className={styles.priceTitle}>
                    Цена товара после наценки:
                      <b>
                      {parseInt(
                        (+contractorPriceForPartner *
                          (100 + +partnerPercent)) /
                        100
                      )}
                      ₴
                      </b>
                  </p> */}
                </div>
              ) : (
                  <div className={styles.prices}>
                    <TextField
                      label="Укажите цену для вашего товара (грн)"
                      name="cleanPrice"
                      type="number"
                      required
                      fullWidth
                      value={cleanPrice}
                      onChange={this.handleChangeInput}
                      margin="normal"
                    />
                    <TextField
                      label="Укажите рекомендуемую розничную цену для вашего товара (грн)"
                      name="recommendedPrice"
                      type="number"
                      required
                      fullWidth
                      value={recommendedPrice}
                      onChange={this.handleChangeInput}
                      margin="normal"
                    />
                  </div>
                )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {this.props.user.role === 'CONTRACTOR' && (
                  <span>
                    Обратите внимание, что при изминении поля, оно обновится
                    во всех вибраных товарах
                    </span>
                )}
                <MyButton
                  style={{ width: 200 }}
                  title="Сохранить"
                  myvariant="green"
                  onClick={this.handleUpdateMassProducts}
                />
              </div>
            </form>
          </TabPanel>
          <TabPanel value={activeTabKey} index={3}>
            <Options
              selectedOptionsArr={options}
              filledOptionByTextAreas={optionByTextAreas}
              manualOptions={manualOptions}
              optionsArr={optionsArr}
              optionByTextAreasArr={optionByTextAreasArr}
              onChangeOptionsCascader={this.onChangeOptionsCascader}
              changeManualOptions={this.changeManualOptions}
              addManualOptions={this.addManualOptions}
              removeManualOptions={this.removeManualOptions}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>
                Обратите внимание, что при изминении поля, оно обновится во
                всех выбраных товарах
                </span>
              <MyButton
                style={{ width: 200 }}
                title="Сохранить"
                myvariant="green"
                onClick={this.handleUpdateMassProducts}
              />
            </div>
          </TabPanel>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  categories: getCategoriesForCascaderComponent(state)
});

export default compose(
  withStyles(rootStyle),
  connect(mapStateToProps)
)(UpdateProducts);
