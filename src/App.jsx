import { useState, createContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Landing from "./components/Landing/Landing";
import Dashboard from "./components/Dashboard/Dashboard";
import DriverDashboard from "./components/DriverDashboard/DriverDashboard";

import SignupForm from "./components/SignupForm/SignupForm";
import DriverSignupForm from "./components/SignupForm/DriverSignupForm";
import SigninForm from "./components/SigninForm/SigninForm";
import DriverSigninForm from "./components/SigninForm/DriverSigninForm";

import OrderList from "./components/OrderList/OrderList";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import OrderForm from "./components/OrderForm/OrderForm";
import UpdateForm from "./components/UpdateForm/UpdateForm";

import LoadList from "./components/LoadList/LoadList";
import LoadDetails from "./components/LoadDetails/LoadDetails";
import MyLoads from "./components/MyLoads/MyLoads";

import * as authService from "../src/services/authService";
import orderService from "./services/orderService";
import loadService from "./services/loadService";

import { LoadScript } from "@react-google-maps/api";
import "bulma/css/bulma.min.css";

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [orders, setOrders] = useState([]);
  const [loads, setLoads] = useState([]);
  const [myLoads, setMyLoads] = useState([]);
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

  useEffect(() => {
    const fetchAllLoads = async () => {
      const loadData = await loadService.index();
      console.log("loadData:", loadData);
      setLoads(loadData);
    };
    if (user?.driver) fetchAllLoads();
  }, [user?.driver]);

  useEffect(() => {
    const fetchMyLoads = async () => {
      const myLoadData = await loadService.myLoads();
      console.log("myLoadData:", myLoadData);
      setMyLoads(myLoadData);
    };
    if (user?.driver) fetchMyLoads();
  }, [user?.driver]);

  const handleAddOrder = async (orderFormData , rate) => {
    console.log(orderFormData);
    const newOrder = await orderService.create({
      from: orderFormData.from,
      to: orderFormData.to,
      vehicle: orderFormData.vehicle,
      price:rate
    });
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
    await orderService.update(orderId, formData);
    const updatedOrders = await orderService.index();
    setOrders(
      updatedOrders
    );
    
    navigate(`/orders`);
  };

  const handleUpdateStatus = async (orderId, formData) => {
    const updatedOrder = await orderService.update(orderId, formData);
    const updatedOrders = await loadService.myLoads()
    setMyLoads(
      updatedOrders
    );
    navigate(`/my-loads`);
  };

  const handleAccept = async (loadId) => {
    await loadService.update(loadId, { stat: "accepted" });
    const acceptedLoads = loadService.index();
    setLoads(
      acceptedLoads
    );
    navigate("/my-loads")
  }

  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        loadingElement={<div>Loading...</div>}
      >
        <AuthedUserContext.Provider value={user}>
          <NavBar user={user} handleSignout={handleSignout} />
          <Routes>
            {user ? (
              <>
                {user.driver ? (
                  <>
                    <Route
                      path="/"
                      element={<DriverDashboard user={user} />}
                    />
                    <Route
                      path="/loads"
                      element={<LoadList user={user} loads={loads} />}
                    />
                    <Route
                      path="/my-loads"
                      element={
                        <MyLoads
                          user={user}
                          loads={myLoads}
                          handleUpdateStatus={handleUpdateStatus}
                        />
                      }
                    />
                    <Route
                      path="/loads/:loadId"
                      element={
                        <LoadDetails user={user} handleAccept={handleAccept} />
                      }
                    />
                  </>
                ) : (
                  <>
                  <Route path="/" element={<Dashboard user={user} />} />
                  
                </>
                )}
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
