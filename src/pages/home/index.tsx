import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/user";
import { BsCartPlus } from "react-icons/bs";
import Title from "../../components/title";
import { useNavigate } from "react-router-dom";

interface ProductsProps {
  cover: string;
  description: string;
  title: string;
  id: string;
  price: number;
  amount: number;
  total: number;
}

export default function Home() {
  const { addItemCart, getFirebase, cartFire } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getFirebase();
  }, [cartFire]);

  function handleAddCartItem(products: ProductsProps) {
    addItemCart(products);
  }

  if (cartFire.length === 0) {
    return (
      <div className="flex w-full justify-center font-bold text-2xl mt-40">
        Carregando produtos...
      </div>
    );
  }

  return (
    <>
      <main className="w-full mt-20 max-w-7xl h-dvh px-4 mx-auto ">
        <Title title="Produto em alta " />
        <div className=" grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 ">
          {cartFire.map((products) => (
            <section className="w-full " key={products.id}>
              <img
                className="w-full rounded-lg max-h-70 mb-2 cursor-pointer transition duration-300 hover:border border-slate-900"
                src={products.cover}
                alt="logo do produto"
                onClick={() => {
                  navigate(`/product/${products.id}`);
                }}
              />
              <div>
                <p className="font-medium mt-1 mb-2"> {products.title}</p>
                <div className="flex w-full items-center gap-5">
                  <strong className="text-zinc-700/90">
                    R${products.price}
                  </strong>{" "}
                  <button
                    className="bg-zinc-900 p-1 rounded transition duration-300 hover:scale-115"
                    onClick={() => handleAddCartItem(products)}
                  >
                    <BsCartPlus size={20} color="#fff" />
                  </button>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
