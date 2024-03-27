import { useState } from "react";

export const useCount = (initial, stock, minimo = 1) => {
  const [total, setCount] = useState(initial);

  const restar = () => {
    if (total > minimo) setCount(total - 1);
  };

  const sumar = () => {
    if (total < stock) setCount(total + 1);
  };

  return { total, restar, sumar };
};
