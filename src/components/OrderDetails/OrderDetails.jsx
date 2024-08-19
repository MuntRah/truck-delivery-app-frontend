import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import orderService from "../../services/orderService";
// import descriptionService from "../../services/descriptionService";

// Components
import CustomerDate from "../common/CustomerDate";
// import DescriptionForm from '../DescriptionForm/DescriptionForm';


const OrderDetails = (props) => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(()=>{
    async function getOrder(){
      const orderData = await orderService.show(orderId)
      setOrder(orderData)
    }
    getOrder()
  },[orderId])

  const handleAddDescription = async (formData) => {
    const newComment = await commentService.create(orderId, formData)

    const copyOrder = {...order}
    copyOrder.comments.push(newComment)

    setOrder(copyOrder)
  }

  if(!order){
    return <main><h3>Loading...</h3></main>
  }

  return (
    <main>
      <header>
        <p>{order.vehicle.toUpperCase()}</p>
        <h1>{order.pickup}</h1>
        {/* <CustomerDate name={order.customer.username} date={order.createdAt}/> */}
      </header>
      <p>{order.text}</p>
      <section>
        <h2>Description</h2>
        <DescriptionForm handleAddDescription={handleAddDescription}/>
        {!order.descriptions.length && <p>There are is no description.</p>}

        {order.descriptions.map((description) => (
          <article key={description._id}>
            <header>
              <p>
                {description.customer.username} posted on
                {new Date(description.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default OrderDetails;