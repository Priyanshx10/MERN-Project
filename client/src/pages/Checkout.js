import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      history.push("/login");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          total,
          shippingAddress: address,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      clearCart();
      history.push("/order-history");
    } catch (error) {
      console.error("Checkout error:", error);
      // TODO: Add error handling, e.g., display error message to user
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">
            Shipping Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          {cart.map((item) => (
            <div key={item._id} className="flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="font-bold mt-2">Total: ${total.toFixed(2)}</div>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
