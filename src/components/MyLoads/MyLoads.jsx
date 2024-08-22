import { Link } from "react-router-dom";
import loadService from "../../services/loadService";

  const MyLoads = ({ loads , handleUpdateLoads }) => {

  const handleSubmit = async (loadId, event) => {
    event.preventDefault();
    const status = event.target.orderStatus.value; // Get the selected status
    const updatedLoad = await loadService.update(loadId, { stat: status }); 
    const updatedLoads = await loadService.myloads();
    handleUpdateLoads(updatedLoads)// Update the load
    // Optionally update the local state or re-fetch the loads to reflect changes
  };

  if (!loads.length) return <main>There are no loads</main>;
  return (
    <main>
      {loads.map((load) => (
        <div key={load._id}>
          <Link to={`/loads/${load._id}`}>
            <h2>{load.from}</h2>
            <h2>{load.to}</h2>
            <h2>{load.price*0.5}</h2>
            <h2>{load.orderStatus}</h2>
          </Link>
          <form onSubmit={(event) => handleSubmit(load._id, event)}>
            <label htmlFor={`orderStatus`}>Status</label>
            <select
              name="orderStatus"
              id={`orderStatus`}>
              <option value="on the way">On the Way</option>
              <option value="delivered">Delivered</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
    </main>
  );
};

export default MyLoads;
