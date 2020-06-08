import React from 'react';
import PropTypes from 'prop-types';
// import { Cascader, Button } from 'antd';
import s from './Options.module.css';
import {
  InputLabel,
  TextField,
  Select,
  IconButton,
  FormControl,
  MenuItem
} from '@material-ui/core';
import MyButton from '../Buttons/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const filter = (inputValue, path) =>
  path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );

const Options = ({
  selectedOptionsArr = [],
  filledOptionByTextAreas = [],
  manualOptions = [],
  optionsArr = [],
  optionByTextAreasArr = [],
  onChangeOptionsCascader = fn => fn,
  addManualOptions = fn => fn,
  changeManualOptions = fn => fn,
  removeManualOptions = fn => fn
}) => {

  return (
    <>
      {optionsArr.length ? ( // проверяем длинну массива и отрисовываем разметку, если есть
        <fieldset>
          <legend>Селективные параметры</legend>
          <ul className={s.Group}>
            {optionsArr.map(el => (
              <li className={s.GroupItem} key={el.id}>
                {/* <p className={s.Text}>{el.group}</p> */}
                <FormControl fullWidth>
                  <InputLabel htmlFor="select-multiple">{el.group}</InputLabel>
                  <Select
                    value={
                      selectedOptionsArr.length &&
                        selectedOptionsArr.find(item => item.group === el.id)
                        ? [
                          selectedOptionsArr.find(
                            item => item.group === el.id
                          ).value
                        ]
                        : []
                    }
                    placeholder="Выбрать параметр"
                    // value={personName}
                    onChange={({ target: { value } }) =>
                      onChangeOptionsCascader(value, el.id)
                    }
                  // MenuProps={MenuProps}
                  >
                    {el.values.map(({ id, value }) => (
                      <MenuItem key={id} value={id}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* <Cascader
                  className={s.Parameters}
                  defaultValue={
                    selectedOptionsArr.length &&
                    selectedOptionsArr.find(item => item.group === el.id)
                      ? [
                          selectedOptionsArr.find(item => item.group === el.id)
                            .value
                        ]
                      : []
                  }
                  placeholder="Please select"
                  expandTrigger="hover"
                  options={el.values.map(item => ({
                    // Переименовывааем ключи свойств
                    label: item.value,
                    value: item.id,
                    isLeaf: !item.isHaveChildren
                  }))}
                  onChange={(value, selectedOptions) =>
                    onChangeOptionsCascader(value, selectedOptions, el.id)
                  }
                  showSearch={{ filter }}
                /> */}
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      {optionByTextAreasArr.length ? ( // проверяем длинну массива и отрисовываем разметку, если есть
        <fieldset>
          <legend>Параметры с заполнением значения вручную</legend>
          <ul className={s.Group}>
            {optionByTextAreasArr.map(el => (
              <li className={s.GroupItem} key={el.id}>
                {/* <p className={s.Text}>{el.group}</p> */}
                <TextField
                  type="text"
                  className={s.Text}
                  fullWidth
                  value={
                    (filledOptionByTextAreas && // проверяем если ли вообще массив
                      filledOptionByTextAreas.find(
                        item => +item.group === el.id
                      ) && // проверка на наличие искомого элемента
                      filledOptionByTextAreas.find(
                        item => +item.group === el.id
                      ).value) || // берём значение в найденном элементе
                    ''
                  }
                  label={el.group}
                  inputProps={{
                    'data-fieldset': 'semimanual',
                    'data-type': 'value',
                    'data-id': el.id
                  }}
                  placeholder="Введите значение параметра"
                  onChange={changeManualOptions}
                />
                {/* <input
                  type="text"
                  className={s.Text}
                  value={
                    (filledOptionByTextAreas && // проверяем если ли вообще массив
                    filledOptionByTextAreas.find(
                      item => +item.group === el.id
                    ) && // проверка на наличие искомого элемента
                      filledOptionByTextAreas.find(
                        item => +item.group === el.id
                      ).value) || // берём значение в найденном элементе
                    ''
                  } // Подставляем пустую строку если не удалось найти значение
                  placeholder="Введите значение параметра"
                  data-fieldset="semimanual"
                  data-type="value"
                  data-id={el.id}
                  onChange={changeManualOptions}
                /> */}
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}

      {manualOptions.length ? ( // проверяем длинну массива и отрисовываем разметку, если есть
        <fieldset>
          <legend>
            Дополнительные параметры с заполнением вручную{' '}
            <span style={{ color: 'red' }}>*</span>
          </legend>
          <ul className={s.addionGroup}>
            {manualOptions.map((el, i) => (
              <li className={s.additionParamsGroup} key={i}>
                <TextField
                  type="text"
                  className={s.Text}
                  value={el.group || ''}
                  label="Введите название параметра"
                  inputProps={{
                    'data-fieldset': 'manual',
                    'data-type': 'group',
                    'data-id': i
                  }}
                  onChange={changeManualOptions}
                />
                <TextField
                  type="text"
                  className={s.Text}
                  value={el.value || ''}
                  label="Введите значение параметра"
                  inputProps={{
                    'data-fieldset': 'manual',
                    'data-type': 'value',
                    'data-id': i
                  }}
                  data-fieldset="manual"
                  data-type="value"
                  data-id={i}
                  onChange={changeManualOptions}
                />
                <IconButton
                  aria-label="delete"
                  onClick={() => removeManualOptions(i)}
                >
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </fieldset>
      ) : null}
      <MyButton
        style={{ width: 300, marginTop: 20 }}
        title="Добавить дополнительный параметр"
        myvariant="green"
        onClick={addManualOptions}
      />
    </>
  );
};

Options.propTypes = {
  // Массивы заполненных параметров, которые хранятся в карточке товара
  selectedOptionsArr: PropTypes.array.isRequired,
  filledOptionByTextAreas: PropTypes.array.isRequired,
  manualOptions: PropTypes.array.isRequired,
  // Массивы возможных параметров исходя из категории товара
  optionsArr: PropTypes.array.isRequired,
  optionByTextAreasArr: PropTypes.array.isRequired,
  // CALLBACKS
  onChangeOptionsCascader: PropTypes.func.isRequired,
  changeManualOptions: PropTypes.func.isRequired,
  addManualOptions: PropTypes.func.isRequired,
  removeManualOptions: PropTypes.func.isRequired
};

export default Options;
