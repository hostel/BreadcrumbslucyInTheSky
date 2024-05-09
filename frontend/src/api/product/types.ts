export type TSizes = 'Small' | 'Large' | 'Medium';

export type TProduct = {
  description: string;
  id: number;
  image: string;
  model: string;
  name: string;
  price: string;
  priceInCents: number;
  sizes: TSizes[];
  special: string;
  specialInCents: number;
};

export type TProducts = {
  count: number;
  data: TProduct[];
  page: number;
  pageCount: number;
  total: number;
};
