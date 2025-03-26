import Fallback from "./components/Fallback";
import SearchInput from "./components/SearchInput";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary fallback={<Fallback />}>
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold text-center">Product Search</h1>
        <SearchInput />
      </div>
    </ErrorBoundary>
  );
}

export default App;
