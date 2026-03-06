import { Card, CardContent, Typography, Divider, Box, Stack } from "@mui/material";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  quantity: number;
  product: Product;
}

interface User {
  id: string;
  username: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  user: User;
}

interface Props {
  order: Order;
}

export function OrderCard({ order }: Props) {

  const total = order.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>

        {/* Header */}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">
            Orden #{order.id}
          </Typography>

          <Typography color="text.secondary">
            {order.user.username}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Productos */}
        <Stack spacing={1}>
          {order.items.map((item) => (
            <Box
              key={item.id}
              display="flex"
              justifyContent="space-between"
            >
              <Typography>
                {item.product.name} x {item.quantity}
              </Typography>

              <Typography fontWeight={500}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight={600}>
            Total
          </Typography>

          <Typography variant="subtitle1" fontWeight={600}>
            ${total.toFixed(2)}
          </Typography>
        </Box>

      </CardContent>
    </Card>
  );
}