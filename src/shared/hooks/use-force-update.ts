import { useState } from 'react';

export function useForceUpdate() {
  const [value, setValue] = useState<number>(0);
  return () => setValue((value) => value + 1);
}
