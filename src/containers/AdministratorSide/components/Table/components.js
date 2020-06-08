
<AutoSizer>
  {({ height, width }) => (
    <List height={height} width={width} itemSize={72} itemCount={products.length}>
      {({ index }) => {
        const product = sortingProducts ? sortingProducts[index] : products[index]
        const isItemSelected = isSelected(product.id);
        const labelId = `enhanced-table-checkbox-${index}`;

        return (<TableRowItem
          product={product}
          index={index}
          showCheckbox={showCheckbox}
          isItemSelected={isItemSelected}
          onSelectChange={onSelectChange}
          myproduct={myproduct}
          edit={edit}
          handleOpenModal={handleOpenModal}
          labelId={labelId}
        />)
      }}
    </List>
  )}
</AutoSizer>


{
  (sortingProducts || products)
    .slice(page * pageSize, page * pageSize + pageSize)
    .map((product, index) => {


      return (<TableRowItem
        product={product}
        index={index}
        showCheckbox={showCheckbox}
        isItemSelected={isItemSelected}
        onSelectChange={onSelectChange}
        myproduct={myproduct}
        edit={edit}
        handleOpenModal={handleOpenModal}
        labelId={labelId}
      />)
    })
}


const TableRowItem = ({ product, index, showCheckbox, isItemSelected, onSelectChange, myproduct, edit, handleOpenModal, labelId }) => {
  return (
    <TableRow
      elementType="div"
      hover
      //   onClick={event => handleClick(event, row.name)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={product.id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox" elementType="div"
      >
        {showCheckbox && (
          <MyCheckbox
            value={isItemSelected}
            onClick={() => onSelectChange(product.id)}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        )}
      </TableCell>
      <TableCell
        component="div"
        id={labelId}
        scope="row"
        padding="none"
      >
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
            <Tooltip
              title={product.name}
              enterDelay={200}
              leaveDelay={400}
            >
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
      {idContractor && <TableCell align="center" component="div">
        <p className={styles.prVendorCode}>
          {product.contractorProduct == null
            ? product.user
            : product.contractorProduct.user}
        </p>
      </TableCell>}
      <TableCell align="center" component="div">
        <Tooltip
          title={product.createdType || ''}
          enterDelay={200}
          leaveDelay={400}
        >
          <p className={styles.prVendorCode}>
            {product.createdType}
          </p>
        </Tooltip>
      </TableCell>
      <TableCell align="center" component="div"
      >
        <Tooltip
          title={product.vendorCode}
          enterDelay={200}
          leaveDelay={400}
        >
          <p className={styles.prVendorCode}>
            {product.vendorCode}
          </p>
        </Tooltip>
      </TableCell>

      <TableCell align="center" component="div">
        {product.brand || '-'}
      </TableCell>
      <TableCell align="center" component="div">
        {product.category ? product.category.name : '-'}
      </TableCell>
      <TableCell align="center" component="div">{product.count}</TableCell>
      {showProductPrice && <TableCell align="center" component="div">
        {product.price
          ? product.price
          : (
            product.contractorPriceForPartner +
            (product.contractorPriceForPartner *
              product.partnerPercent) /
            100
          ).toFixed(2)}
      </TableCell>}
      {showProductPriceContractor && (
        <TableCell align="center">
          {product.cleanPrice
            ? product.cleanPrice
            : (
              product.contractorPriceForPartner +
              (product.contractorPriceForPartner *
                product.partnerPercent) /
              100
            ).toFixed(2)}
        </TableCell>)}
      {myproduct && (
        <TableCell align="center" component="div">
          {/* {product.contractorPriceForPartner} */}
          {product.contractorProduct &&
            product.contractorProduct.priceStatus &&
            product.contractorProduct.priceStatus.status ==
            '1' ? (
              <div className={styles.contractorPrice}>
                {product.contractorPriceForPartner}{' '}
                <img
                  className={styles.contractorPriceArrow}
                  src={arrowUp}
                />
              </div>
            ) : product.contractorProduct &&
              product.contractorProduct.priceStatus &&
              product.contractorProduct.priceStatus.status ==
              '-1' ? (
                <div className={styles.contractorPrice}>
                  {product.contractorPriceForPartner}{' '}
                  <img
                    className={styles.contractorPriceArrow}
                    src={arrowDown}
                  />
                </div>
              ) : (
                product.contractorPriceForPartner
              )}
        </TableCell>
      )}
      <TableCell align="center" component="div">
        {product.recommendedPrice}
      </TableCell>
      {myproduct && (
        <Fragment>
          <TableCell align="center">
            {`${(
              (product.partnerPercent / 100) *
              product.contractorPriceForPartner
            ).toFixed(2)}(${product.partnerPercent}%)`}
          </TableCell>

        </Fragment>
      )}
      {edit && (
        <TableCell align="center" style={{ width: 100 }} component="div">
          <EditIcon onClick={handleOpenModal(index)} />
        </TableCell>
      )}
    </TableRow>
  )
}