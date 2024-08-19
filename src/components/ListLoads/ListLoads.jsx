import { Link } from "react-router-dom";

const ListLoad = ({ loads }) => {
  if (!loads.length) return <main> there is no loads</main>;

  return (
    <main>
      {loads.map((load) => (
        <Link key={load._id} to={`/orders /${load._id}`}>
          <div>
            <h2>{load.from}</h2>
            <h2>{load.to}</h2>
            <h2>{load.price}</h2>
            <h2>{load.status}</h2>
            <h2>{load.action}</h2>
          </div>
        </Link>
      ))}
    </main>
  );
};

export default ListLoad;
