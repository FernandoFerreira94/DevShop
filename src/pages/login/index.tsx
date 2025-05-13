import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Db } from "../../firebase/db";
import { setDoc, doc } from "firebase/firestore";

export default function Login() {
  const navigate = useNavigate();
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  async function loginUser() {
    await setDoc(doc(Db, "user", nome), {
      nome,
      email,
    })
      .then((snapshot) => {
        console.log(snapshot);
      })
      .catch((error) => console.error(error));
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    loginUser(); // Salva no Firestore
    localStorage.setItem("user", JSON.stringify({ nome, email }));

    navigate("/home"); // Redireciona
  }

  return (
    <main className="w-full h-dvh border flex  justify-center items-center bg-white">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg border-slate-900 border-2 bg-slate-100 rounded-md py-8 flex flex-col justify-center items-center">
        <div>
          <span className="text-7xl font-bold ">Dev</span>
          <span className=" text-8xl text-blue-400 font-serif ">Shop</span>
        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 flex  flex-col gap-4 w-6/10"
        >
          <label htmlFor="">
            <strong>Nome:</strong>{" "}
            <input
              type="text"
              placeholder="Digite seu nome"
              className="border rounded-md bg-white py-1 pl-2 w-7/10"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </label>
          <label htmlFor="">
            <strong>Email:</strong>{" "}
            <input
              type="email"
              placeholder="email@email.com"
              className="ml-1 border rounded-md bg-white py-1 pl-2 w-7/10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="border mt-2 w-50 mx-auto rounded-xl py-1 bg-slate-600 text-white font-bold transition duration-300 hover:bg-slate-900"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
