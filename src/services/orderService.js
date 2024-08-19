const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/order`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const show = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/${orderId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

// Need to fix
// const create = async (orderFormData) => {
//   const options = {
//     method: 'POST',
//     headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//               'Content-Type': 'application/json',
//             },
//     body: JSON.stringify(orderFormData)
//   }
//   const res = await fetch(`${BASE_URL}/orders`)
//   return res.json()
// }

const create = async (orderFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderFormData),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default { index, show, create };