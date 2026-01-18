import { useEffect, useState } from 'react';
import { AppMetadata } from '../../shared/types';
import AppCard from '../components/AppCard';

export default function HomePage() {
  const [apps, setApps] = useState<AppMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadApps();
  }, []);

  const loadApps = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!window.electronAPI) {
        setError('Electron API not available');
        setLoading(false);
        return;
      }

      const result = await window.electronAPI.github.scanRepository();
      
      if (result.success && result.data) {
        setApps(result.data);
      } else {
        setError(result.error || 'Failed to load applications');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading applications');
    } finally {
      setLoading(false);
    }
  };

  const filteredApps = apps.filter((app) => {
    const query = searchQuery.toLowerCase();
    return (
      app.title.toLowerCase().includes(query) ||
      app.description.toLowerCase().includes(query) ||
      app.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Browse Applications</h1>
        <button
          onClick={loadApps}
          disabled={loading}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search applications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="text-gray-400">Loading applications...</div>
        </div>
      )}

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-6">
          <h3 className="text-red-400 font-semibold mb-2">Error</h3>
          <p className="text-red-300">{error}</p>
        </div>
      )}

      {!loading && !error && filteredApps.length === 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">No applications found</h3>
          <p className="text-gray-400">
            {searchQuery ? 'No applications match your search.' : 'No applications available in the repository.'}
          </p>
        </div>
      )}

      {!loading && !error && filteredApps.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
