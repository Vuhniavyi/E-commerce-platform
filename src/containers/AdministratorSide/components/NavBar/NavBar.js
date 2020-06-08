import React, { Component, Fragment } from 'react';
import { Tooltip, Menu, Icon, Dropdown } from 'antd';
import { Button as MaterialButton } from '@material-ui/core';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';
import 'antd/dist/antd.css';
import UserTopPanel from './UserTopPanel';
import CategoryList from './CategoryList';
import { withRouter } from 'react-router-dom';
import cabinet from '../../../../img/profileSvgNotActive.svg';
// import cabinetActive from '../../../../img/navIcons/user2.svg';
// import cabinet from '../../../../img/profileSvg.svg';
import avatar from '../../../../img/pictures/userImage.png';
import cabinetActive from '../../../../img/profileSvg.svg';

import home from '../../../../img/navIcons/home.svg';
import homeActive from '../../../../img/navIcons/home-active.svg';

import cart from '../../../../img/pictures/shopping.svg';
import cartActive from '../../../../img/pictures/shoppingActive.svg';

import list from '../../../../img/navIcons/list.svg';
import listActive from '../../../../img/navIcons/list2.svg';

import chart from '../../../../img/pictures/finance.svg';
import chartActive from '../../../../img/pictures/financeActive.svg';
// import chart from '../../../../img/navIcons/pie-chart.svg';
// import chartActive from '../../../../img/navIcons/pie-chart2.svg';
import shopping from '../../../../img/pictures/allproducts.svg';
import shoppingActive from '../../../../img/pictures/allproductsActive.svg';
// import shopping from '../../../../img/navIcons/shopping-bag.svg';
// import shoppingActive from '../../../../img/navIcons/shopping-bag2.svg';
import database from '../../../../img/navIcons/database.svg';
import databaseActive from '../../../../img/navIcons/database2.svg';
import services from '../../../../img/pictures/servicesIcon.svg';
import servicesActive from '../../../../img/pictures/servicesIconActive.svg';
// import services from '../../../../img/navIcons/add-button-inside-black-circle.svg';
// import servicesActive from '../../../../img/navIcons/add-button-inside-black-circle2.svg';
import study from '../../../../img/pictures/commerce.svg';
import studyActive from '../../../../img/pictures/commerceActive.svg';
// import study from '../../../../img/navIcons/teacher-reading.svg';
// import studyActive from '../../../../img/navIcons/teacher-reading2.svg';
import сontact from '../../../../img/navIcons/contact.svg';
import сontactActive from '../../../../img/navIcons/contact-active.svg';
import desctop from '../../../../img/pictures/desctop.svg';
import desctopActive from '../../../../img/pictures/desctopActive.svg';
import { selectedCategory } from '../../../../actions/userActions';
import { getCategories } from '../../../../store/selectors/categoriesSelector';

// import { makeStyles } from '@material-ui/core/styles';

const { SubMenu } = Menu;

const contractorMenu = [
  {
    title: 'Главная',
    icon: desctop,
    activeIcon: desctopActive,
    href: 'main',
    developing: true
  },
  {
    title: 'Кабинет',
    icon: cabinet,
    activeIcon: cabinetActive,
    href: 'cabinet',
    developing: true,
    children: [
      // {
      //   href: '/admin/cabinet',
      //   title: 'Кабинет пользователя'
      // },
      {
        href: '/admin/profile_settings',
        title: 'Настройки профиля'
      },
      {
        href: '/admin/company_settings',
        title: 'Настройки компании'
      },
      {
        href: '/admin/employees',
        title: 'Сотрудники'
      }
    ]
  },
  {
    title: 'Мои товары',
    icon: shopping,
    activeIcon: shoppingActive,
    href: 'products',
    developing: true,
    children: [
      {
        title: 'Товары',
        href: '/admin/products'
        // ПОМЕНЯТЬ HREF на products
      },
      {
        title: 'Категории'
      }
    ]
  },
  {
    title: 'Заказы',
    icon: list,
    activeIcon: listActive,
    href: 'contractor_orders',
    developing: true
  },
  {
    title: 'Финансы',
    icon: chart,
    activeIcon: chartActive,
    href: 'finance',
    developing: true
  },

  // {
  //   title: 'Сервисы',
  //   icon: services,
  //   activeIcon: servicesActive,
  //   href: 'additional_services',
  //   developing: true
  // },
  {
    title: 'Школа e-commerce',
    icon: study,
    activeIcon: studyActive,
    href: 'learning',
    developing: true
  },
  // {
  //   title: 'Лента новостей',
  //   icon: database,
  //   activeIcon: databaseActive,
  //   href: 'knowledge_base',
  //   developing: true
  // },
  // {
  //   title: 'Контактная форма',
  //   icon: сontact,
  //   activeIcon: сontactActive,
  //   href: 'contacts-form',
  //   developing: true
  // }
];

const partnerMenu = [
  {
    title: 'Главная',
    icon: desctop,
    activeIcon: desctopActive,
    href: 'main',
    developing: true
  },
  {
    title: 'Кабинет',
    icon: cabinet,
    activeIcon: cabinetActive,
    href: 'cabinet',
    developing: true,
    children: [
      {
        href: '/admin/profile_settings',
        title: 'Настройки профиля'
      },
      {
        href: '/admin/company_settings',
        title: 'Настройки компании'
      },
      {
        href: '/admin/employees',
        title: 'Сотрудники'
      }
    ]
  },
  {
    title: 'Все товары',
    icon: cart,
    activeIcon: cartActive,
    href: 'categories',
    developing: true,
    children: [
      {
        title: 'Каталог',
        href: 'categories'
      },
      {
        title: 'Категории'
      }
    ]
  },
  {
    title: 'Мои товары',
    icon: shopping,
    activeIcon: shoppingActive,
    href: 'my_products',
    developing: true,
    children: [
      {
        title: 'Товары',
        href: 'my_products'
      },
      {
        title: 'Категории'
      }
    ]
  },
  {
    title: 'Мой магазин',
    icon: home,
    activeIcon: homeActive,
    href: 'store',
    developing: false
  },
  {
    title: 'Мои заказы',
    icon: list,
    activeIcon: listActive,
    href: 'orders',
    developing: true
  },
  {
    title: 'Финансы',
    icon: chart,
    activeIcon: chartActive,
    href: 'finance',
    developing: true
  },

  // {
  //   title: 'Сервисы',
  //   icon: services,
  //   activeIcon: servicesActive,
  //   href: 'additional_services',
  //   developing: true
  // },
  {
    title: 'Школа e-commerce',
    icon: study,
    activeIcon: studyActive,
    href: 'learning',
    developing: true
  },
  // {
  //   title: 'Лента новостей',
  //   icon: database,
  //   activeIcon: databaseActive,
  //   href: 'knowledge_base',
  //   developing: true
  // },
  // {
  //   title: 'Контактная форма',
  //   icon: сontact,
  //   activeIcon: сontactActive,
  //   href: 'contacts-form',
  //   developing: true
  // }
];

class NavBar extends Component {
  state = {
    collapsed: false,
    selectedItem: ''
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  toogleCurrentItem = val => {
    this.setState({ selectedItem: val });
  };
  handleChangeCategory = category => {
    this.props.selectedCategory({ selectedCategory: category.key });
  };

  changePage = title => {
    this.setState({ selectedItem: title });
    this.props.selectedCategory({ selectedCategory: '' });
  };

  goto = item => {
    const { history } = this.props;
    history.push(`/admin/${item}`);
  };

  render() {
    const navigation =
      this.props.user.role === 'CONTRACTOR' ? contractorMenu : partnerMenu;
    const { selectedItem } = this.state;
    const {
      asideMenu: { asideMenu },
      user,
      categories
    } = this.props;

    // let indx;
    // partnerMenu.forEach((item, index) => {
    //   if (RegExp(item.href).test(this.props.location.pathname)) {
    //     indx = index;
    //   }
    // });
    return (
      // <div className={styles.navigationBar}>
      <Menu
        mode="inline"
        // defaultSelectedKeys={'1'}
        // selectable={true}
        // selectedKeys={[selectedItem]}
        theme="dark"
        inlineCollapsed={asideMenu}
        style={{ width: 165 }}
      >
        <UserTopPanel goto={this.goto} user={user} asideMenu={asideMenu} />

        {navigation.map((item, index) => {
          if (item.children) {
            return (
              <SubMenu
                key={index}
                title={
                  <Fragment>
                    <Icon
                      component={() => (
                        <Fragment>
                          <img
                            src={item.icon}
                            alt=""
                            className="default-icon"
                          />
                          <img
                            src={item.activeIcon}
                            alt=""
                            className="active-icon"
                          />
                        </Fragment>
                      )}
                    />

                    <span
                      style={{ color: '#fff', fontSize: '11px' }}
                    // onClick={() => this.goto(item.href)}
                    >
                      {item.title}
                    </span>
                  </Fragment>
                }
              >
                {item.children.map((subItem, index) =>
                  subItem.title !== 'Категории' ? (
                    <Menu.Item key={subItem.title}>
                      <Link
                        to={subItem.href}
                        style={{ padding: '0 30px 0 30px', fontSize: '11px' }}
                      >
                        {subItem.title}
                      </Link>
                    </Menu.Item>
                  ) : (
                      <CategoryList
                        key={index}
                        title={subItem.title}
                        style={{ color: '#fff', fontSize: '11px' }}
                        categories={categories}
                        onSelectCategory={this.handleChangeCategory}
                      />
                    )
                )}
              </SubMenu>
            );
          } else if (item.developing) {
            return (
              <Menu.Item key={index} onClick={() => this.goto(item.href)}>
                <Icon
                  // onClick={() => this.goto(item.href)}
                  component={() => (
                    <Fragment>
                      <img src={item.icon} alt="" className="default-icon" />
                      <img
                        src={item.activeIcon}
                        alt=""
                        className="active-icon"
                      />
                    </Fragment>
                  )}
                />
                <span
                  style={{ color: '#fff', fontSize: '11px' }}
                // onClick={() => this.goto(item.href)}
                >
                  {item.title}
                </span>
              </Menu.Item>
            );
          }
        })}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  asideMenu: state.asideMenu,
  categories: getCategories(state)
});

const mapDispatchToProps = dispatch => ({
  selectedCategory: category => dispatch(selectedCategory(category))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NavBar)
);
