import { BrowserRouter } from "react-router-dom";
import "./App.css";
import UserProvider from "./contexts/user";
import RoutesApp from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <RoutesApp />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
