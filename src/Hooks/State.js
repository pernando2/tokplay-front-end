import { useState } from 'react';

function CustomState(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return [value, handleChange];
}

export default CustomState;