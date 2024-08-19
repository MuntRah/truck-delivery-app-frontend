import { Link } from "react-router-dom";

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {orders.map((order) => <Link key={order._id} to={`/orders/${order._id}`}>
        <section>
          <ul>
            <li>
              <h2>From :{order.from}</h2>
              <h2>To: {order.to}</h2>
              <p>Vehicle type : {order.vehicle}</p>
              <p>Status : {order.orderStatus}</p>
            </li>
          </ul>
        </section>
        </Link>)
      }
    </main>
  );
};

export default OrderList;
