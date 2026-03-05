import { gql } from 'graphql-tag';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {OneProductMutationData,OneProductMutationVars } from '../../graphql/types/ProductGraphType'

const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
    }
  }
`;

const GET_PRODUCT = gql`
    query Product($id: ID!) {
        product(id: $id) {
            id
            name
            description
            price
        }
    }
`;

interface Props {
  open: boolean;
  idProduct: string| null;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSuccess: () => void;
}

export function ProductRegister({ open, idProduct,anchorEl, onClose, onSuccess }: Props) {

  const { loading, error, data, refetch } = useQuery<OneProductMutationData,OneProductMutationVars>(GET_PRODUCT, { variables: {id: idProduct!},skip: !idProduct} );

    useEffect(() => {
      if (data?.product) {
        setForm({
          name: data.product.name ?? '',
          description: data.product.description ?? '',
          price: String(data.product.price ?? ''),
        });
      }
    }, [data]);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
  });

  const [createProduct] = useMutation(CREATE_PRODUCT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
      if(!idProduct)
      {
            console.log("product vacio, crea producto");
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

          }catch (ex) {
            console.error(ex);
          }
      }

      else
      {
        refetch();
        console.log("product lleno, editar producto");
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
          {idProduct? 'Editar Producto' :'Registrar Producto'}
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

        >
          Guardar
        </Button>
      </Box>
    </Popover>
  );
}