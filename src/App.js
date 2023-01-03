import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CoupenList from "./Admin/CoupenList";
import EditCoupen from "./Admin/EditCoupen";
import LoginComp from "./Admin/LoginComp";
import NewCoupen from "./Admin/NewCoupen";
import "./App.css";
import FetchDataApi from "./Backend/FetchDataApi";
import CartComp from "./front/components/CartComp";
import Header from "./front/components/Header";
import Products from "./front/components/Products";

function App() {
  const url = "https://ecommerce-coupens-api.onrender.com/api/v1";
  const [search, setSearch] = useState("");
  const [coupens, setCoupens] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [editCoupen, setEditCoupen] = useState({});
  const [isChange, setIsChange] = useState(false);
  const [token, setToken] = useState("");

  return (
    <div className="App">
      <Header
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        isLogin={isLogin}
      />
      <FetchDataApi
        setCoupens={setCoupens}
        user={user}
        coupens={coupens}
        isChange={isChange}
        url={url}
      />
      {/* <FetchApi search={search} /> */}
      <Routes>
        <Route
          path="/"
          element={
            <Products
              search={search}
              setCart={setCart}
              cart={cart}
              setTotalItems={setTotalItems}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartComp
              coupens={coupens}
              cart={cart}
              setCart={setCart}
              setTotalItems={setTotalItems}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoginComp
              setUser={setUser}
              setIsLogin={setIsLogin}
              setToken={setToken}
              url={url}
            />
          }
        />
        <Route
          path="/coupen-list"
          element={
            <CoupenList
              setIsLogin={setIsLogin}
              coupens={coupens}
              setCoupens={setCoupens}
              setEditCoupen={setEditCoupen}
              setIsChange={setIsChange}
              isChange={isChange}
              token={token}
              url={url}
            />
          }
        />
        <Route
          path="/coupen-form"
          element={
            <NewCoupen
              coupens={coupens}
              setCoupens={setCoupens}
              setIsChange={setIsChange}
              isChange={isChange}
              token={token}
              url={url}
            />
          }
        />
        <Route
          path="/edit-coupen/:id"
          element={
            <EditCoupen
              editCoupen={editCoupen}
              setCoupens={setCoupens}
              coupens={coupens}
              isChange={isChange}
              setIsChange={setIsChange}
              token={token}
              url={url}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
