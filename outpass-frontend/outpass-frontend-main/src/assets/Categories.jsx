import React from "react";
import { Link } from "react-router-dom";
import { Utensils, ShowerHead, Home, FlaskConical, Package } from "lucide-react";

const categories = [
  { name: "Kitchen", icon: <Utensils size={36} />, link: "/products/kitchen" },
  { name: "Toilet", icon: <ShowerHead size={36} />, link: "/products/toilet" },
  { name: "Home", icon: <Home size={36} />, link: "/products/home" },
  { name: "Chemicals", icon: <FlaskConical size={36} />, link: "/products/chemicals" },
  { name: "All Items", icon: <Package size={36} />, link: "/products/all" },
];

export default function CategorySection() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <Link 
              to={category.link} 
              key={index} 
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md hover:bg-indigo-100 transition-all"
            >
              {category.icon}
              <span className="mt-2 text-lg font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
