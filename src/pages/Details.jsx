import { useQuery } from "@tanstack/react-query";
import fetchPet from "../fetchers/fetchPet";
import Carousel from "../components/Carousel";
import ErrorBoundary from "../components/ErrorBoundary";
import Modal from "../modals/Modal";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdoptedPetContext from "../context/AdoptedPetContext";

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
      <div className="loading-pane">
        <h2 className="loader">@</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="w-[1100px] mt-0 mb-[25px] mx-auto p-5 rounded-sm shadow-lg bg-gray-200">
      <Carousel images={pet.images} />

      <div>
        <h1 className="text-center text-2xl my-[5px]">{pet.name}</h1>
        <h2 className="text-center mt-[5px] mb-[20px]">
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
            <div className="max-w-[500px] p-4 text-center rounded-lg bg-[#faeff0]">
              <h1 className="text-xl">Would you like to adopt {pet.name}?</h1>
              <div>
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="inline-block mr-4 hover:text-green-500"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="inline-block mr-4 hover:text-red-500"
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
