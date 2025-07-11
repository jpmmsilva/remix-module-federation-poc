import React  from 'react';

/**
 * Counter component
 * @returns {React.ReactNode}
 */
const Counter = () => {
  const [count, setCount] = React.useState(0);

  return <div>
    <button onClick={() => setCount(count + 1)}>Increment</button>
    <button onClick={() => setCount(count - 1)}>Decrement</button>
    <p>Count: {count}</p>
  </div>;
};

export default Counter;
