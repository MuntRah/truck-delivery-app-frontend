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
              <h3>From :{order.from}</h3>
              <h3>To: {order.to}</h3>
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
