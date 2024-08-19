import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import orderService from "../../services/orderService";
// import descriptionService from "../../services/descriptionService";

// Components
// import CustomerDate from "../common/CustomerDate";
// import DescriptionForm from '../DescriptionForm/DescriptionForm';

const OrderDetails = (props) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function getOrder() {
      const orderData = await orderService.show(orderId);
      setOrder(orderData);
    }
    getOrder();
  }, [orderId]);

  if (!order) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <main>
      <header>
        <h2>From :{order.from}</h2>
        <h2>To: {order.to}</h2>
        <p>Vehicle type : {order.vehicle}</p>
        <p>Status : {order.orderStatus}</p>
        <p>Price :{order.price}</p>
        <button id="update" type="update">UPDATE</button>
      


        {/* <CustomerDate name={order.customer.username} date={order.createdAt}/> */}
      </header>
      <p>{order.text}</p>
      <section></section>
    </main>
  );
};

export default OrderDetails;
