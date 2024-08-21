import { useState, useEffect } from "react";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import "./OrderForm.css";

const OrderForm = ({ handleAddOrder }) => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    vehicle: "Sedan",
  });

  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 24.7136, lng: 46.6753 }); // Hada el long/lat 7ag el Riyadh
  const [rate, setRate] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
          // hada default location lama el geolocation fails ewadeek ela el Riyadh
          setMapCenter({ lat: 24.7136, lng: 46.6753 });
        }
      );
    }
  }, []);

  // 3ashan esawi calculate route lama el from or to values change
  useEffect(() => {
    if (formData.from && formData.to) {
      calculateRoute();
    }
  }, [formData.from, formData.to]);

  useEffect(() => {
    if (distance) {
      const match = distance.match(/[\d.]+/);
      if (match) {
        const distanceValue = match[0];
        const calculatedRate = distanceValue * 1.2;
        setRate(calculatedRate.toFixed(3)); // esawi el rate with three decimal points nafs el dinar
      } else {
        setRate(""); // Clear rate eda mafee distance found
      }
    }
  }, [distance]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAddOrder(formData);
  };

  const calculateRoute = () => {
    if (formData.from && formData.to) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: formData.from,
          destination: formData.to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            console.log("Directions result:", result);
            setDirections(result); // Show directions
            const distance = result.routes[0]?.legs[0]?.distance?.text;
            setDistance(distance || "Distance unavailable");
          } else {
            console.error(`Error fetching directions: ${status}`);
            setDirections(null); // Hada besawi clear 7ag el directions eda 9ar fe error
          }
        }
      );
    }
  };

  return (
    <main>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={10}
        center={mapCenter}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

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

        <p>Estimated Distance: {distance}</p>
        <p>Rate: BD {rate}</p>

        <button className="submit" type="submit">SUBMIT</button>
      </form>
    </main>
  );
};

export default OrderForm;
