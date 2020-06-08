import React, {Component} from 'react'
import styles from './Instruction.module.css'

import img1 from "../../../img/allprodouct1.png";
import img2 from "../../../img/allprodouct2.png";
import img3 from "../../../img/allprodouct3.png";

class InstructionsForSellers extends Component {
    state = {
        categories: []
    };

    render() {

        return (
            <div className={styles.main}>
                <h3 className={styles.title}>Инструкция по добавлению товаров</h3>

                <div className={styles.instructionBlock}>
                    <p>Зайдите во вкладку «Все товары». Здесь находится полный каталог товаров поставщиков. Для вашего удобства вы можете фильтровать их по разным критериям (артикул, наличие, бренд, название, категория товара, розничная цена, топ-товары/товары со скидкой), а ещё выбрать интересующую вас категорию с помощью панели слева.</p>

                    <img src={img1} alt="img1"/>

                    <p>После того как вы определились с категорией или определенными товарами, выделите их с помощью галочки (поштучно или массово).</p>

                    <p>Как только выделите товары, у вас активируется кнопка «Добавить в Мои товары». Нажмите её и все выделенные карточки попадут в ваш каталог.</p>

                    <p>Здесь также можете воспользоваться фильтрами, а также отредактировать карточку товара под свой интернет-магазин.</p>

                    <img src={img2} alt="img1"/>

                    <p>Полную информацию о товаре (фотографии, описание, опции) возможно увидеть, нажав на товар.</p>

                    <img src={img3} alt="img1"/>
                </div>
            </div>
        );
    }
}

export default InstructionsForSellers;