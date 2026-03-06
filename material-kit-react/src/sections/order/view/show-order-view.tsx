import { gql } from 'graphql-tag';
import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { OrderCard } from '../show-order-item';
import { ShowOrderGrid } from '../show-order-grid';

export function ShowOrderView()
{
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
                  Mostrar órdenes
                </Typography>
            </Box>
            <ShowOrderGrid/>
        </DashboardContent>
        );
}