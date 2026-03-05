import { gql } from 'graphql-tag';
import { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem'

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { ProductInterface } from '../../interfaces/interface'

// ----------------------------------------------------------------------
const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

type Props = {
    product: ProductInterface;
    onDeleted: () => void;
};

export function ProductItem({ product, onDeleted }: Props) {

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

    const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    }, []);

    const handleClosePopover = useCallback(() => {
      setOpenPopover(null);
    }, []);

    const handleEditButton = () => {

    }
    const handleDeleteButton = async () => {
        console.log("producto a eliminar");
        console.log(product.id);
        const id = product.id;

        if (window.confirm('¿Seguro de eliminar el producto?')) {
              try {
                await deleteProduct({ variables: { id} });
                handleClosePopover();
                onDeleted();

              } catch (err) {
                console.error('Error deleting product:', err);
              }
        }
    }

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          <Typography variant="h5">{product.description}</Typography>
        </Link>
        <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>{product.name}</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {renderPrice}
          <IconButton onClick={handleOpenPopover}>
                        <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        <Popover
          open={!!openPopover}
          anchorEl={openPopover}
          onClose={handleClosePopover}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuList
            disablePadding
            sx={{
              p: 0.5,
              gap: 0.5,
              width: 140,
              display: 'flex',
              flexDirection: 'column',
              [`& .${menuItemClasses.root}`]: {
                px: 1,
                gap: 2,
                borderRadius: 0.75,
                [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
              },
            }}
          >
            <MenuItem onClick={handleClosePopover}>
              <Iconify icon="solar:pen-bold" />
              Editar
            </MenuItem>

            <MenuItem onClick={handleDeleteButton} sx={{ color: 'error.main' }}>
              <Iconify icon="solar:trash-bin-trash-bold" />
              Eliminar
            </MenuItem>
          </MenuList>
        </Popover>
        </Box>
      </Stack>
    </Card>
  );
}
