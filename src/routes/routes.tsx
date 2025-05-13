import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/header";
import Home from "../pages/home";
import Cart from "../pages/cart";
import AddProduct from "../pages/addProduct";
import Login from "../pages/login";
import ModalProduct from "../pages/modal";

export default function RoutesApp() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/"; // Verifica se estamos na página de login

  return (
    <>
      {!isLoginPage && <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/product/:id" element={<ModalProduct />} />
      </Routes>
    </>
  );
}
