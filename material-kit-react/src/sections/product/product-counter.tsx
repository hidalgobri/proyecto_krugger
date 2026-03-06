import { useState, useEffect } from "react";

import { Box, Button, Typography } from "@mui/material";

type CounterProps = {
    onChange: (value: number) => void;
}

export default function ProductCounter( {onChange} : CounterProps ) {
  const [count, setCount] = useState(0);

    useEffect(() => {
      onChange(count);
    }, [count]);

  const increase = () => {
    setCount((c) => c+1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount((c) => c-1);
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