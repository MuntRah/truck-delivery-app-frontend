import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import DriverSignupForm from "./components/SignupForm/DriverSignupForm";

import SigninForm from "./components/SigninForm/SigninForm";
import DriverSigninForm from "./components/SigninForm/DriverSigninForm";

import * as authService from "../src/services/authService"; // import the authservice
import orderService from "./services/orderService";

import OrderList from "./components/OrderList/OrderList";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderForm from "./components/OrderForm/OrderForm";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using from authservice
  const [orders, setOrders] = useState([]);

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      const orderData = await orderService.index();
      console.log("orderData:", orderData);
      setOrders(orderData);
    };
    if (user) fetchAllOrders();
  }, [user]);

  // editing in app.jsx

  // const handleAddOrder = async (orderFormData) => {
  //   const newOrder = await orderService.create(orderFormData);
  //   setOrders([...orders, newOrder]);
  //   // navigate('/order/orders');
  // };
  const navigate = useNavigate();
  const handleAddOrder = async (orderFormData) => {
    const newOrder = await orderService.create(orderFormData);
    setOrders([...orders, newOrder]);
    navigate("/order/orders");
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/orders" element={<OrderList orders={orders} />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />

              <Route
                path="/orders/new"
                element={<OrderForm handleAddOrder={handleAddOrder} />}
              />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />

          <Route
            path="/driver-signup"
            element={<DriverSignupForm setUser={setUser} />}
          />
          <Route
            path="/driver-signin"
            element={<DriverSigninForm setUser={setUser} />}
          />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
