export const ApiEndpoints = {
  checkoutUrl() {
    return '/checkout';
  },

  placeOrderUrl() {
    return `${this.checkoutUrl()}/placeOrder`;
  },
};

export * from './types';
