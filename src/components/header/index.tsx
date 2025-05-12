import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

export default function Header() {
  const { cartAmount } = useContext(UserContext);
  return (
    <header className="shadow-xl fixed w-full top-0 z-50 bg-zinc-50">
      <nav className="flex w-full max-w-7xl justify-between h-20 mx-auto px-5  items-center">
        <Link to="/">
          <span className="text-4xl font-bold ">Dev</span>
          <span className=" text-5xl text-blue-400 font-serif ">Shop</span>
        </Link>

        <Link to="/cart" className="relative">
          <FiShoppingCart size={30} color="#121212" />
          {cartAmount > 0 && (
            <span className="absolute left-4 bottom-4 text-xl bg-red-400 rounded-full  px-2">
              {cartAmount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
