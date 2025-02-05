function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-zinc-900">OMEGAWATCH</div>

          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <a
                  href="/"
                  className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/live-feed"
                  className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors duration-200"
                >
                  Live Feed
                </a>
              </li>
              <li>
                <a
                  href="/path-visualization"
                  className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors duration-200"
                >
                  Path Visualization
                </a>
              </li>
              <li>
                <a
                  href="/analytics"
                  className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors duration-200"
                >
                  Analytics
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors duration-200"
                >
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
