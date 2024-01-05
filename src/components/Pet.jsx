import { Link } from "react-router-dom";

const Pet = ({ name, animal, breed, images, location, id }) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";

  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block ">
      <div className="w-full h-full">
        <img src={hero} alt={name} className="w-full h-full rounded-sm" />
      </div>

      <div className="absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pl-1 pr-2 pt-2 w-full text-lg">
        <h1 className="font-semibold">{name}</h1>
        <h2>
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
