import defaultImage from '../img/pictures/no-productimage.png';

export const getImageInProduct = product => {
  return product.coverImages && product.coverImages[0]
    ? product.coverImages[0].imageDecoded
    : product.imageUrls && product.imageUrls[0]
      ? product.imageUrls[0].url
      : Boolean(product.avatarUrl)
        ? product.avatarUrl
        : defaultImage
};