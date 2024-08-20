import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import loadService from "../../services/loadService";

const LoadDetails = (props) => {
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
        <h2>From :{load.from}</h2>
        <h2>To: {load.to}</h2>
        <p>Vehicle type : {load.vehicle}</p>
        <p>Status : {load.loadStatus}</p>
        <p>Price :{load.price}</p>
        <button id="update" type="update">UPDATE</button>
      


      </header>
      <p>{load.text}</p>
      <section></section>
    </main>
  );
};

export default LoadDetails;