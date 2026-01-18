import { Link } from 'react-router-dom';
import { AppMetadata } from '../../shared/types';
import { Play, Download } from 'lucide-react';

interface AppCardProps {
  app: AppMetadata;
  isInstalled?: boolean;
}

export default function AppCard({ app, isInstalled = false }: AppCardProps) {
  const categoryPath = app.category === 'game' ? 'games' : 'applications';
  
  return (
    <Link to={`/app/${app.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors border border-gray-700 hover:border-primary-500">
        {/* Banner/Icon */}
        <div className="w-full h-32 bg-gray-700 flex items-center justify-center">
          {app.images?.banner ? (
            <img src={app.images.banner} alt={app.title} className="w-full h-full object-cover" />
          ) : app.images?.icon ? (
            <img src={app.images.icon} alt={app.title} className="w-16 h-16 object-contain" />
          ) : (
            <div className="text-gray-500 text-4xl">{app.title.charAt(0)}</div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1 truncate">{app.title}</h3>
          <p className="text-sm text-gray-400 mb-3 line-clamp-2">{app.description}</p>
          
          {/* Tags */}
          {app.tags && app.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {app.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {/* Actions */}
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-500 capitalize">{app.category}</span>
            {isInstalled ? (
              <span className="text-xs px-2 py-1 bg-green-600/20 text-green-400 rounded flex items-center gap-1">
                <Play className="w-3 h-3" />
                Installed
              </span>
            ) : (
              <span className="text-xs px-2 py-1 bg-primary-600/20 text-primary-400 rounded flex items-center gap-1">
                <Download className="w-3 h-3" />
                Download
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
