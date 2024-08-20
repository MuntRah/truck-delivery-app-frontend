import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Services
import loadService from "../../services/loadService";

const LoadDetails = (props) => {
  const { loadId } = useParams();
  const [load, setLoad] = useState(null);

  useEffect(() => {
    async function getLoad() {
      const loadData = await loadService.show(loadId);
      setLoad(loadData);
    }
    getLoad();
  }, [loadId]);

  if (!load) {
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