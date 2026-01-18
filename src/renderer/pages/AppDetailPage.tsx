import { useParams } from 'react-router-dom';

export default function AppDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Application Details: {id}</h1>
      <div className="bg-gray-800 rounded-lg p-6">
        <p className="text-gray-400">Application detail view coming soon...</p>
      </div>
    </div>
  );
}
