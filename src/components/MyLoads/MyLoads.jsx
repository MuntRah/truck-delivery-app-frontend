import { Link } from "react-router-dom";

const LoadList = ({ loads }) => {
  if (!loads.length) return <main> There are no loads</main>;

  return (
    <main>
      {loads.map((load) => (
        <Link key={load._id} to={`/orders /${load._id}`}>
          <div>
            <form action="">
            <h2>{load.from}</h2>
            <h2>{load.to}</h2>
            <h2>{load.price}</h2>
            <h2>{load.status}</h2>
            <h2>{load.action}</h2>
            <label htmlFor="Action">Action</label>
            <select name="Action" id="Action">
              <option value="accept">Accept</option>
              <option value="reject">Reject</option>
            </select>
            </form>
          </div>
        </Link>
      ))}
    </main>
    
  );
};

export default LoadList;
