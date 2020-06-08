import React from 'react'
import { Menu } from 'antd';
import 'antd/dist/antd.css';
// import styles from './ContractorProducts.module.css'

const SubMenu = Menu.SubMenu;

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