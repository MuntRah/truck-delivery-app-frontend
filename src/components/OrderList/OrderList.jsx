const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {orders.map((order) => (
        <section>
          <ul>
            <li>
              <h2>From :{order.from}</h2>
              <h2>To: {order.to}</h2>
              <p>Price :{order.price}</p>
              <p>Status : {order.orderStatus}</p>
              <p>Vehicle type : {order.vehicle}</p>
            </li>
          </ul>
        </section>
      ))}
    </main>
  );
};

export default OrderList;
