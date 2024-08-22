import { Link } from "react-router-dom";

const LoadList = ({ loads, }) => {
  if (!loads || loads.length === 0) {
    return <main>There are no loads.</main>;
  }

  return (
    <main>
      {filterdLoads.map((load) => (
        <section key={load._id}>
          <ul>
            <li>
              <h2>
                From: ({load.from}) - To: ({load.to})

              </h2>
              <p>payment: {(load.price*0.5)}</p>
              <Link to={`/loads/${load._id}`}>
                <button>
                  view
                </button>
              </Link>
            </li>
          </ul>
        </section>
      ))}
    </main>
  );
};

export default LoadList;