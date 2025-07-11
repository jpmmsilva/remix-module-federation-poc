import { lazy, Suspense } from 'react';

const Counter = lazy(async () => {
  try {
    const module = await import('app-1/counter');
    console.log("AAAAAAAAA", module);
    console.log("Module loaded:", module);
    return module;
  } catch (error) {
    console.error('Failed to load counter module:', error);
    throw error;
  }
});

export const CounterComponent = () => {
  return (
    <div className='text-black'>
      <Suspense fallback={<div>Loading counter...</div>}>
        <Counter />
      </Suspense>
    </div>
  );
};