import { Link } from "react-router-dom";
import "./OrderList.css";
const OrderList = ({ orders, handleDeleteOrder }) => {
  if (!orders || orders.length === 0) {
    return (
      <main>
        <div className="NoOrderlist">
          <h1 className="NoOrder">There are no orders.</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      {orders.map((order) => (
        <div className="orderList">
          <section key={order._id}>
            <ul>
              <li>
                <h2 className="from-to">
                  From: ({order.from}) - To: ({order.to})
                </h2>
                <Link to={`/orders/${order._id}`}>
                  <button className="detailsBtn">View Details</button>
                </Link>
                <button className="deleteBtn"
                  onClick={() => {
                    handleDeleteOrder(order._id);
                  }}
                >
                  Cancel Order
                </button>
              </li>
            </ul>
          </section>
        </div>
      ))}
    </main>
  );
};

export default OrderList;
