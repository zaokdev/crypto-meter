import {BrowserRouter, Route,Routes} from "react-router-dom"
import { Home } from "./components/FinalViews/Home"
import { Layout } from "./components/Layout/Layout"
function App() {
      //Aquí irá el Router

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
