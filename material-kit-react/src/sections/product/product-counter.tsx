import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

export default function ProductCounter() {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <Box sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         gap: 0.5
    }}>
      <Button variant="outlined" onClick={decrease}>
        -
      </Button>

      <Typography variant="h6">{count}</Typography>

      <Button variant="outlined" onClick={increase}>
        +
      </Button>
    </Box>
  );
}