import { useQuery } from "@tanstack/react-query";
import Results from "../components/Results";
import useBreedList from "../hooks/useBreedList";
import fetchSearch from "../fetchers/fetchSearch";
import { useContext, useState, Fragment } from "react";
import AdoptedPetContext from "../context/AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [adoptedPet] = useContext(AdoptedPetContext);

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);

  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };

          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <Fragment>
            <div style={{ textAlign: "center" }}>
              <h2 className="text-2xl">Recently adopted: {adoptedPet.name}</h2>
            </div>
            <div className="pet w-[150px] h-[150px] mx-0 my-20px block">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          </Fragment>
        ) : null}

        <label htmlFor="location" className="text-center">
          Location
          <input
            id="location"
            name="location"
            placeholder="Location"
            type="text"
            className="search-input"
          />
        </label>

        <label htmlFor="animal" className="text-center">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
            className="search-input"
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed" className="text-center">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            name="breed"
            className="search-input grayed-out-disabled"
          >
            {breeds.length ? null : (
              <option value="" disabled selected hidden>
                Please Choose animal first
              </option>
            )}
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button className="rounded px-6 py-2 color text-white hover:opacity-80 border-none bg-blue-400">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
