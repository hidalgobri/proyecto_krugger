    import { gql } from 'graphql-tag';
    import { useState, useCallback } from 'react';
    import { useQuery, useMutation } from '@apollo/client/react';

    import Grid from '@mui/material/Grid';

    import { ProductItem } from './product-order-item';
    import { ProductsMutationData } from '../../graphql/types/ProductGraphType'
    import { ProductInterface,OrderProductItem } from '../../interfaces/interface'

    const GET_PRODUCTS = gql`
              query GetProducts {
                products {
                  id
                  name
                  description
                  price
                }
              }
            `;

    type ProductGridProps = {
      showProductCounter: boolean;
      cart?: (order: OrderProductItem) => void;
    };

    export function ProductGrid({showProductCounter, cart}:ProductGridProps){
        const { loading, error, data, refetch } = useQuery<ProductsMutationData>(GET_PRODUCTS);

          const handleProductItemDeleted = () =>{
            refetch();
          }

        return (
                  <Grid container spacing={3}>
                    {data?.products.map((product: ProductInterface) => (
                      <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ProductItem product={product} onDeleted={handleProductItemDeleted} showCounter={showProductCounter} cart={cart} />
                      </Grid>

                    ))}
                  </Grid>

            );
    }