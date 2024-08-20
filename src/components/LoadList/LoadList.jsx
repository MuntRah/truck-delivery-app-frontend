import { Link } from "react-router-dom";

const LoadList = ({ loads, }) => {
  if (!loads || loads.length === 0) {
    return <main>There are no orders.</main>;
  }

  return (
    <main>
      {loads.map((load) => (
        <section key={load._id}>
          <ul>
            <li>
              <h2>
                From: ({load.from}) - To: ({load.to})
              </h2>
              <Link to={`/loads/${load._id}`}>
                <button>
                  View Load Details
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