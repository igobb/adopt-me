import { createRoot } from "react-dom/client";
import SearchParams from "./pages/SearchParams.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details.jsx";
import { useState } from "react";
import AdoptedPetContext from "./context/AdoptedPetContext.js";

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
          </QueryClientProvider>
        </BrowserRouter>
      </AdoptedPetContext.Provider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
