const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/orders`;

const index = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, {
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

const create = async (orderFormData) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
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

const deleteOrder = async (orderId) => {
  try {
    const res = await fetch(`${BASE_URL}/order/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default { index, show, create, deleteOrder };