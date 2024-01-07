import { Link } from "react-router-dom";
import { Animal } from "../types/APIResponsesTypes";

interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet = ({ name, animal, breed, images, location, id }: IProps) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div className="w-full h-full">
        <img
          data-testid="thumbnail"
          src={hero}
          alt={name}
          className="w-full h-full rounded-sm"
        />
      </div>

      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pl-1 pr-2 pt-1 w-full text-lg">
        <h1 className="font-semibold text-3xl">{name}</h1>
        <h2 className="text-xl">
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
