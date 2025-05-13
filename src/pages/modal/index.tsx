import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { Db } from "../../firebase/db";
import { BsCartPlus } from "react-icons/bs";
import { useContext } from "react";
import { UserContext } from "../../contexts/user";

interface ProductsProps {
  cover: string;
  description: string;
  title: string;
  id: string;
  price: number;
  amount: number;
  total: number;
}
export default function ModalProduct() {
  const { addItemCart } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState<ProductsProps>({
    id: "",
    title: "",
    price: 0,
    description: "",
    cover: "",
    amount: 1,
    total: 0,
  });

  function handleAddCartItem(products: ProductsProps) {
    addItemCart(products);
  }

  useEffect(() => {
    async function getProductModal() {
      if (!id) return; // Garante que o ID não seja undefined

      const userRef = doc(Db, "products", id);

      await getDoc(userRef)
        .then((snapshot) => {
          setProduct({
            id: id,
            title: snapshot.data()?.title || "",
            price: Number(snapshot.data()?.price || 0),
            description: snapshot.data()?.description || "",
            cover: snapshot.data()?.cover || "",
            amount: 1, // Valor padrão
            total: Number(snapshot.data()?.price || 0), // Inicializando com preço do produto
          });
        })
        .catch((error) => console.error(error));
    }
    getProductModal();
  }, []);

  return (
    <main className="w-full mt-20 max-w-7xl h-dvh px-4 mx-auto ">
      <div className="flex w-full mx-auto mt-40 justify-between gap-50 ">
        <img
          className="w-120 border border-slate-600 h-100"
          src={product?.cover}
          alt=""
        />
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">{product?.title}</h1>
          <p className="text-xl mt-5">{product?.description}</p>
          <span className="font-bold text-xl ">
            Valor: {product?.price}{" "}
            <button
              className="bg-zinc-900 p-1 rounded transition duration-300 hover:scale-115 w-7 "
              onClick={() => handleAddCartItem(product)}
            >
              <BsCartPlus size={20} color="#fff" />
            </button>
          </span>
        </div>
      </div>
    </main>
  );
}
