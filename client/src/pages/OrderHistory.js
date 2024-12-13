import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order._id} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-bold mb-2">Order #{order._id}</h2>
              <p className="mb-2">Status: {order.status}</p>
              <p className="mb-2">
                Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="mb-2">Total: ${order.total.toFixed(2)}</p>
              <h3 className="font-bold mt-2">Products:</h3>
              <ul>
                {order.products.map((item) => (
                  <li key={item.product._id}>
                    {item.product.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
