import { QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "../fetchers/fetchBreedList";
import { Animal } from "../types/APIResponsesTypes";

export default function useBreedList(animal: Animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
}
