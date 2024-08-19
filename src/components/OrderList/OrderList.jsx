import { Link } from "react-router-dom";

const OrderList = ({ orders, handleDeleteOrder }) => {
  if (!orders || orders.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {orders.map((order) => (
        <section key={order._id}>
          <ul>
            <li>
              <h2>
                From: ({order.from}) - To: ({order.to})
              </h2>
              <button
                onClick={() => {
                  handleDeleteOrder(order._id);
                }}
              >
                Delete
              </button>
              <Link to={`/orders/${order._id}`}>
                <button>
                  View Details
                </button>
              </Link>
            </li>
          </ul>
        </section>
      ))}
    </main>
  );
};

export default OrderList;