import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, lazy, Suspense } from "react";
import AdoptedPetContext from "./context/AdoptedPetContext.js";

const Details = lazy(() => import("./pages/Details.jsx"));
const SearchParams = lazy(() => import("./pages/SearchParams.jsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);

  return (
    <div
      className="p-0 m-0 min-w-screen min-h-screen pb-[20px]"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperB.jpg)",
      }}
    >
      <AdoptedPetContext.Provider value={adoptedPet}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <Suspense
              fallback={
                <div className="h-screen flex items-center justify-center">
                  <h2 className="text-2xl animate-spin">Loading.. 🐶</h2>
                </div>
              }
            >
              <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-blue-400 via-blue-200 to-#f7fcf8 backdrop-blur-md">
                <Link
                  className="text-6xl text-blue-800 hover:text-blue-700 font-comic-sans"
                  to={"/"}
                >
                  Adopt Me!
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </QueryClientProvider>
        </BrowserRouter>
      </AdoptedPetContext.Provider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
