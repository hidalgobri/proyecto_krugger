import { ProductInterface } from '../../interfaces/interface'

export type ProductsMutationData = {
  products: ProductInterface[]
};

export type OneProductMutationData = {
  product: ProductInterface;
};

export type OneProductMutationVars = {
  id: string;
};
