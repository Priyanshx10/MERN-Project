import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          E-Commerce Store
        </Link>
        <div>
          <Link to="/" className="mr-4">
            Home
          </Link>
          {user ? (
            <>
              <Link to="/order-history" className="mr-4">
                Order History
              </Link>
              <button onClick={logout} className="mr-4">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                Login
              </Link>
              <Link to="/register" className="mr-4">
                Register
              </Link>
            </>
          )}
          <Link to="/cart" className="mr-4">
            Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
