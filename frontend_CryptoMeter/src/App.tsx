import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/FinalViews/Home";
import { Layout } from "./components/Layout/Layout";
import Exchanges from "./components/FinalViews/Exchanges";
import Bookmarks from "./components/FinalViews/Bookmarks";
import { Login } from "./components/FinalViews/Login";
import { Register } from "./components/FinalViews/Register";
import CryptoDetails from "./components/FinalViews/CryptoDetails";
function App() {
  //Aquí irá el Router

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/user/bookmarks" element={<Bookmarks />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="/details/:id" element={<CryptoDetails />} />
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
