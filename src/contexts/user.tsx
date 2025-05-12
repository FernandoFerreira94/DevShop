import { createContext, useState, type ReactNode } from "react";
import { api } from "../service/api";

// Define a estrutura dos produtos, incluindo atributos como título, preço e quantidade
export interface ProductsProps {
  cover: string; // Imagem do produto
  description: string; // Descrição do produto
  title: string; // Nome do produto
  id: number; // Identificador único do produto
  price: number; // Preço unitário
  amount: number; // Quantidade do produto no carrinho
  total: number; // Valor total baseado na quantidade * preço
}

// Define a estrutura do contexto para armazenar produtos e manipular o carrinho
interface UserContextProps {
  products: ProductsProps[]; // Lista de produtos disponíveis
  cartAmount: number; // Quantidade total de itens no carrinho
  getProducts: () => Promise<void>; // Função para buscar produtos da API
  addItemCart: (newItem: ProductsProps) => void; // Função para adicionar produtos ao carrinho
  cart: ProductsProps[];
  removeItemCart: (product: ProductsProps) => void;
  total: string;
}

// Define a estrutura das propriedades do `UserProvider`
interface UserProviderProps {
  children: ReactNode; // Elementos filhos que vão consumir o contexto
}

// Cria o contexto com um valor inicial vazio
export const UserContext = createContext({} as UserContextProps);

// Componente responsável por armazenar o estado global dos produtos e do carrinho
export default function UserProvider({ children }: UserProviderProps) {
  const [products, setProducts] = useState<ProductsProps[]>([]); // Estado para armazenar os produtos disponíveis
  const [cart, setCart] = useState<ProductsProps[]>([]); // Estado para armazenar os itens do carrinho
  const [total, setTotal] = useState("");

  // Função assíncrona que busca os produtos na API
  async function getProducts() {
    try {
      const response = await api.get("/products"); // Faz uma requisição GET para buscar os produtos
      setProducts(response.data); // Atualiza o estado com os produtos obtidos
    } catch (error) {
      console.error(error); // Exibe erros no console caso a requisição falhe
    }
  }

  // Função para adicionar itens ao carrinho
  function addItemCart(newItem: ProductsProps) {
    // Verifica se o item já existe no carrinho
    const indexItem = cart.findIndex((item) => item.id === newItem.id);

    if (indexItem !== -1) {
      // Caso o item já esteja no carrinho, aumenta a quantidade dele
      const cartList = [...cart]; // Cria uma cópia do carrinho para evitar mutações diretas
      cartList[indexItem].amount = cartList[indexItem].amount + 1;

      // Atualiza o total com base na nova quantidade
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price;

      setCart(cartList); // Atualiza o estado do carrinho com os novos valores
      TotalResultCart(cartList);
      return;
    }

    // Se o item ainda não estiver no carrinho, adicionamos ele pela primeira vez
    const data = {
      ...newItem, // Mantém as propriedades do produto
      amount: 1, // Define a quantidade inicial como 1
      total: newItem.price, // O total começa como o preço unitário do produto
    };

    setCart((prevCart) => [...prevCart, data]); // Atualiza o carrinho adicionando o novo item
    TotalResultCart([...cart, data]);
  }

  function removeItemCart(product: ProductsProps) {
    const indexItem = cart.findIndex((item) => item.id === product.id);
    if (cart[indexItem]?.amount > 1) {
      const carList = cart;
      carList[indexItem].amount = carList[indexItem].amount - 1;
      carList[indexItem].total =
        carList[indexItem].total - carList[indexItem].price;

      setCart(carList);
      TotalResultCart(carList);
      return;
    }

    const removeItem = cart.filter((item) => item.id !== product.id);
    setCart(removeItem);
    TotalResultCart(removeItem);
  }

  function TotalResultCart(items: ProductsProps[]) {
    const myCart = items;
    const result = myCart.reduce((acc, obj) => {
      return acc + obj.total;
    }, 0);

    const resultFormat = result.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setTotal(resultFormat);
  }

  return (
    // Provedor do contexto que disponibiliza os produtos e funções para os componentes filhos
    <UserContext.Provider
      value={{
        products,
        getProducts,
        cartAmount: cart.length, // Número total de itens no carrinho
        addItemCart,
        removeItemCart,
        cart,
        total,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
