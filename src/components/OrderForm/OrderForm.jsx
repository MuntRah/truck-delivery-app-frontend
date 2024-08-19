import { useState } from 'react';

const OrderForm = ({ handleAddOrder }) => {
  const [formData, setFormData] = useState({
    pickup: '',
    dropoff: '',
    vehicle: 'Sedan',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddOrder(formData);

  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pickup-input">Pick-up</label>
        <input
          required
          type="text"
          name="pickup"
          id="pickup-input"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="dropoff-input">Dropoff</label>
        <input
          required
          type="text"
          name="dropoff"
          id="dropoff-input"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="vehicle-input">Vehicle type</label>
        <select
          required
          name="vehicle"
          id="vehicle-input"
          value={formData.category}
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

export default OrderForm;