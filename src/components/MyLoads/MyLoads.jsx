import { Link } from "react-router-dom";
import { useState } from "react";

const MyLoads = ({ loads }) => {
  const [selectedActions, setSelectedActions] = useState({});

  const handleChange = (loadId, event) => {
    setSelectedActions({ ...selectedActions, [loadId]: event.target.value });
  };

  const handleSubmit = (loadId, event) => {
    event.preventDefault();
    console.log(`Load ID: ${loadId}, Action: ${selectedActions[loadId]}`);
   
  };

  if (!loads.length) return <main>There are no loads</main>;

  return (
    <main>
      {loads.map((load) => (
        <div key={load._id}>
          <Link to={`/orders/${load._id}`}>
            <h2>{load.from}</h2>
            <h2>{load.to}</h2>
            <h2>{load.price}</h2>
            <h2>{load.status}</h2>
          </Link>
          <form onSubmit={(event) => handleSubmit(load._id, event)}>
            <label htmlFor={`action-${load._id}`}>Action</label>
            <select
              name="Action"
              id={`action-${load._id}`}
              value={selectedActions[load._id]}
              onChange={(event) => handleChange(load._id, event)}
            >
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      ))}
    </main>
  );
};

export default MyLoads;


// import { Link } from "react-router-dom";
// import { useState } from "react";

// const MyLoads = ({ loads }) => {
//   const [selectedActions, setSelectedActions] = useState({});

//   const handleChange = (loadId, event) => {
//     setSelectedActions({ ...selectedActions, [loadId]: event.target.value });
//   };

//   const handleSubmit = (loadId, event) => {
//     event.preventDefault();
//     console.log(`Load ID: ${loadId}, Action: ${selectedActions[loadId]}`);
//   };

//   if (loads.lenght ===0) return <main>There are no loads</main>;

//   return (
//     <main>
//       {loads.map((load) => (
//         <div key={load._id}>
//           <Link to={`/orders/${load._id}`}>
//             <h2>{load.from}</h2>
//             <h2>{load.to}</h2>
//             <h2>{load.price}</h2>
//             <h2>{load.status}</h2>
//           </Link>
//           <form onSubmit={(event) => handleSubmit(load._id, event)}>
//             <label htmlFor={`action-${load._id}`}>Action</label>
//             <select
//               id={`action-${load._id}`}
//               value={selectedActions[load._id] || ""}
//               onChange={(event) => handleChange(load._id, event)}
//             >
//               <option value="">Select an action</option>
//               <option value="accept">Accept</option>
//               <option value="reject">Reject</option>
//             </select>
//             <button type="submit">Submit</button>
//           </form>
//         </div>
//       ))}
//     </main>
//   );
// };

// export default MyLoads;

