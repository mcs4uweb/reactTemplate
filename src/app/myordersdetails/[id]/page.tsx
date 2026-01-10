type Params = { id: string };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ id: 'demo-order' }];
}

export default function MyOrderDetailsPage({ params }: { params: Params }) {
  const { id } = params;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>
      <p className="mt-2 text-sm text-gray-500">Order ID: {id}</p>
    </main>
  );
}
