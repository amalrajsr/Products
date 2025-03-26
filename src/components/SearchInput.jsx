import React, { useState, useEffect, useRef, useCallback } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductDetail from "./ProductDetail";
import SuggestionsDropdown from "./SuggestionsDropdown";
import BeatLoader from "react-spinners/BeatLoader";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useProducts(query);

  // Refs to track each suggestion for scrolling
  const itemRefs = useRef([]);
  const suggestionsRef = useRef(null);

  // Scroll the active (highlighted) item into view
  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Delay closing so that mouse events on suggestions can register
    setTimeout(() => {
      setIsFocused(false);
      setActiveIndex(-1);
    }, 150);
  }, []);

  const handleChange = useCallback((e) => {
    setQuery(e.target.value);
    setActiveIndex(-1);
    // Clear previously selected product when typing a new query
    setSelectedProduct(null);
  }, []);

  // Keyboard navigation: ArrowUp/Down to move, Enter to select, Escape to close
  const handleKeyDown = useCallback(
    (e) => {
      if (!isFocused) return;
      const totalSuggestions = products.length;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (totalSuggestions > 0) {
            setActiveIndex((prev) => Math.min(prev + 1, totalSuggestions - 1));
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (totalSuggestions > 0) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case "Enter":
          if (activeIndex >= 0 && activeIndex < totalSuggestions) {
            const selected = products[activeIndex];
            setQuery(selected.title);
            setSelectedProduct(selected);
          }
          setIsFocused(false);
          setActiveIndex(-1);
          break;
        case "Escape":
          setIsFocused(false);
          setActiveIndex(-1);
          break;
        default:
          break;
      }
    },
    [products, activeIndex, isFocused]
  );

  // Infinite scrolling in the dropdown
  const handleScroll = useCallback(
    (e) => {
      if (!hasNextPage || isFetchingNextPage) return;
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  // Mouse interactions for highlighting and selecting
  const handleMouseEnter = useCallback((idx) => {
    setActiveIndex(idx);
  }, []);

  const handleMouseDown = useCallback((item) => {
    setQuery(item.title);
    setSelectedProduct(item);
    setIsFocused(false);
    setActiveIndex(-1);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto mt-8">
      {/* Search Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder="Search for products..."
        className="w-full p-2 border border-gray-300 rounded outline-none 
                   focus:border-blue-500 transition-colors"
      />

      {/* Loading & Error States */}
      {isLoading && isFocused && (
        <div className="absolute left-0 right-0 mt-1 p-2 bg-white shadow">
          <BeatLoader size={8} className=" text-gray-500" />
        </div>
      )}
      {isError && isFocused && (
        <div className="absolute left-0 right-0 mt-1 p-2 bg-white shadow text-red-500">
          {"something went wrong"}
        </div>
      )}

      {/* Suggestions Dropdown */}
      {!isLoading && !isError && isFocused && (
        <SuggestionsDropdown
          products={products}
          query={query}
          activeIndex={activeIndex}
          handleMouseEnter={handleMouseEnter}
          handleMouseDown={handleMouseDown}
          handleScroll={handleScroll}
          isFetchingNextPage={isFetchingNextPage}
          suggestionsRef={suggestionsRef}
        />
      )}

      {/* Product Details Section */}
      {selectedProduct && <ProductDetail product={selectedProduct} />}
    </div>
  );
}

export default SearchInput;
