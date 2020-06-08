import React, {Component} from 'react'
import 'antd/dist/antd.css';
import styles from '../Categories/Categories.module.css'


import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const renderCategories = (categories) => {
    return (
        categories.map(category => (
            <SubMenu key={category.id} title={<span>{category.name}</span>}>
                {category.subcategories.length > 0 ? renderCategories(category.subcategories)
                    :
                    <Menu.Item key={category.id}>
                        {category.name}
                    </Menu.Item>}
            </SubMenu>
        ))
    )
};


const CategoryList = ({categories, onSelectCategory}) => {
    return (
        <Menu onClick={onSelectCategory}>
            {renderCategories(categories)}
        </Menu>
    );
};

export default CategoryList;





