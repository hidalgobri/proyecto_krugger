    import { gql } from 'graphql-tag';
    import { useState, useCallback } from 'react';
    import { useQuery, useMutation } from '@apollo/client/react';

    import Box from '@mui/material/Box';
    import Button from '@mui/material/Button';
    import Typography from '@mui/material/Typography';

    import { DashboardContent } from 'src/layouts/dashboard';

    import { Iconify } from 'src/components/iconify';

    import { ProductGrid } from '../../product/product-grid'

    export function OrderView(){

        const handleSaveOrder= () => {
            console.log("guardar orden");
        }

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
                            >
                              Guardar orden
                            </Button>
                          </Box>
                        <ProductGrid/>
                </DashboardContent>

            );
    }