import { useState , useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import orderService from "../../services/orderService";

const UpdateForm = ({ handleUpdateOrder }) => {
    
    
  const { orderId } = useParams();

  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    vehicle: 'Sedan',
  });

  useEffect(() => {
    const fetchHoot = async () => {
      const formData = await orderService.show(orderId);
      setFormData(formData);
    };
    fetchHoot();
  }, [orderId]);

  

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
      handleUpdateOrder(orderId, formData);
    
  };


  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="from">Pick-up</label>
        <input
          required
          type="text"
          name="from"
          id="from"
          value={formData.from}
          onChange={handleChange}
        />
        <label htmlFor="to">Dropoff</label>
        <input
          required
          type="text"
          name="to"
          id="to"
          value={formData.to}
          onChange={handleChange}
        />
        <label htmlFor="vehicle">Vehicle type</label>
        <select
          required
          name="vehicle"
          id="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
        >
          <option value="Sedan">Sedan</option>
          <option value="SUV">SUV</option>
          <option value="Truck">Truck</option>
        </select>
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default UpdateForm;