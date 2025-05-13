import { useEffect, useState, useContext } from "react";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import Title from "../../components/title";
import AddInput from "../../components/input";
import { UserContext } from "../../contexts/user";
import { Db } from "../../firebase/db";
import toast from "react-hot-toast";

export default function AddProduct() {
  const { getFirebase } = useContext(UserContext);
  const [title, setTitle] = useState<string>("");
  const [cover, setCover] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  useEffect(() => {
    getFirebase();
  }, []);

  async function fetchMaxId() {
    const querySnapshot = await getDocs(collection(Db, "products"));
    let maxId = 0;

    querySnapshot.forEach((doc) => {
      const product = doc.data();
      if (product.id > maxId) {
        maxId = product.id;
      }
    });

    return maxId + 1;
  }

  function cleanInput(): void {
    setCover("");
    setDescription("");
    setPrice("");
    setTitle("");
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const newId = await fetchMaxId();

    await setDoc(doc(Db, "products", newId.toString()), {
      id: newId,
      title,
      cover,
      description,
      price: Number(price),
    })
      .then(() => {
        toast.success("Cadastrado com sucesso");
        cleanInput();
      })
      .catch((error) => console.error(error));

    cleanInput();
  }
  return (
    <main className="w-full mt-20 max-w-7xl h-dvh px-4 mx-auto ">
      <Title title="Adicionar Produto" />
      <div className="mt-10">
        <form onSubmit={handleAddProduct} className="p-3 flex flex-col">
          <h1 className="ml-4 text-2xl font-bold mb-5">Insite seu produto</h1>

          <AddInput
            placeholder="Nome do produto"
            nome="Produto"
            value={title}
            func={setTitle}
          />
          <AddInput
            placeholder="Img"
            nome="Img"
            value={cover}
            func={setCover}
          />
          <img src={cover} alt="Img produto" className="w-20" />
          <AddInput
            placeholder="R$ 0,00"
            nome="Valor"
            value={price}
            func={setPrice}
          />
          <label className="text-xl m-2 font-bold">Descrição:</label>
          <textarea
            className="border pl-1 font-medium w-3/10 h-30 bg-white"
            placeholder={"Descrição do produto"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="w-30 border rounded-md bg-slate-600 text-white mt-2 h-10 transition duration-300 hover:bg-slate-900"
            type="submit"
          >
            {" "}
            Cadastrar
          </button>
        </form>
      </div>
    </main>
  );
}
