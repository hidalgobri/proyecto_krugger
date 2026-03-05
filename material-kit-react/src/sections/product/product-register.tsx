import { useState } from 'react';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`;

interface Props {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductRegister({ open, anchorEl, onClose, onSuccess }: Props) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createProduct({
        variables: {
          input: {
            name: form.name,
            description: form.description,
            price: parseFloat(form.price),
          },
        },
      });

      onSuccess(); // refresca lista
      onClose();   // cierra popover

      setForm({ name: '', description: '', price: '' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box sx={{ p: 3, width: 300 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Registrar Producto
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          name="name"
          value={form.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Descripción"
          name="description"
          value={form.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Precio"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          Guardar
        </Button>
      </Box>
    </Popover>
  );
}