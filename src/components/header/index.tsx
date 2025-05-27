import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { TbLogin } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/user";
import { Db } from "../../firebase/db";
import { deleteDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

interface UserProps {
  nome: string;
  email: string;
}

export default function Header() {
  const { cartAmount } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const storedUser = JSON.parse(userData);
      setUser(storedUser);
    }
  }, []);

  async function deleteUser() {
    if (!user) {
      toast.error("Nenhum usuário logado!");
      return;
    }

    const userRef = doc(Db, "user", user.nome);
    await deleteDoc(userRef)
      .then(() => {
        toast.error("Voçê foi deslogado");
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => console.error(error));
  }

  function handleDesloga() {
    deleteUser();
    navigate("/");
  }

  return (
    <header
      className="shadow-xl fixed w-full top-0 z-50 bg-zinc-50 
    "
    >
      <nav
        className="flex w-full max-w-7xl justify-between h-20 mx-auto px-5  items-center 

       max-sm:p-0  max-sm:justify-around max-sm:h-23
      "
      >
        <Link to="/home ">
          <span
            className="text-4xl font-bold 
           max-sm:text-3xl
          "
          >
            Dev
          </span>
          <span
            className=" text-5xl text-blue-400 font-serif 
             max-sm:text-4xl    max-sm:block
          "
          >
            Shop
          </span>
        </Link>

        <div
          className="flex gap-5  
          
        "
        >
          <span className="text-xl">
            Olá <strong> {user?.nome ? user.nome : "Visitante"}</strong>
          </span>
          {user?.nome === "admin" && (
            <Link to="/add">
              <RiAdminFill size={30} color="#121212" />
            </Link>
          )}

          <Link to="/cart" className="relative">
            <FiShoppingCart size={30} color="#121212" />
            {cartAmount > 0 && (
              <span className="absolute left-4 bottom-4 text-xl bg-red-400 rounded-full  px-2">
                {cartAmount}
              </span>
            )}
          </Link>
          <button onClick={() => handleDesloga()}>
            <TbLogin size={30} color="#ff0000" />
          </button>
        </div>
      </nav>
    </header>
  );
}
