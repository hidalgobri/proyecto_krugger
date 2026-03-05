import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';

import { ProductInterface } from '../../interfaces/interface'

// ----------------------------------------------------------------------
export function ProductItem({ product }: { product: ProductInterface }) {
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
        </Box>
      </Stack>
    </Card>
  );
}
