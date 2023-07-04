import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/views/Home/Home";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ProductsTable from "./components/views/ProductsTable/ProductsTable";
import ProductCreate from "./components/views/ProductCreate/ProductCreate";
import ProductEdit from "./components/views/ProductEdit/ProductEdit";
import Error404 from "./components/views/Error404/Error404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const URL = import.meta.env.VITE_API_CAFETERIA;

  const getProducts = async () => {
    try {
      const response = await fetch(URL);
      const productApi = await response.json();
      setProducts(productApi);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  },[]);

  return (
    <div>
      <Router>
        <Navigation />
        <main>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/product/table" element={<ProductsTable products={products}/>}/>
            <Route exact path="/product/create" element={<ProductCreate/>}/>
            <Route exact path="/product/edit" element={<ProductEdit/>}/>
            <Route exact path="*" element={<Error404/>}/>
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
