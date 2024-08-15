import React from 'react'; // React must be imported to use JSX
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import AppLayout from './Layout/AppLayout';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import Search from './Pages/Search';
import Favourite from './Pages/Favourite';
import Gif from './Pages/Gif';
import GifProvider from './Context/Context';  // Ensure GifProvider is imported correctly

// Define the routes using react-router-dom
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="search/:query" element={<Search />} />
      <Route path="favourites" element={<Favourite />} />
      <Route path=":category" element={<Categories />} />
      <Route path=":type/:slug" element={<Gif />} />
    </Route>
  )
);

// Main App component
function App() {
  return (
    <GifProvider>  {/* Wrap the RouterProvider with GifProvider */}
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
