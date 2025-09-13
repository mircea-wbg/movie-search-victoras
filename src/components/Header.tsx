// src/components/Header.tsx
import { Button } from '@fluid-design/fluid-ui';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `px-3 py-2 rounded hover:bg-gray-700 ${
      location.pathname === path ? 'bg-gray-700 font-semibold' : ''
    }`;

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white">
      {/* App Name */}
      <div className="text-xl font-bold">🎬 MovieApp</div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        <Link className={linkClass('/')} to="/">
          Movies
        </Link>
        <Link className={linkClass('/favorites')} to="/favorites">
          Favorites
        </Link>
      </nav>

      {/* Example Fluid Button */}
      <Button label="Sign Out" />
    </header>
  );
}
