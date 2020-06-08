import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import defaultImage from '../../../../img/pictures/no-productimage.png';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Icons from '../Icons/Icons';
import EditIcon from '@material-ui/icons/Edit';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import FilterPopover from '../FilterPopup/Popover';
import Filters from '../Filters/FIlters';
import Loaders from '../Loaders/Loaders';
import MyCheckbox from '../Checkboxes/Checkboxes';
import styles from './table.module.css';
import arrowUp from '../../../../img/up.svg';
import arrowDown from '../../../../img/down.svg';
import rozetkaLogo from '../../../../img/rozetkaLogo.png';
import promLogo from '../../../../img/promLogo.png';
import TableTypes from 'constants/tableTypes';

const headCells = {
  allProductsContractor: [
    {
      id: 'имя',
      numeric: false,
      disablePadding: true,
      label: 'Название товара'
    },
    // {
    //   id: 'Id поставщика',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Id поставщика'
    // },
    { id: 'Тип', numeric: false, disablePadding: false, label: 'Тип' },
    { id: 'Артикул', numeric: false, disablePadding: false, label: 'Артикул' },
    { id: 'Бренд', numeric: false, disablePadding: false, label: 'Бренд' },
    {
      id: 'Категория',
      numeric: false,
      disablePadding: false,
      label: 'Категория'
    },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Категория Prom.ua'
    // },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Доступен для:'
    // },
    {
      id: 'Количество',
      numeric: true,
      disablePadding: false,
      label: 'Количество'
    },
    { id: 'Цена', numeric: true, disablePadding: false, label: 'Цена' },
    {
      id: 'Розничная цена',
      numeric: true,
      disablePadding: false,
      label: 'Рекомендуемая цена'
    }
  ],
  allProductsPartner: [
    {
      id: 'имя',
      numeric: false,
      disablePadding: true,
      label: 'Название товара'
    },
    {
      id: 'Id поставщика',
      numeric: false,
      disablePadding: false,
      label: 'Id поставщика'
    },
    { id: 'Тип', numeric: false, disablePadding: false, label: 'Тип' },
    { id: 'Артикул', numeric: false, disablePadding: false, label: 'Артикул' },
    { id: 'Бренд', numeric: false, disablePadding: false, label: 'Бренд' },
    {
      id: 'Категория',
      numeric: false,
      disablePadding: false,
      label: 'Категория'
    },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Категория Prom.ua'
    // },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Доступен для:'
    // },
    {
      id: 'Количество',
      numeric: true,
      disablePadding: false,
      label: 'Количество'
    },
    { id: 'Цена', numeric: true, disablePadding: false, label: 'Цена' }
    // {
    //   id: 'Розничная цена',
    //   numeric: true,
    //   disablePadding: false,
    //   label: 'Рекомендуемая цена'
    // }
  ],
  myProducts: [
    {
      id: 'имя',
      numeric: false,
      disablePadding: true,
      label: 'Название товара'
    },
    {
      id: 'Id поставщика',
      numeric: false,
      disablePadding: false,
      label: 'Id поставщика'
    },
    { id: 'Тип', numeric: false, disablePadding: false, label: 'Тип' },
    { id: 'Артикул', numeric: false, disablePadding: false, label: 'Артикул' },
    { id: 'Бренд', numeric: false, disablePadding: false, label: 'Бренд' },
    {
      id: 'Категория',
      numeric: false,
      disablePadding: false,
      label: 'Категория'
    },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Категория Prom.ua'
    // },
    // {
    //   id: 'Категория',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Доступен для:'
    // },
    {
      id: 'Количество',
      numeric: true,
      disablePadding: false,
      label: 'Количество'
    },
    // { id: 'Цена', numeric: true, disablePadding: false, label: 'Цена' },
    {
      id: 'Цена поставщика',
      numeric: true,
      disablePadding: false,
      label: `Цена поставщика`,
      icon: `<img src=${ImportExportIcon}/>`,
      tooltip: 'Сортировать'
    },
    // {
    //   id: 'Розничная цена',
    //   numeric: true,
    //   disablePadding: false,
    //   label: 'Розничная цена'
    // },
    { id: 'Наценка', numeric: true, disablePadding: false, label: 'Наценка' },
    {
      id: 'sellingPrice',
      numeric: true,
      disablePadding: false,
      label: 'Цена реализации'
    }
    // { id: 'Yml', numeric: false, disablePadding: false, label: 'Yml' }
  ]
};

const getTableCell = type => {
  switch (type) {
    case TableTypes.allProductsContractor:
      return headCells.allProductsContractor;

    case TableTypes.allProductsPartner:
      return headCells.allProductsPartner;

    case TableTypes.myProducts:
      return headCells.myProducts;
  }
};

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    numSelected,
    tableTypes,
    rowCount,
    showCheckbox,
    onClickSortingProduct,
    tableType
  } = props;

  const currentTableCells = getTableCell(tableTypes);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {showCheckbox && (
            <MyCheckbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              value={numSelected === rowCount}
              handleChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          )}
        </TableCell>
        {currentTableCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'имя' ? 'inherit' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            style={
              headCell.id === 'Цена поставщика'
                ? {
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
                : null
            }
            onClick={
              headCell.id === 'Цена поставщика' ? onClickSortingProduct : null
            }
          // sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.tooltip ? (
              <Tooltip title={headCell.tooltip}>
                <div>{headCell.label}</div>
              </Tooltip>
            ) : (
                headCell.label
              )}
            {headCell.icon ? <ImportExportIcon /> : ''}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: '#fff',
        backgroundColor: '#26c6da'
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    position: 'relative',
    color: theme.palette.text.secondary
  },
  filter: {
    width: '40px',
    height: '50px'
  },
  title: {
    flex: '0 0 auto'
  }
}));

const EnhancedTableToolbar = ({
  numSelected,
  isAllProducts,
  handleDeleteProducts,
  filters,
  changeFilters
}) => {
  const classes = useToolbarStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} Выбрано
          </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
              Товары
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 && !isAllProducts ? (
          <Tooltip title="Удалить товар">
            <IconButton onClick={handleDeleteProducts} aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Фильтры товаров">
              <IconButton
                style={{ transition: 'none', backgroundColor: 'none' }}
                aria-describedby={id}
                onClick={handleClick}
              // aria-label="filter list"
              >
                <div>
                  <p
                    style={{
                      fontSize: '17px',
                      fontWeight: '900',
                      marginRight: '10px',
                      marginTop: '12px'
                    }}
                    className={classes.filterText}
                  >
                    Фильтр
                </p>
                </div>
                <FilterListIcon className={classes.filter} />
              </IconButton>
            </Tooltip>
          )}
        <FilterPopover handleClose={handleClose} id={id} open={open}>
          <Filters filters={filters} changeFilters={changeFilters} />
        </FilterPopover>
      </div>
    </Toolbar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    position: 'relative'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}));

const inlineStyles = {
  checkBoxRow: {
    // width: '90px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    // padding: '10px',
    // paddingLeft: '4px'
  }
};

class TableRowItem extends React.Component {
  /** Оптимизация елмента таблици, вызывать рендер только если изменился проп  isItemSelected (состояние чекбокса),  либо изменились продукты*/
  shouldComponentUpdate(nextProps) {
    return nextProps.isItemSelected !== this.props.isItemSelected || nextProps.product !== this.props.product;
  }

  render() {
    const {
      product,
      index,
      showCheckbox,
      isItemSelected,
      onSelectChange,
      myproduct,
      edit,
      handleOpenModal,
      labelId,
      showProductPriceContractor,
      showIdContractor,
      showProductPrice,
      showRecommendedPrice,
      showPercent,
      showSellingPrice
    } = this.props;

    return (
      <TableRow
        hover
        //   onClick={event => handleClick(event, row.name)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell
          padding={edit ? 'default' : 'checkbox'}
          style={showCheckbox && edit && { paddingLeft: '6px' }}
        >
          <div
            key={product.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {showCheckbox && (
              <MyCheckbox
                value={isItemSelected}
                onClick={() => onSelectChange(product.id)}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            )}
            {edit && (
              <div>
                <EditIcon onClick={handleOpenModal} />
              </div>
            )}
          </div>
        </TableCell>
        <TableCell id={labelId} scope="row" padding="none">
          <div className={styles.prName}>
            <div>
              <img
                src={
                  product.coverImages && product.coverImages[0]
                    ? product.coverImages[0].imageDecoded
                    : product.imageUrls && product.imageUrls[0]
                      ? product.imageUrls[0].url
                      : Boolean(product.avatarUrl)
                        ? product.avatarUrl
                        : defaultImage
                }
              />
            </div>
            <div>
              <Tooltip title={product.name} enterDelay={200} leaveDelay={400}>
                <div className={styles.prNameText}>
                  <div className={styles.imgPlatformBlock}>
                    <div className={styles.imagesPlatform}>
                      {product.marketplace &&
                        product.marketplace.rozetka === true ? (
                          <img
                            className={styles.imgPlatformRozetka}
                            src={rozetkaLogo}
                          />
                        ) : (
                          ''
                        )}
                      {product.marketplace &&
                        product.marketplace.prom === true ? (
                          <img
                            className={styles.imgPlatformProm}
                            src={promLogo}
                          />
                        ) : (
                          ''
                        )}
                    </div>
                    {product.name}
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </TableCell>
        {showIdContractor && (
          <TableCell align="center">
            <p className={styles.prVendorCode}>
              {product.contractorProduct == null
                ? product.user
                : product.contractorProduct.user}
            </p>
          </TableCell>
        )}
        <TableCell align="center">
          <Tooltip
            title={product.createdType || ''}
            enterDelay={200}
            leaveDelay={400}
          >
            <p className={styles.prVendorCode}>{product.createdType}</p>
          </Tooltip>
        </TableCell>
        <TableCell align="center">
          <Tooltip title={product.vendorCode} enterDelay={200} leaveDelay={400}>
            <p className={styles.prVendorCode}>{product.vendorCode}</p>
          </Tooltip>
        </TableCell>

        <TableCell align="center">{product.brand || '-'}</TableCell>
        <TableCell align="center">
          {product.category ? product.category.name : '-'}
        </TableCell>
        <TableCell align="center">{product.count}</TableCell>
        {showProductPrice && (
          <TableCell align="center">
            {product.price
              ? product.price
              : (
                product.contractorPriceForPartner +
                (product.contractorPriceForPartner * product.partnerPercent) /
                100
              ).toFixed(2)}
          </TableCell>
        )}
        {showProductPriceContractor && (
          <TableCell align="center">
            {product.cleanPrice
              ? product.cleanPrice
              : (
                product.contractorPriceForPartner +
                (product.contractorPriceForPartner * product.partnerPercent) /
                100
              ).toFixed(2)}
          </TableCell>
        )}
        {myproduct && (
          <TableCell align="center">
            {product.contractorProduct &&
              product.contractorProduct.priceStatus &&
              product.contractorProduct.priceStatus.status == '1' ? (
                <div className={styles.contractorPrice}>
                  {product.contractorProduct
                    ? product.contractorProduct.price
                    : '-'}
                  <img className={styles.contractorPriceArrow} src={arrowUp} />
                </div>
              ) : product.contractorProduct &&
                product.contractorProduct.priceStatus &&
                product.contractorProduct.priceStatus.status == '-1' ? (
                  <div className={styles.contractorPrice}>
                    {product.contractorProduct
                      ? product.contractorProduct.price
                      : '-'}
                    <img className={styles.contractorPriceArrow} src={arrowDown} />
                  </div>
                ) : product.contractorProduct ? (
                  product.contractorProduct.price
                ) : (
                    '-'
                  )}
          </TableCell>
        )}
        {showRecommendedPrice && (
          <TableCell align="center">{product.recommendedPrice}</TableCell>
        )}
        {showPercent && (
          <TableCell align="center">
            {product.partnerPercent ? `${product.partnerPercent}%` : ''}
          </TableCell>
        )}
        {showSellingPrice && (
          <TableCell align="center">{product.sellingPrice}</TableCell>
        )}
        {/* {myproduct && (
          <Fragment>
            <TableCell align="center">
              {`${(
                (product.partnerPercent / 100) *
                product.contractorPriceForPartner
              ).toFixed(2)}(${product.partnerPercent}%)`}
            </TableCell>
          </Fragment>
        )} */}
      </TableRow>
    );
  }
}

export default function MyTable(props) {
  const classes = useStyles();

  const {
    products,
    edit,
    isAllProducts,
    openProduct,
    handleDeleteProducts,
    loading,
    myproduct,
    filters,
    changeFilters,
    handleChangeTable,
    tableTypes,
    handleChangeRowsPerPage,
    pagination: { pageSize, pageSizeOptions, total, current },
    rowSelection: { onSelectChange, selectedIds, onAllSelection },
    showCheckbox,
    showRecommendedPrice,
    showPercent,
    showSellingPrice,
    showProductPriceContractor,
    showIdContractor,
    showProductPrice
  } = props;

  const [page, setPage] = React.useState(0);
  const [sortedDirection, setSortedDirection] = React.useState(false);
  const [sortingProducts, setSortingProducts] = React.useState(null);

  const handleChangeProducts = (page, current) => {
    setSortingProducts(null);
    handleChangeTable(page, current);
  };
  const sortingProductsByPrice = () => {
    const sortedProducts = products.sort((a, b) => {
      const aStatus =
        a.contractorProduct &&
          a.contractorProduct.priceStatus &&
          a.contractorProduct.priceStatus.status
          ? a.contractorProduct.priceStatus.status
          : 0;
      const bStatus =
        b.contractorProduct &&
          b.contractorProduct.priceStatus &&
          b.contractorProduct.priceStatus.status
          ? b.contractorProduct.priceStatus.status
          : 0;

      if (sortedDirection) {
        return aStatus - bStatus;
      } else {
        return bStatus - aStatus;
      }
    });
    setSortedDirection(prevState => !prevState);
    setSortingProducts(sortedProducts);
  };

  const isSelected = id => selectedIds.includes(id);

  const handleOpenModal = index => () => {
    openProduct(index);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          changeFilters={changeFilters}
          filters={filters}
          handleDeleteProducts={handleDeleteProducts}
          isAllProducts={isAllProducts}
          numSelected={selectedIds.length}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
          // size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              showCheckbox={showCheckbox}
              showProductPrice={showProductPrice}
              numSelected={selectedIds.length}
              myproduct={myproduct}
              tableTypes={tableTypes}
              onClickSortingProduct={sortingProductsByPrice}
              // order={order}
              //   orderBy={orderBy}
              onSelectAllClick={onAllSelection}
              //   onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            {products.length === 0 ? (
              <TableBody style={{ height: 50 }}>
                <TableRow>
                  <TableCell colSpan={myproduct ? '11' : '8'} align="center">
                    <div className={styles.nodata}>
                      <Icons
                        variants="default"
                        icon="warning"
                        style={{ fontSize: 42 }}
                      />
                      Данныe отсутствуют!
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
                <TableBody>
                  {(sortingProducts || products)
                    .slice(page * pageSize, page * pageSize + pageSize)
                    .map((product, index) => {
                      // const product = sortingProducts ? sortingProducts[index] : products[index]
                      const isItemSelected = isSelected(product.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRowItem
                          key={index}
                          product={product}
                          index={index}
                          showCheckbox={showCheckbox}
                          isItemSelected={isItemSelected}
                          onSelectChange={onSelectChange}
                          myproduct={myproduct}
                          edit={edit}
                          handleOpenModal={handleOpenModal(index)}
                          labelId={labelId}
                          showRecommendedPrice={showRecommendedPrice}
                          showPercent={showPercent}
                          showSellingPrice={showSellingPrice}
                          showProductPriceContractor={showProductPriceContractor}
                          showIdContractor={showIdContractor}
                          showProductPrice={showProductPrice}
                        />
                      );
                    })}
                </TableBody>
              )}
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={pageSizeOptions}
          component="div"
          count={total}
          rowsPerPage={pageSize}
          page={current - 1}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          // onChangePage={handleChangePage}handleChangeTable
          onChangePage={handleChangeProducts}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {loading && <Loaders />}
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func.isRequired,
  // order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string,
  rowCount: PropTypes.number.isRequired
};
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
};
