export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Browse Applications</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search applications..."
          className="w-full max-w-md px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* App cards will go here */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">No applications found</h3>
          <p className="text-gray-400">Applications will appear here once connected to the repository.</p>
        </div>
      </div>
    </div>
  );
}
