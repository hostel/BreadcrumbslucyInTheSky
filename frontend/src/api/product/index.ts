export const ApiEndpoints = {
  productsUrl() {
    return '/product';
  },

  productUrl(productId: number) {
    return `${this.productsUrl()}/${productId}`;
  },
};

export * from './types';
