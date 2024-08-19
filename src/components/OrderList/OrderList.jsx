import { Link } from "react-router-dom";

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {orders.map((order) => (
        <Link key={order._id} to={`/orders/${order._id}`}>
          <section>
            <ul>
              <li>
                <h2>
                  From :({order.from}) - To : ({order.to})
                </h2>
              </li>
            </ul>
          </section>
        </Link>
      ))}
    </main>
  );
};

export default OrderList;
