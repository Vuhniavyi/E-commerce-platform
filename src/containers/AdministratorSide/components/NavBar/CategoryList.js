import React from 'react';
import 'antd/dist/antd.css';

import { Menu } from 'antd';

import icon_1 from '../../../../img/2/1.svg';
import icon_2 from '../../../../img/2/2.svg';
import icon_3 from '../../../../img/2/3.svg';
import icon_4 from '../../../../img/2/4.svg';
import icon_5 from '../../../../img/2/5.svg';
import icon_6 from '../../../../img/2/6.svg';
import icon_7 from '../../../../img/2/7.svg';
import icon_8 from '../../../../img/2/8.svg';
import icon_9 from '../../../../img/2/9.svg';
import icon_10 from '../../../../img/2/10.svg';
import icon_11 from '../../../../img/2/11.svg';
import icon_12 from '../../../../img/2/12.svg';
import icon_13 from '../../../../img/2/13.svg';
import icon_14 from '../../../../img/2/14.svg';
import icon_15 from '../../../../img/2/15.svg';
import icon_16 from '../../../../img/2/16.svg';
import icon_17 from '../../../../img/2/17.svg';
import icon_18 from '../../../../img/2/18.svg';
import icon_19 from '../../../../img/2/19.svg';

import styles from "./CategoryList.module.css";

const SubMenu = Menu.SubMenu;

const icons = {
  '1': icon_1,
  '2': icon_2,
  '3': icon_12,
  '4': icon_4,
  '5': icon_5,
  '6': icon_6,
  '7': icon_7,
  '8': icon_8,
  '9': icon_9,
  '10': icon_16,
  '11': icon_11,
  '12': icon_3,
  '13': icon_13,
  '14': icon_14,
  '15': icon_15,
  '16': icon_10,
  '17': icon_17,
  '18': icon_18,
  '19': icon_19
};

const renderCategories = categories => {
  return categories.map((category, index) =>
    category.subcategories.length > 0 ? (
      <SubMenu key={category.id} title={<span> {category.name}</span>}>
        {category.subcategories.length > 0 ? (
          renderCategories(category.subcategories)
        ) : (
            <Menu.Item key={category.id}>{category.name}</Menu.Item>
          )}
      </SubMenu>
    ) : (
        <Menu.Item key={category.id}>
          <span className={styles.text}>{category.name}</span>
        </Menu.Item>
      )
  );
};

const CategoryList = ({ categories, onSelectCategory, title }) => {
  return (
    <Menu onClick={onSelectCategory} id="subCategoryTitle">
      <SubMenu popupClassName="categorylistMenu" title={<span>{title}</span>}>
        {categories.map((category, index) => (
          <SubMenu
            key={category.id}
            title={
              <span>
                <img
                  className={styles.img}
                  src={icons[index + 1]}
                  alt={category.name}
                />
                {category.name}
              </span>
            }
          >
            {category.subcategories.length > 0 ? (
              renderCategories(category.subcategories)
            ) : (
                <Menu.Item key={category.id}>{category.name}</Menu.Item>
              )}
          </SubMenu>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default CategoryList;
