import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Home from "../pages/home";
import Cart from "../pages/cart";

export default function RoutesApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}
