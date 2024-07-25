import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/layout/Layout";
import ShopPage from "./pages/shop/ShopPage";
import ProductManagerPage from "./pages/product-manager/ProductManagerPage";
import AddProductPage from "./pages/add-product/AddProductPage";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/admin/product-manager"
            element={<ProductManagerPage />}
          />
          <Route path="/admin/add-product" element={<AddProductPage />} />
          <Route path="/shop/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
