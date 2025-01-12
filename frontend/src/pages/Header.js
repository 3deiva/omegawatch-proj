function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="logo header">Drone Project</div>
      <nav>
        <ul className="flex space-x-6">
          <li><a href="/" className="text-pink-100 hover:text-blue-200 header">Home</a></li>
          <li><a href="/live-feed" className="text-pink-100 hover:text-blue-200 header">Live Feed</a></li>
          <li><a href="/path-visualization" className="text-pink-100 hover:text-blue-200 header">Path Visualization</a></li>
          <li><a href="/analytics" className="text-pink-100 hover:text-blue-200 header">Analytics</a></li>
          <li><a href="/about" className="text-pink-100 hover:text-blue-200 header">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
