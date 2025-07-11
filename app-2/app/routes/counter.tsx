import type { MetaFunction } from '@remix-run/node';
import { CounterComponent } from '../counter-component.client';
import { ClientOnly } from '../components/ClientOnly';
// eslint-disable-next-line import/no-unresolved

export const meta: MetaFunction = () => {
  return [
    { title: "Counter from App-1" },
    { name: "description", content: "Counter component consumed from app-1 via Module Federation" },
  ];
};

export default function CounterPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Counter from App-1
        </h1>

        <ClientOnly fallback={<div className="text-center">Loading counter component...</div>}>
          <CounterComponent />
        </ClientOnly>
        
        <div className="text-center">
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            This counter component is loaded from app-1 via Module Federation
          </p>
        </div>
      </div>
    </div>
  );
} 