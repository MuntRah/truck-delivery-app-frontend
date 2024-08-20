import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import SignupForm from "./components/SignupForm/SignupForm";
import DriverSignupForm from "./components/SignupForm/DriverSignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import DriverSigninForm from "./components/SigninForm/DriverSigninForm";
import * as authService from "../src/services/authService";
import orderService from "./services/orderService";
import OrderList from "./components/OrderList/OrderList";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderForm from "./components/OrderForm/OrderForm";
import UpdateForm from "./components/UpdateForm/UpdateForm";
import { LoadScript } from '@react-google-maps/api';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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

  const handleAddOrder = async (orderFormData) => {
    const newOrder = await orderService.create(orderFormData);
    setOrders([...orders, newOrder]);
    navigate("/orders");
  };

  const handleDeleteOrder = async (orderId) => {
    await orderService.deleteOrder(orderId);
    const updatedOrders = await orderService.index();
    setOrders(updatedOrders);
    navigate("/orders");
  };

  const handleUpdateOrder = async (orderId, formData) => {
    const updatedOrder = await orderService.update(orderId, formData);
    setOrders(
      orders.map((order) => (orderId === order._id ? updatedOrder : order))
    );
    navigate(`/orders`);
  };

  return (
    <>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} loadingElement={<div>Loading...</div>}>
        <AuthedUserContext.Provider value={user}>
          <NavBar user={user} handleSignout={handleSignout} />
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route
                  path="/orders"
                  element={
                    <OrderList
                      orders={orders}
                      handleDeleteOrder={handleDeleteOrder}
                    />
                  }
                />
                <Route path="/orders/:orderId" element={<OrderDetails />} />
                <Route
                  path="/orders/new"
                  element={<OrderForm handleAddOrder={handleAddOrder} />}
                />
                <Route
                  path="/orders/:orderId/update"
                  element={<UpdateForm handleUpdateOrder={handleUpdateOrder} />}
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
      </LoadScript>
    </>
  );
};

export default App;
