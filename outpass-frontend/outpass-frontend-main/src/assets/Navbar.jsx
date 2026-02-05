import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(3); // Example cart count

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            Ecommerce
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-indigo-600">Home</Link>

            {/* Product Dropdown */}
            <div className="relative group">
              <button className="hover:text-indigo-600">Products</button>
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link to="/products/category1" className="block px-4 py-2 hover:bg-gray-100">Category 1</Link>
                <Link to="/products/category2" className="block px-4 py-2 hover:bg-gray-100">Category 2</Link>
                <Link to="/products/category3" className="block px-4 py-2 hover:bg-gray-100">Category 3</Link>
              </div>
            </div>

            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} className="hover:text-indigo-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Login Button */}
            <Link to="/auth/login" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-100 py-4"
        >
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/about" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/contact" className="hover:text-indigo-600" onClick={() => setIsOpen(false)}>Contact</Link>

            {/* Cart Icon */}
            <Link to="/cart" className="relative flex items-center" onClick={() => setIsOpen(false)}>
              <ShoppingCart size={24} className="hover:text-indigo-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link 
              to="/auth/login" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
