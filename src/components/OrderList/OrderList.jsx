
const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {orders.map((order) => (
        <Link key={order._id} to={`/orders/${order._id}`}>
          <div>
            <h2>{order.from}</h2>
            <h2>{order.to}</h2>
            <h2>{order.price}</h2>
            <h2>{order.orderStatus}</h2>
            <h2>{order.vehicle}</h2>
          </div>
        </Link>
      ))}
    </main>
  );
};


export default OrderList;
