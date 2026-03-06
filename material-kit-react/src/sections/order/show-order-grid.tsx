    import { gql } from 'graphql-tag';
    import { useState, useCallback } from 'react';
    import { useQuery, useMutation } from '@apollo/client/react';

    import Grid from '@mui/material/Grid';

    import {OrderCard} from './show-order-item'
    import {Order,OrderItem } from '../../interfaces/interface'
    import {OrderData} from '../../graphql/types/ProductGraphType'

    const GET_ORDERS= gql`
query OrdersAll {
  ordersAll {
    id
    items {
      id
      quantity
      product {
        id
        name
        description
        price
      }
    }
    user {
      id
      username
    }
  }
}

            `;

    export function ShowOrderGrid(){
        const { loading, error, data, refetch } = useQuery<OrderData>(GET_ORDERS);

        console.log(data);

        return(
                <Grid container spacing={3}>
                      {data?.ordersAll.map((order: any) => (
                        <Grid key={order.id} size={{ xs: 12, sm: 6, md: 4 }}>
                          <OrderCard order={order} />
                        </Grid>
                      ))}
                    </Grid>
            );

    }