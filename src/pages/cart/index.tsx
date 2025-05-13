import { useContext } from "react";
import { UserContext } from "../../contexts/user";
import { Link } from "react-router-dom";

import Title from "../../components/title";

export default function Cart() {
  const { cart, total, addItemCart, removeItemCart } = useContext(UserContext);

  return (
    <main className="w-full mt-20 max-w-7xl h-dvh px-4 mx-auto ">
      <Title title="Meu Carrinho" />
      <div>
        {cart.length === 0 && (
          <div className="w-full flex flex-col items-center gap-10">
            <p className="font-bold text-xl">Ops seu carrinho está vazio 😢</p>
            <Link
              to="/home"
              className="hover:scale-105 transition duration-300 text-xl bg-slate-600 text-white p-3 px-4 rounded-xl"
            >
              {" "}
              Acessar produtos
            </Link>
          </div>
        )}
        {cart.map((product) => (
          <section
            key={product.id}
            className="flex w-full max-w-7xl items-center justify-between border-b-2 border-gray-300 "
          >
            <img className="w-35" src={product.cover} alt="logo do produto" />
            <strong>Preço: R$ {product.price}</strong>

            <div className="flex gap-3 items-center justify-center">
              <button
                onClick={() => removeItemCart(product)}
                className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2  hover:bg-slate-900 transition duration-300"
              >
                -
              </button>
              <span>{product.amount}</span>
              <button
                onClick={() => addItemCart(product)}
                className="bg-slate-600 rounded text-white font-medium flex items-center justify-center px-2  hover:bg-slate-900 transition duration-300"
              >
                +
              </button>
            </div>

            <strong className="float-right">
              SubTotal:{" "}
              {product.total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>
          </section>
        ))}
      </div>
      {cart.length > 0 && <p className="font-bold mt-4">Total: {total}</p>}
    </main>
  );
}
