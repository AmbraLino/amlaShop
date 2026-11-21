
import logo from "./logo.svg";
import "./App.css";
import Home from "./Pages/Home";
import TopBar from "./Base/TopBar";
import Footer from "./Base/Footer";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Base/NavBar";
import Create from "./CRUD/Create";
import ReadAll from "./CRUD/ReadAll";
import ReadOne from "./CRUD/ReadOne";
import UpdateOne from "./CRUD/UpdateOne";
import Register from "./Auth/Register";
import AdminPanel from "./Auth/AdminPanel";
import ProtectedRoute from "./Auth/ProtectedRoute";
import Shop from "./Pages/Shop";
import Login from "./Auth/Login";
import { CartProvider } from "./CartContext";
import CartPage from "./CartPage";
import ProductDetails from "./Pages/ProductDetails";
import { UserContextProvider } from "./Auth/UserContext";

function App() {
  return (
    <div>
      <UserContextProvider>
        <TopBar />
        <NavBar />
         <CartProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
           <Route path="/contact" element={<Contact />} />
          <Route path="/create" element={<Create />} />
          <Route path="/readAll" element={<ReadAll />} />
          <Route path="/readOne/:id" element={<ReadOne />} />
          <Route path="/updateOne/:id" element={<UpdateOne />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/shop" element={<Shop />}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/adminPanel"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminPanel />
              </ProtectedRoute>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        </CartProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;



