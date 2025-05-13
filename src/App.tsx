import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import UserProvider from "./contexts/user";
import RoutesApp from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Toaster position="top-center" reverseOrder={false} />
        <RoutesApp />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
