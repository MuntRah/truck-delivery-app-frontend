const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/loads`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (loadId) => {
  try {
    const res = await fetch(`${BASE_URL}/${loadId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const myLoads = async (loadId) => {
  try {
    const res = await fetch(`${BASE_URL}/my-loads/show`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};



async function update(loadId, FormData) {
  try {
    const res = await fetch(`${BASE_URL}/${loadId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(FormData)
    });
    return res.json();
  } catch (error) {
    console.log(error)
  }
};

export default { index, show,  update , myLoads };
