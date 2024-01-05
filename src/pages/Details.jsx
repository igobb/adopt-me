import { useQuery } from "@tanstack/react-query";
import fetchPet from "../fetchers/fetchPet";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import { lazy, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdoptedPetContext from "../context/AdoptedPetContext";

const Modal = lazy(() => import("../modals/Modal"));

const Details = () => {
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  const { id } = useParams();

  const results = useQuery(["details", id], fetchPet);

  const [showModal, setShowModal] = useState(false);

  if (results.isError) {
    return (
      <div>
        <h2>Oh, we have an ERROR</h2>
      </div>
    );
  }

  if (results.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-2xl animate-spin">Loading.. 🐶</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="w-[1100px] mt-0 mb-[25px] mx-auto p-5 rounded-sm shadow-lg bg-gray-200">
      <Carousel images={pet.images} />

      <div>
        <h1 className="text-center text-3xl my-[5px]">{pet.name}</h1>
        <h2 className="text-center mt-[5px] mb-[20px] text-2xl">
          {pet.animal} - {pet.breed} - {pet.city} - {pet.state}
        </h2>
        <button
          className="flex m-auto rounded px-6 py-2 color text-white hover:opacity-80 border-none bg-blue-400"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className="my-2 py-0 px-[15px]">{pet.description}</p>
        {showModal ? (
          <Modal>
            <div className="w-[400px] p-10 text-center rounded-lg bg-[#fbf8f8]">
              <h1 className="text-3xl">Would you like to adopt {pet.name}?</h1>
              <div>
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="inline-block mr-4 hover:text-gray-200 text-2xl hover:bg-green-400 py-1 px-4 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="inline-block mr-4 hover:text-gray-200 text-2xl hover:bg-red-400 py-1 px-4 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
