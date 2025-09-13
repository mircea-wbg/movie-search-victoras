import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import HomePage from './pages/HomePage';
import DetailsPage from "./pages/DetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import './styles/globals.css';

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        {/* Layout gestionează sidebar + main content */}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/movie/:id" element={<DetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;
