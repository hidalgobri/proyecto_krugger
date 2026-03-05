import { gql } from 'graphql-tag';
import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductItem } from '../product-item';
import { ProductSort } from '../product-sort';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';
import { ProductInterface } from '../../../interfaces/interface'
import { ProductsMutationData } from '../../../graphql/types/ProductGraphType'

import type { FiltersProps } from '../product-filters';

// ----------------------------------------------------------------------

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

export function ProductsView() {

    console.log("entro en vista");
  const { loading, error, data, refetch } = useQuery<ProductsMutationData>(GET_PRODUCTS);

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const [sortBy, setSortBy] = useState('featured');

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleOpenFilter = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const handleCloseFilter = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const handleSort = useCallback((newSort: string) => {
    setSortBy(newSort);
  }, []);

  const handleProductItemDeleted = () =>{
    refetch();
  }

  return (
    <DashboardContent>
    <Box
      sx={{
        mb: 5,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        Productos
      </Typography>
      <Button
        variant="contained"
        color="inherit"
        startIcon={<Iconify icon="mingcute:add-line" />}
      >
        Nuevo producto
      </Button>
    </Box>

      <Grid container spacing={3}>
        {data?.products.map((product: ProductInterface) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <ProductItem product={product} onDeleted={handleProductItemDeleted} />
          </Grid>

        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />
    </DashboardContent>
  );
}
