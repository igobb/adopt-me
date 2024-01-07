import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Carousel from "../components/Carousel";

test("Click a thumbnail make this one a hero", async () => {
  const images = ["awesomeCat.jpg", "awesomeCat2.jpg", "awesomeCat3.jpg"];

  const carousel = render(<Carousel images={images} />);

  const hero = (await carousel.findByTestId("hero")) as HTMLImageElement;

  expect(hero.src).toContain(images[0]);

  for (let i = 0; i < images.length; i++) {
    const image = images[i];

    const thumb = await carousel.findByTestId(`thumbnail${i}`);

    await Promise.resolve(thumb.click());

    expect(hero.src).toContain(image);

    expect(Array.from(thumb.classList)).toContain("active");
  }

  carousel.unmount();
});
