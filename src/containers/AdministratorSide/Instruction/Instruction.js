import React, { useMemo } from 'react'
import { connect } from 'react-redux';
import { Tree, Button } from 'antd';
import img4 from "../../../img/img4.png";
import img5 from "../../../img/img5.png";
import img6 from "../../../img/img6.png";
import img7 from "../../../img/img7.png";
import img8 from "../../../img/img8.png";

import img9 from "../../../img/instru/1.png";
import img10 from "../../../img/instru/2.jpg";
import img11 from "../../../img/instru/3.png";
import img12 from "../../../img/instru/4.png";
import img13 from "../../../img/instru/5.png";

import { getCategories } from '../../../store/selectors/categoriesSelector';
import file from '../../../img/instru/template.xlsx';
import styles from './Instruction.module.css'

const { TreeNode } = Tree;


const Instruction = ({ categories }) => {
  const renderCategories = categories =>
    categories.map(item => (
      <TreeNode title={`${item.name} - ${item.id}`} key={item.id}>
        {item.subcategories.length > 0 ? renderCategories(item.subcategories) : ''}
      </TreeNode>
    ));
  const memoizedRenderCategories = useMemo(() => {
    renderCategories(categories)
  }, [categories])

  return (
    <div className={styles.main}>
      <h3 className={styles.title}>Инструкция по добавлению товаров</h3>

      <div className={styles.instructionBlock}>
        <h4>Инструкция по добавлению товара вручную </h4>

        <p>Добавление 1-го товара происходит через кнопку "Добавить товар". Открывается окно, в котором доступны следующие вкладки:</p>

        <ul className={styles.modalTabsList}>
          <li>Основая информация</li>
          <li>Категории</li>
          <li>Цена</li>
          <li>Изображение</li>
          <li>Параметры</li>
        </ul>

        <p className={styles.paragraph}>После того, когда  обязательные поля заполнены, необходимо сохранить карточку товара. Она появится в фильтре с товарами. Напротив каждого товара есть кнопка "Редактировать", при клике на которую открывается карточка товара с возможностью отредактировать информацию.</p>

        <ul className={styles.modalScreensList}>
          <li><img src={img4} alt="Основая информация" /></li>
          <li><img src={img5} alt="Категории" /></li>
          <li><img src={img6} alt="Цена" /></li>
          <li><img src={img7} alt="Изображение" /></li>
          <li><img src={img8} alt="Параметры" /></li>
        </ul>

        <h4 className={styles.title}>Инструкция по импорту товаров через Excel файл</h4>

        <iframe width="977" height="599" src="https://www.youtube.com/embed/wpS_Cn29ChA" frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          className={styles.shadow} title="Import instruction" allowFullScreen>
        </iframe>

        <Button type="primary" className={styles.excelButton} ghost>
          <a href={file} download>
            <span className={styles.excelButton_text}>Скачать пример файла</span>
          </a>
        </Button>

        <p>Файл содержит следующие поля с данными о товаре которые необходимо заполнить.</p>

        <ul className={styles.dataList}>
          <li>category_id</li>
          <li>id</li>
          <li>brand</li>
          <li>name</li>
          <li>variety_type</li>
          <li>vendor_code</li>
          <li>count</li>
          <li>price</li>
          <li>recommended_price</li>
          <li>description</li>
          <li>extra_description</li>
          <li>age_group</li>
          <li>material</li>
        </ul>

        <img src={img9} alt="Пример заполнения таблицы" className={styles.shadow} style={{ margin: '20px 0 20px 30px' }} />


        <p>В поле <strong>category_id</strong> необходимо ввести <strong>id</strong> категории товара которой он соответствует. Id необходимой категории можно найти в блоке <a href="#tree">категорий</a>:</p>

        <img src={img10} alt="Скриншок категорий" className={styles.shadow} />

        <p>В поле <strong>id</strong> необходимо указать id товара который уже есть в системе topmarket в этом случае данные по товару обновятся или оставить поле <strong>id</strong> незаполненным. Если айди не указано - система создаст этот товар как новый.</p>

        <ul className={styles.fieldDescriptionList}>
          <li>В поле <strong>brand</strong> указывается название бренда.</li>
          <li>Поле <strong>name</strong> должно содержать имя продукта например “iPhone Xs Max”.</li>
          <li>Поле <strong>variety_type</strong> должно содержать разновидность продукта.</li>
          <li>Поле <strong>vendor_code</strong> должно содержать артикул продукта.</li>
          <li>Поле <strong>count</strong> должно содержать количество товара, его остаток на складе.</li>
          <li>Поле <strong>price</strong> должно содержать цену товара.</li>
          <li>Поле <strong>recommended_price</strong> должно содержать рекомендуемую цену для продажи.</li>
          <li>Поле <strong>description</strong> должно содержать полное описание товара.</li>
          <li>Поле <strong>extra_description</strong> может содержать дополнительное короткое описание товара, является не обязательным полем.</li>
          <li>Поле <strong>age_group</strong> может содержать возрастную категорию для этого товара, является не обязательным полем .</li>
          <li>Поле <strong>material</strong> может содержать название материала товара, является не обязательным полем.</li>
        </ul>

        <p>После внесения товаров в Excel файл, выполните его загрузку.</p>

        <img src={img13} alt="Где находится кнопка 'Загрузить Excel файл'" />

        {/*-----------------------*/}
        <h4 className={styles.title} style={{ margin: '25px 0 30px 0' }}>Инструкция по импорту товаров c <span style={{ color: '#019D45' }}>Rozetka</span></h4>

        <iframe width="929" height="580" src="https://www.youtube.com/embed/8ew65FjJED0" frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          title="Import from Rozetka instruction" allowFullScreen>
        </iframe>

        <p>Для того чтобы импортировать товары с Rozetka marketplace необходимо перейти в раздел “Товары”, который находится в <a href="https://seller.rozetka.com.ua" target='_blank' rel="noopener noreferrer">личном кабинете Rozetka </a> Для экспорта товаров в Excel нажмите кнопку “Загрузить файл”</p>

        <img src={img11} alt="img7" />

        <p>
          Сохраните файл на вашем ПК. <br />
          Откройте файл в Excel и сохраните его с другим именем. (Файл -> Сохранить как...)<br />
          В разделе платформы “Мои товары” импортируйте сохраненный файл
					</p>

        <img src={img12} alt="img7" />

        <h4 className={styles.title} style={{ margin: '30px 0 0 0' }}>Категории</h4>

        <div id='tree'>
          <Tree
            showLine
            multiple
            defaultExpandedKeys={['0-0-0']}
          >
            {memoizedRenderCategories(categories)}
          </Tree>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = state => ({
  categories: getCategories(state),
})

export default connect(mapDispatchToProps)(Instruction);
