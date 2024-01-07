import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Pet from "../components/Pet";
import { StaticRouter } from "react-router-dom/server";

test("displays a default thumbnail", async () => {
  const pet = render(
    <StaticRouter location={"/details/10000"}>
      <Pet
        name={"test"}
        animal={"cat"}
        breed={"testBreed"}
        location={"testLocation"}
        images={[]}
        id={10000}
      />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("none.jpg");

  pet.unmount();
});

test("displays a non-default thumbnail", async () => {
  const pet = render(
    <StaticRouter location={"/details/10000"}>
      <Pet
        name={"test"}
        animal={"cat"}
        breed={"testBreed"}
        location={"testLocation"}
        images={["awesomeCat.jpg", "awesomeCat2.jpg", "awesomeCat3.jpg"]}
        id={10000}
      />
    </StaticRouter>
  );

  const petThumbnail = (await pet.findByTestId(
    "thumbnail"
  )) as HTMLImageElement;

  expect(petThumbnail.src).toContain("awesomeCat.jpg");

  pet.unmount();
});
