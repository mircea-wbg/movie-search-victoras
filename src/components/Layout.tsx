import type { ReactNode } from 'react';
import { Button } from '@fluid-design/fluid-ui';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {

  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white overflow-hidden">
      {/* Overlay pt mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-800 p-6 flex flex-col z-50 transform transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:relative md:w-56 lg:w-64`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold mb-8">Dom' profesor Victor ❤️</h1>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 mb-8">
  <NavLink to="/" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>FILME RECOMANDATE</NavLink>
  <NavLink to="/favorites" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>FILMELE MELE</NavLink>
  <NavLink to="/search" className={({ isActive }) => isActive ? "menu-item menu-item-active" : "menu-item"}>CAUTĂ FILMUL DORIT</NavLink>
</nav>

      
        <div className="mt-auto text-center text-sm text-gray-400">
         Copyright © {new Date().getFullYear()} <b>Profu' Victor</b>. Toate drepturile rezervate. 🤓
        </div>
      </aside>

      {/* Conținut pagini */}
      <div className="flex-1 ml-0 flex flex-col overflow-hidden">
        {/* Header pe mobil */}
        <header className="md:hidden p-4 bg-gray-800 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dom' profesor Victor ❤️</h1>
          <Button color="blue" label="MENIU" onClick={() => setSidebarOpen(true)} />
        </header>

        <main className="flex-1 w-full p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
