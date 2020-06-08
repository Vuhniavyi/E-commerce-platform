import React, { Fragment } from 'react';
import { FormControl, Select, InputLabel, TextField } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import styles from './filters.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 140
  },
  select: {
    width: 137
  },
  label: {
    fontSize: 10
  }
}));

const FIlters = props => {
  const {
    name,
    vendor_code,
    user_id,
    min_price,
    max_price,
    brand,
    in_stock,
    contractor_product
  } = props.filters;

  const { changeFilters } = props;
  const classes = useStyles();
  return (
    <Fragment>
      <h2 className={styles.title}>Фильтры</h2>
      <div className={classes.container}>
        <TextField
          InputLabelProps={{
            label: classes.label
          }}
          id="standard-name"
          label="Название товара"
          className={classes.textField}
          name="name"
          value={name}
          onChange={changeFilters}
          // margin="normal"
        />
        <TextField
          InputLabelProps={{
            label: classes.label
          }}
          id="standard-name"
          label="ID поставщика"
          className={classes.textField}
          name={/my_products/g.test(window.location.pathname) ? "contractor_product" : "user_id"}
          value={/my_products/g.test(window.location.pathname) ? contractor_product : user_id}
          onChange={changeFilters}
          // margin="normal"
        />
        <TextField
          id="standard-name"
          label="Артикул"
          name="vendor_code"
          className={classes.textField}
          value={vendor_code}
          onChange={changeFilters}
          // margin="normal"
        />
        <TextField
          id="standard-name"
          label="Бренд"
          className={classes.textField}
          value={brand}
          name="brand"
          onChange={changeFilters}
          // margin="normal"
        />

        <FormControl>
          <InputLabel htmlFor="in_stock-simple">Кол-во</InputLabel>
          <Select
            className={classes.select}
            value={in_stock}
            onChange={({ target }) => changeFilters({ target })}
            inputProps={{
              name: 'in_stock',
              id: 'in_stock-simple'
            }}
          >
            <MenuItem value="all">Все</MenuItem>
            <MenuItem value={true}>В наличии</MenuItem>
            <MenuItem value={false}>Нет в наличии</MenuItem>
          </Select>
        </FormControl>
        <TextField
          // id="standard-number"
          label="Цена от"
          name="min_price"
          value={min_price}
          onChange={changeFilters}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          // margin="normal"
        />
        <TextField
          // id="standard-number"
          label="До"
          name="max_price"
          value={max_price}
          onChange={changeFilters}
          type="number"
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          // margin="normal"
        />
      </div>
    </Fragment>
  );
};

export default FIlters;
