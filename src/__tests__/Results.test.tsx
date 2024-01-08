import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import Results from "../components/Results";
import { StaticRouter } from "react-router-dom/server";
import { pets } from "./helpers/ArrayOfPets";

test("renders correct with no pest", () => {
  const { asFragment } = render(<Results pets={[]} />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-lg"
      >
        <h1>
          No pets found!
        </h1>
      </div>
    </DocumentFragment>
  `);
});

test("renders correctly with some pets", () => {
  const { asFragment } = render(
    <StaticRouter location={"/"}>
      <Results pets={pets} />
    </StaticRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
