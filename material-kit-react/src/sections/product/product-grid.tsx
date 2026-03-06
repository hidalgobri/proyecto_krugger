    import { gql } from 'graphql-tag';
    import { useState, useCallback } from 'react';
    import { useQuery, useMutation } from '@apollo/client/react';

    import Grid from '@mui/material/Grid';

    import { ProductItem } from './product-item';
    import { ProductInterface } from '../../interfaces/interface'
    import { ProductsMutationData } from '../../graphql/types/ProductGraphType'

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


    export function ProductGrid(){
        const { loading, error, data, refetch } = useQuery<ProductsMutationData>(GET_PRODUCTS);

          const handleProductItemDeleted = () =>{
            refetch();
          }

        return (
                  <Grid container spacing={3}>
                    {data?.products.map((product: ProductInterface) => (
                      <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ProductItem product={product} onDeleted={handleProductItemDeleted} />
                      </Grid>

                    ))}
                  </Grid>

            );
    }