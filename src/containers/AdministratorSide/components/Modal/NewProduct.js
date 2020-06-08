import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import { Modal, Cascader, notification } from 'antd';
import 'antd/dist/antd.css';
import Button from '@material-ui/core/Button';
import { Tab, Tabs, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {
  createNewProduct,
  getOptionsByCategory,
  getOptionsByCategoryWithTextArea,
  getFirstLevelCategories,
  updateProduct,
  updateProductRozetka,
  updateProductProm,
  updatePartnerProduct,
  copyProduct
} from '../../../../actions/productsActions';
import { typeRequest } from '../../MyProducts/MyProducts';
import { getCategoriesForCascaderComponent } from '../../../../store/selectors/categoriesSelector';
import { TabPanel, a11yProps } from '../Tabs/Tabs';
import ProductPictureGallery from '../ProductPictureGallery/ProductPictureGallery';
import Options from './Options';
import MyButton from '../../components/Buttons/Button';
import { rootStyle } from '../../../../rootStyle.js';
import styles from '../../MyProducts/MyProducts.module.css';

// const TabPane = Tabs.TabPane;

class NewProduct extends Component {
  state = {
    name: '',
    brand: '',
    vendorCode: '',
    createdType: '',
    count: '',
    category: '',
    categoryPromX: '',
    promselectedCategories: '',
    description: '',
    price: '',
    imageUrl: '',
    imageUrls: [],
    coverImages: [],
    uploadImage: false,
    visible: false,
    activeTabKey: 0,
    selectedCategories: [],
    selectedCategoriesProm: [],
    options: [],
    optionByTextAreas: [],
    cleanPrice: '',
    manualOptions: [],
    optionsArr: [],
    selectedOption: [],
    selectedOptionsArr: [],
    optionByTextAreasArr: []
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
      name: '',
      brand: '',
      vendorCode: '',
      createdType: '',
      count: '',
      description: '',
      // Tab 2
      category: '',
      categoryPromX: '',
      // Tab 3
      price: '',
      // Tab 4
      avatarUrl: '',
      imageUrl: '',
      imageUrls: [],
      coverImages: [],
      uploadImage: false,
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
      visible: false,
      // set default active Tab
      activeTabKey: 0,
      // reset default value for category selector
      selectedCategories: [],
      // reset others values
      id: '',
      recommendedPrice: 0,
      contractorProduct: '',
      cleanPrice: ''
    });
    this.props.resetFieldsProduct();
  };

  // camon(event) { if (window.confirm('Are you sure you wish to delete this item?')) handleCancel() }

  // camon = e => {
  //   if (confirm("Уверены, что хотите на прошлый урок?")) {
  //     handleCancel();
  //     }
  //   else {
  //     alert("Tогда оставайтесь");
  //     }
  // }

  onDrop = async files => {
    let arrFiles =
      this.state.coverImages.length > 0 ? [...this.state.coverImages] : [];

    const images = await Promise.all(
      files.map(file => {
        return this.getBase64(file);
      })
    );
    this.setState(
      prev => ({
        coverImages: [...prev.coverImages, ...images],
        uploadImage: true
      }),
      () => {
        notification.success({
          message: 'Изображение загружено, не забудьте сохранить изменения'
        });
      }
    );
  };

  getBase64(file) {
    return new Promise(resolve => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve({ imageDecoded: reader.result });
      };
      reader.onerror = function(error) {
        throw Error('Error: ', error);
      };
    });
  }
  handleChangeInput = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  };

  checkProductBeforeSave = () => {
    const {
      category,
      count,
      description,
      manualOptions,
      name,
      price,
      cleanPrice,
      vendorCode,
      createdType
    } = this.state;
    let errors = 0;

    !name &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Поле "Название товара" не заполнено'
      });
    !vendorCode &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Поле "Артикул" не заполнено'
      });
    // !createdType &&
    //   ++errors &&
    //   notification.warning({
    //     duration: 5 + errors,
    //     message: 'Поле "Тип" не заполнено'
    //   });
    !count &&
      count !== 0 &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Поле "Количество" не заполнено'
      });
    !description &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message: 'Поле "Описание" не заполнено'
      });
    // !category &&
    //   ++errors &&
    //   notification.warning({
    //     duration: 5 + errors,
    //     message: 'Выберите категорию для вашего товара'
    //   });
    // !price &&
    // this.props.user.role === 'CONTRACTOR' &&
    // ++errors &&
    // notification.warning({
    //   duration: 5 + errors,
    //   message: 'Укажите цену для вашего товара'
    // });
    manualOptions.find(el => el.group === '' || el.value === '') &&
      ++errors &&
      notification.warning({
        duration: 5 + errors,
        message:
          'Все строки дополнительных параметров должны быть заполненны перед сохранением!'
      });

    return errors;
  };

  handleCreateProduct = async e => {
    e.preventDefault();
    if (this.checkProductBeforeSave()) return;
    let newProduct = { ...this.state };
    await createNewProduct(newProduct);
    this.props.onUpdate();
    this.handleCancel();
  };

  handleCopyProduct = async e => {
    e.preventDefault();

    if (this.checkProductBeforeSave()) return;

    if (this.props.user.role === 'PARTNER') {
      typeof this.state.category === 'object'
        ? await copyProduct({
            ...this.state,
            category: this.state.category.id,
            categories: []
          })
        : await copyProduct({
            ...this.state,
            categories: []
          });
    }

    if (this.props.user.role === 'CONTRACTOR') {
      typeof this.state.category === 'object'
        ? await copyProduct({
            ...this.state,
            category: this.state.category ? this.state.category.id : '',
            categories: []
          })
        : await copyProduct({
            ...this.state,
            categories: []
          });
    }

    this.props.onUpdate();
    this.handleCancel();
  };

  updateProduct = async () => {
    let { avatarUrl, coverImages, imageUrls } = this.state;
    if (avatarUrl) {
      const isCoverContainAvatar =
        coverImages.length &&
        coverImages.find(
          el => el.imageDecoded.split('?')[0] === avatarUrl.split('?')[0]
        );
      const isUrlContainAvatar =
        imageUrls.length &&
        imageUrls.find(el => el.url.split('?')[0] === avatarUrl.split('?')[0]);
      if (!isCoverContainAvatar && !isUrlContainAvatar) {
        avatarUrl = '';
      }
    }

    if (this.checkProductBeforeSave()) return;
    let callback = updatePartnerProduct;
    let type = '';
    if (this.props.currentTab == '1') {
      callback = updateProductRozetka;
      type = typeRequest.rozetka;
    } else if (this.props.currentTab == '2') {
      callback = updateProductProm;
      type = typeRequest.prom;
    }

    if (this.props.user.role === 'PARTNER') {
      typeof this.state.category === 'object' ||
      typeof this.state.categoryPromX === 'object'
        ? await callback({
            ...this.state,
            category:
              this.state.category === null
                ? null
                : typeof this.state.category === 'object'
                ? this.state.category.id
                : this.state.category,
            categoryPromX:
              this.state.categoryPromX === null
                ? null
                : typeof this.state.categoryPromX === 'object'
                ? this.state.categoryPromX.id
                : this.state.categoryPromX,
            categories: [],
            avatarUrl
          })
        : await callback({
            ...this.state,
            categories: [],
            avatarUrl
          });
    }
    if (this.props.user.role === 'CONTRACTOR') {
      await updateProduct({
        ...this.state,
        category:
          this.state.category === null
            ? null
            : typeof this.state.category === 'object'
            ? this.state.category.id
            : this.state.category,
        categoryPromX:
          this.state.categoryPromX === null
            ? null
            : typeof this.state.categoryPromX === 'object'
            ? this.state.categoryPromX.id
            : this.state.categoryPromX,
        categories: [],
        avatarUrl
      });
    }

    this.props.onUpdate(type);
    this.handleCancel();
  };

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
  // END CALLBACKS for Options

  handleAddImageUrl = () => {
    this.state.imageUrl &&
      this.setState({
        imageUrl: '',
        imageUrls: [
          ...this.state.imageUrls,
          {
            url: this.state.imageUrl
          }
        ]
      });
  };

  // ========================= callbacks for PPG  =========================
  // =============================== START ===============================
  // ================== (change avatar  of product card) ==================
  changeAvatarUrl = avatarUrl =>
    this.setState({ avatarUrl }, () =>
      notification.success({
        message:
          'Аватар изменён, не забудьте нажать кнопку "Сохранить" чтобы изменения вступили в силу'
      })
    );

  // ====================== (used to delete images) ======================
  handleUpdateImages = (newCovers, newUrls) => {
    this.setState({
      coverImages: [...newCovers],
      imageUrls: [...newUrls]
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.update) {
      this.setState({
        ...nextProps.product,
        visible: true
      });
    }
  }

  // Модальное окно подтверждения удаления изображения
  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить изображение?',
      centered: true,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        const {
          imageList,
          urlImageList,
          coverImageList,
          currentImageIndex
        } = this.state;

        const newImageList = imageList.filter(
          el =>
            el.url !== imageList[currentImageIndex].url ||
            el.imageDecoded !== imageList[currentImageIndex].imageDecoded
        );
        const newUrlImageList = urlImageList.filter(
          el => el.url !== imageList[currentImageIndex].url
        );
        const newCoverImageList = coverImageList.filter(
          el => el.imageDecoded !== imageList[currentImageIndex].imageDecoded
        );

        if (currentImageIndex === imageList.length - 1) {
          this.showPrev();
        }

        this.setState(
          {
            imageList: [...newImageList],
            urlImageList: [...newUrlImageList],
            coverImageList: [...newCoverImageList]
          },
          () => {
            !this.state.imageList.length && this.handleCancel();
            this.props.deleteImage(newCoverImageList, newUrlImageList);
          }
        );
      },
      onCancel: () => {}
    });
  };

  render() {
    const {
      id,
      name,
      brand,
      vendorCode,
      createdType,
      count,
      description,
      price,
      cleanPrice,
      imageUrls,
      imageUrl,
      selectedCategories,
      selectedCategoriesProm,
      activeTabKey,
      coverImages,
      uploadImage,
      options,
      optionByTextAreas,
      manualOptions,
      optionsArr,
      optionByTextAreasArr,
      partnerPercent,
      fixedRecommendedPrice,
      contractorPriceForPartner,
      contractorProduct,
      sellingPrice,
      recommendedPrice
    } = this.state;

    const { categories } = this.props;

    // if (!this.state.visible) {
    //   return null;
    // }

    function CustomComponent() {
      return <div style={{ width: '100%' }} contenteditable="true" dangerouslySetInnerHTML={{__html: description}} />;
    }

    return (
      <div>
        {this.props.user.role === 'CONTRACTOR' && (
          <MyButton
            title="Добавить товар"
            myvariant="withIcon"
            onClick={this.showModal}
          ></MyButton>
        )}

        <Modal
          width={925}
          title={id ? name : 'Новый товар'}
          visible={this.state.visible}
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
              // variant="fullWidth"
              // aria-label="full width tabs example"
            >
              <Tab label="Основная информация" {...a11yProps(0)} />
              <Tab label="Категории" {...a11yProps(1)} />
              <Tab label="Цена" {...a11yProps(2)} />
              <Tab label="Изображение" {...a11yProps(3)} />
              <Tab label="Параметры" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={activeTabKey} index={0}>
              <form className={styles.mainInfo}>
                {/* <div className={styles.inputsGroup}> */}
                <div className={styles.inputs}>
                  <TextField
                    style={{ width: '45%' }}
                    label="Название товара"
                    name="name"
                    type="text"
                    value={name}
                    required
                    onChange={this.handleChangeInput}
                    // helperText={errors.password}
                    margin="normal"
                  />
                  <TextField
                    style={{ width: '45%' }}
                    label="Тип товара"
                    name="createdType"
                    type="text"
                    value={createdType || ''}
                    required
                    onChange={this.handleChangeInput}
                    // helperText={errors.password}
                    margin="normal"
                  />

                  {/* </div> */}
                  <TextField
                    style={{ width: '45%' }}
                    label="Бренд"
                    name="brand"
                    required
                    type="text"
                    value={brand || ''}
                    onChange={this.handleChangeInput}
                    // helperText={errors.password}

                    margin="normal"
                  />
                  <TextField
                    style={{ width: '45%' }}
                    label="Артикул"
                    name="vendorCode"
                    type="text"
                    value={vendorCode || ''}
                    onChange={this.handleChangeInput}
                    fullWidth
                    required
                    // helperText={errors.password}

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
                    // helperText={errors.password}

                    margin="normal"
                  />
                  <TextField
                    label="Описание"
                    name="description"
                    rowsMax="4"
                    multiline
                    required
                    value={description}
                    // dangerouslySetInnerHTML={{ __html: description }}
                    // value={dangerouslySetInnerHTML={ __html: description }}
                    onChange={this.handleChangeInput}
                    fullWidth
                    // helperText={errors.password}

                    margin="normal"
                  />
                  {/* <div style={{ width: '100%' }} contenteditable="true"> 
                    {CustomComponent()}
                  </div> */}
                </div>
                <div className={styles.bottomblock}>
                  <span>
                    <span style={{ color: 'red' }}>*</span> - поле обязательно к
                    заполнению
                  </span>
                  {this.props.user.role === 'CONTRACTOR' && (
                    <button
                      className={styles.copyButton}
                      onClick={this.handleCopyProduct}
                    >
                      Копировать товар
                    </button>
                  )}
                  {id ? (
                    <MyButton
                      style={{ width: 200 }}
                      title="Сохранить"
                      myvariant="green"
                      onClick={this.updateProduct}
                    />
                  ) : (
                    <MyButton
                      style={{ width: 200 }}
                      title="Далее"
                      myvariant="green"
                      onClick={() => this.setState({ activeTabKey: 1 })}
                    />
                  )}
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
                  {/* <label style={{ marginTop: '11px' }}>
                    Выберите категорию для вашего товара Prom.ua{' '}
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <Cascader
                    defaultValue={selectedCategoriesProm}
                    value={selectedCategoriesProm}
                    options={categoriesProm}
                    onChange={(val) => this.onChangeCascader(val, 'categoryPromX')}
                    changeOnSelect
                    placeholder="Please select"
                    popupPlacement="bottomRight"
                  /> */}
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span>
                    <span style={{ color: 'red' }}>*</span> - поле обязательно к
                    заполнению
                  </span>
                  {id ? (
                    <MyButton
                      style={{ width: 200 }}
                      title="Сохранить"
                      myvariant="green"
                      onClick={this.updateProduct}
                    />
                  ) : (
                    <MyButton
                      style={{ width: 200 }}
                      title=" Далее"
                      myvariant="green"
                      onClick={() => this.setState({ activeTabKey: 2 })}
                    />
                  )}
                </div>
              </form>
            </TabPanel>
            {/* <TabPanel value={activeTabKey} index={2}>
              <form className={styles.selectPrice}>
                {this.props.user.role === 'PARTNER' ? (
                  <div>
                    <p className={styles.priceTitle}>
                      Цена товара от поставщика:{' '}
                      <b>{contractorPriceForPartner} ₴</b>
                    </p>
                    <p className={styles.priceTitle}>
                      Рекомендованая розничная цена:{' '}
                      <b>{recommendedPrice} ₴</b>
                    </p>
                    <TextField
                      type="number"
                      label="Укажите свой процент наценки для товара (%)"
                      name="partnerPercent"
                      value={partnerPercent}
                      onChange={this.handleChangeInput}
                      style={{ width: 350 }}
                      // helperText={errors.password}
                      margin="normal"
                    />
                    <p className={styles.priceTitle}>
                      Цена товара после наценки:{' '}
                      <b>
                        {parseInt(
                          (+contractorPriceForPartner *
                            (100 + +partnerPercent)) /
                          100
                        )}{' '}
                        ₴
                      </b>
                    </p>
                  </div>
                ) : (
                    <div className={styles.prices}>
                      <TextField
                        label="Укажите цену для вашего товара (грн)"
                        name="price"
                        type="number"
                        required
                        fullWidth
                        value={price}
                        onChange={this.handleChangeInput}
                        // helperText={errors.password}
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
                        // helperText={errors.password}
                        margin="normal"
                      />
                    </div>
                  )}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {this.props.user.role === 'CONTRACTOR' && (
                    <span>
                      <span style={{ color: 'red' }}>*</span> - поле обязательно
                      к заполнению
                    </span>
                  )}
                  {id ? (
                    <MyButton
                      style={{ width: 200 }}
                      title="Сохранить"
                      myvariant="green"
                      onClick={this.updateProduct}
                    />
                  ) : (
                      <MyButton
                        style={{ width: 200 }}
                        title="Далее"
                        myvariant="green"
                        onClick={() => this.setState({ activeTabKey: 3 })}
                      />
                    )}
                </div>
              </form>
            </TabPanel> */}
            <TabPanel value={activeTabKey} index={2}>
              <form className={styles.selectPrice}>
                {this.props.user.role === 'PARTNER' &&
                fixedRecommendedPrice === false ? (
                  <div>
                    <p className={styles.priceTitle}>
                      Цена товара от поставщика:{' '}
                      <b>{contractorProduct.price} ₴</b>
                    </p>
                    <p className={styles.priceTitle}>
                      Рекомендованая розничная цена:{' '}
                      <b>{contractorProduct.recommendedPrice} ₴</b>
                    </p>
                    <TextField
                      type="number"
                      label="Укажите свой процент наценки для товара (%)"
                      name="partnerPercent"
                      value={partnerPercent}
                      onChange={this.handleChangeInput}
                      style={{ width: 350 }}
                      // helperText={errors.password}
                      margin="normal"
                    />
                    <p className={styles.priceTitle}>
                      Цена товара после наценки:{' '}
                      <b>
                        {parseFloat(
                          (+contractorProduct.price * (100 + +partnerPercent)) /
                            100
                        ).toFixed(2)}{' '}
                        ₴
                      </b>
                    </p>
                  </div>
                ) : this.props.user.role === 'PARTNER' &&
                  fixedRecommendedPrice === true ? (
                  <div>
                    <p className={styles.priceTitle}>
                      Цена товара от поставщика:{' '}
                      <b>{contractorPriceForPartner} ₴</b>
                    </p>
                    <p className={styles.priceTitle}>
                      Цена реализации: <b>{sellingPrice} ₴</b>
                    </p>
                    <p className={styles.priceTitle}>
                      Товар даного поставщика может реализововаться только по
                      рекомендуемой розничной цене поставщика, без
                      дополнительных наценок.
                    </p>
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
                      // helperText={errors.password}
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
                      // helperText={errors.password}
                      margin="normal"
                    />
                  </div>
                )}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  {this.props.user.role === 'CONTRACTOR' && (
                    <span>
                      <span style={{ color: 'red' }}>*</span> - поле обязательно
                      к заполнению
                    </span>
                  )}
                  {id ? (
                    <MyButton
                      style={{ width: 200 }}
                      title="Сохранить"
                      myvariant="green"
                      onClick={this.updateProduct}
                    />
                  ) : (
                    <MyButton
                      style={{ width: 200 }}
                      title="Далее"
                      myvariant="green"
                      onClick={() => this.setState({ activeTabKey: 3 })}
                    />
                  )}
                </div>
              </form>
            </TabPanel>
            <TabPanel value={activeTabKey} index={3}>
              <div className={styles.addPicture}>
                {coverImages.length > 0 || imageUrls.length > 0 ? (
                  <ProductPictureGallery
                    coverImageList={coverImages}
                    urlImageList={imageUrls}
                    deleteImage={this.handleUpdateImages}
                    changeAvatarUrl={this.changeAvatarUrl}
                    key={id}
                  />
                ) : null}

                <div className={styles.upload}>
                  <div>
                    <Dropzone
                      onDrop={this.onDrop}
                      accept=".png, .svg, .jpg, .jpeg"
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'dropzone' })}>
                          <input {...getInputProps()} />
                          <MyButton
                            title="Добавить картинку"
                            myvariant="green"
                            startIcon={<CloudUploadIcon />}
                          />
                        </div>
                      )}
                    </Dropzone>
                  </div>

                  <div className={styles.addUrl}>
                    <TextField
                      label="Ссылка на картинку"
                      name="imageUrl"
                      type="text"
                      fullWidth
                      value={imageUrl}
                      onChange={this.handleChangeInput}
                      // helperText={errors.password}
                      // margin="normal"
                    />

                    <MyButton
                      style={{ width: 200, marginLeft: 20 }}
                      title="Добавить URL"
                      myvariant="green"
                      onClick={this.handleAddImageUrl}
                    />
                  </div>
                </div>

                <div className={styles.uploadInfo}>
                  {uploadImage ? (
                    <span>Изображение загружено</span>
                  ) : (
                    <span>
                      Фотография должна быть не меньше 150х150 пикселей, и не
                      болше чем 1000х1000 пикселей.
                    </span>
                  )}

                  {id ? (
                    <MyButton
                      style={{ width: 200 }}
                      title="Сохранить"
                      myvariant="green"
                      onClick={this.updateProduct}
                    />
                  ) : (
                    <MyButton
                      style={{ width: 200 }}
                      title="Далее"
                      myvariant="green"
                      onClick={() => this.setState({ activeTabKey: 4 })}
                    />
                  )}
                </div>
              </div>
            </TabPanel>
            <TabPanel value={activeTabKey} index={4}>
              {/* <ul className={s.Group}> */}
              <Options
                // Передаём списки заполненных параметров, которые хранятся в карточке товара
                selectedOptionsArr={options}
                filledOptionByTextAreas={optionByTextAreas}
                manualOptions={manualOptions}
                // Передаём массивы возможных параметров исходя из категории товара
                optionsArr={optionsArr}
                optionByTextAreasArr={optionByTextAreasArr}
                // CALLBACKS
                onChangeOptionsCascader={this.onChangeOptionsCascader}
                changeManualOptions={this.changeManualOptions}
                addManualOptions={this.addManualOptions}
                removeManualOptions={this.removeManualOptions}
              />
              {/* </ul> */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>
                  <span style={{ color: 'red' }}>*</span> - поле обязательно к
                  заполнению
                </span>
                {id ? (
                  <MyButton
                    style={{ width: 200 }}
                    title="Сохранить"
                    myvariant="green"
                    onClick={this.updateProduct}
                  />
                ) : (
                  <MyButton
                    style={{ width: 200 }}
                    title="Сохранить"
                    myvariant="green"
                    onClick={this.handleCreateProduct}
                  />
                )}
              </div>
            </TabPanel>
          </div>
        </Modal>
      </div>
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
)(NewProduct);
