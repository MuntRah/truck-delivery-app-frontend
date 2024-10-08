import { useState, useEffect  } from "react";
import { useParams } from "react-router-dom";
import { GoogleMap, DirectionsRenderer } from "@react-google-maps/api";
import "../OrderForm/OrderForm.css";
import { version } from "react";
import orderService from "../../services/orderService";

const UpdateForm = ({ handleUpdateOrder }) => {
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


  //This is to calculate the price - it is now adjusted to calculate past the coma if the value is above 1000
  useEffect(() => {
    if (distance) {
      const match = distance.match(/[\d,]+(\.\d+)?/);
      if (match) {
        const distanceValueStr = match[0].replace(/,/g, '');      
        const calculatedRate = (distanceValueStr * 1.2).toFixed(3);
        setRate(calculatedRate);
      } else {
        setRate("");
      }
    }
  }, [distance]);

  const {orderId} = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const formData = await orderService.show(orderId);
      setFormData(formData);
    };
    fetchOrder();
  }, [orderId]);


  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateOrder(orderId ,formData, fullRate);
  };

  const calculateRoute = () => {
    
    if (formData.from  && formData.to ) {
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
            setDirections(null);
            setDirections(result); // Show directions
            const distance = result.routes[0]?.legs[0]?.distance?.text;
            setDistance(distance || "Distance unavailable");
          }else {
          console.error(`Error fetching directions: ${status}`);
            setDirections(null); // Hada besawi clear 7ag el directions eda 9ar fe error
          }
        }
      );
    }
  };
  let fullRate;
  return (
    <main>
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        zoom={10}
        center={mapCenter}
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>

      <div className="the-stuffs">
        {distance && (
          <p id="specs">Est Distance: {distance}</p>
        )}

        {distance && (
          <p id="specs">Rate: BD {fullRate=formData.vehicle=="SUV"?rate*1.5: formData.vehicle=="Truck"?rate*2:rate}</p>
        )}
      </div>

      <form className="submit-form" onSubmit={handleSubmit}>
        <div className="form-container">
            <div className="form-group">
              <label htmlFor="from">Pick-up</label>
              <input
                required
                type="text"
                name="from"
                id="from"
                value={formData.from}
                onChange={handleChange}
              />
            </div>  

            <div className="form-group">
              <label htmlFor="to">Dropoff</label>
              <input
                required
                type="text"
                name="to"
                id="to"
                value={formData.to}
                onChange={handleChange}
              />
            </div>  

            <div className="form-group">
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
            </div>
          </div>  
    
              <div id="sub-button">
                <button class="button is-primary" type="submit">SUBMIT</button>
              </div>
      </form>
    </main>
  );
};

export default UpdateForm;
