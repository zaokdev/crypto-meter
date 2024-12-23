import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/FinalViews/Home";
import { Layout } from "./components/Layout/Layout";
import Exchanges from "./components/FinalViews/Exchanges";
import Bookmarks from "./components/FinalViews/Bookmarks";
import { AuthProvider } from "./context/AuthContext";
import { Login } from "./components/FinalViews/Login";
import { Register } from "./components/FinalViews/Register";
function App() {
  //Aquí irá el Router

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/user/bookmarks" element={<Bookmarks />} />
              <Route path="/exchanges" element={<Exchanges />} />
            </Route>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
