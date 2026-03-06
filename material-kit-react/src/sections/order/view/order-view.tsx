    import { gql } from 'graphql-tag';
    import { useState, useCallback, useEffect } from 'react';
    import { useQuery, useMutation } from '@apollo/client/react';

    import Box from '@mui/material/Box';
    import Alert from '@mui/material/Alert';
    import Button from '@mui/material/Button';
    import Dialog from '@mui/material/Dialog';
    import Typography from '@mui/material/Typography';
    import DialogTitle from '@mui/material/DialogTitle';

    import { useRouter } from 'src/routes/hooks';

    import { DashboardContent } from 'src/layouts/dashboard';

    import { Iconify } from 'src/components/iconify';

    import { ProductGrid } from '../../product/product-grid'
    import { OrderItemInterface, OrderProductItem } from '../../../interfaces/interface'

    const CREATE_ORDER = gql`
      mutation CreateOrder($input: OrderInput!) {
        createOrder(input: $input) {
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
        }
      }
    `;

    export function OrderView(){
        const router = useRouter();
        const [createOrder] = useMutation(CREATE_ORDER);
        const [open, setOpen] = useState(false);
        const [cart, setCart] = useState<OrderItemInterface>({
          id: null,
          items: []
        });

        useEffect(() => {
          console.log("cart actualizado:", cart);
        }, [cart]);

const total = cart.items.reduce(
  (acc, item) => acc + item.quantity * item.product.price,
  0
);

const totalItems = cart.items.reduce(
  (acc, item) => acc + item.quantity,
  0
);


        const handleSaveOrder= () => {
            setOpen(true);
        }

        const handleConfirmSave = async ()=>{
           const itemsWithQuantity = cart.items.filter(item => item.quantity > 0);
           try
           {
               await createOrder({
                   variables: {
                     input: {
                       orderItemsInput: itemsWithQuantity.map(item => ({
                         productId: Number(item.product.id),
                         quantity: Number(item.quantity)
                       }))
                     }
                   }
                 });
                router.push('/dashboard');
                setOpen(false);
           }
           catch(e){
               console.error(e);
           }
        }

        const handleCart =(order: OrderProductItem)=>{
            updateCart(order);
        }

     const handleClose = (value: string) => {
        setOpen(false);
      };

        const updateCart = (order: OrderProductItem) => {

          setCart((prevCart) => {

            const existingIndex = prevCart.items.findIndex(
              item => item.product.id === order.product.id
            );

            // Si el producto ya existe → actualizar cantidad
            if (existingIndex !== -1) {

              const updatedItems = [...prevCart.items];

              updatedItems[existingIndex] = {
                ...updatedItems[existingIndex],
                quantity: order.quantity
              };

              return {
                ...prevCart,
                items: updatedItems
              };
            }

            // Si no existe → agregar producto
            return {
              ...prevCart,
              items: [...prevCart.items, order]
            };

          });

        };

        return(
                <DashboardContent>
                        <Box
                            sx={{
                              mb: 5,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <Typography variant="h4" sx={{ flexGrow: 1 }}>
                              Crear orden
                            </Typography>
                            <Button
                              variant="contained"
                              color="inherit"
                              startIcon={<Iconify icon="mingcute:add-line" />}
                              onClick={handleSaveOrder}
                            >
                              Guardar orden
                            </Button>
                          </Box>
                        <ProductGrid showProductCounter cart={handleCart}/>
                        <Dialog onClose={handleClose} open={open}>

                              <Box sx={{
                                         m: 5,
                                         display: 'flex-row',
                                         alignItems: 'center',
                                       }}>
                                <Typography variant="h5">Resumen de la orden</Typography>

                                {cart.items.filter(item => item.quantity > 0).map((item) => (
                                  <Box
                                    key={item.product.id}
                                    display="flex"
                                    justifyContent="space-between"
                                    sx={{ mt: 1 }}
                                  >
                                    <Typography>
                                      {item.product.name} x {item.quantity}
                                    </Typography>

                                    <Typography>
                                      ${(item.product.price * item.quantity).toFixed(2)}
                                    </Typography>
                                  </Box>
                                ))}

                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ mt: 2, fontWeight: "bold", gap: 2 }}

                                >
                                  <Typography>Total productos</Typography>
                                  <Typography>{totalItems}</Typography>
                                </Box>

                                <Box
                                  display="flex"
                                  justifyContent="space-between"
                                  sx={{ mt: 1 }}
                                >
                                  <Typography variant="h6">Total</Typography>
                                  <Typography variant="h6">${total.toFixed(2)}</Typography>
                                </Box>
                                <Button variant="contained" color="inherit" onClick={handleConfirmSave} sx={{mt:2}}>Guardar</Button>
                              </Box>
                        </Dialog>
                </DashboardContent>

            );
    }