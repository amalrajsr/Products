import React from "react";
import { BeatLoader } from "react-spinners";

function SuggestionsDropdown({
  products,
  query,
  activeIndex,
  handleMouseEnter,
  handleMouseDown,
  handleScroll,
  isFetchingNextPage,
  suggestionsRef,
}) {
  return (
    <div
      ref={suggestionsRef}
      onScroll={handleScroll}
      className="absolute left-0 right-0 bg-white border border-gray-300 rounded mt-1 shadow-md max-h-60 overflow-auto"
    >
      {products.length === 0 && query && (
        <div className="px-4 py-2 text-gray-500">No results found</div>
      )}
      {products.map((product, idx) => (
        <div
          key={product.id || idx}
          className={`px-4 py-2 cursor-pointer border-b ${
            idx === activeIndex ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
          onMouseDown={() => handleMouseDown(product)}
          onMouseEnter={() => handleMouseEnter(idx)}
        >
          {product.title}
        </div>
      ))}
      {isFetchingNextPage && (
        <BeatLoader size={8} className="px-4 py-2 text-gray-500" />
      )}
    </div>
  );
}

export default SuggestionsDropdown;
