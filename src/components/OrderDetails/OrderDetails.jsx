import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderDetail.css";

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

      

      <section className="detailList">
        <div id="detailsContainer" className="container">
          <h1>From :{order.from}</h1>
          <h1>To: {order.to}</h1>
          <p>Vehicle type : {order.vehicle}</p>
          <p>Status : {order.orderStatus}</p>
          <p>Price : BD{order.price}</p>
          <Link to={`/orders/${order._id}/update`}>
            <button className="button is-warning" type="update">
              UPDATE
            </button>
          </Link>

          {/* <CustomerDate name={order.customer.username} date={order.createdAt}/> */}

          <p>{order.text}</p>
        </div>
      </section>
    </main>
  );
};


export default OrderDetails;
