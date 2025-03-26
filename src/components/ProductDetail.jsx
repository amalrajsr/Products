import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) return null;

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded shadow bg-white">
      <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Category:</span> {product.category}
      </p>
      {product.image && (
        <img
          src={product.image}
          alt={product.title}
          className="w-32 h-32 object-cover mb-2"
        />
      )}
      {product.description && (
        <p className="text-gray-700">{product.description}</p>
      )}
    </div>
  );
};

export default ProductDetail;
