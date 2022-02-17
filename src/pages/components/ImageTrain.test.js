import ImageTrain from "./ImageTrain";
import { render, screen } from "@testing-library/react";

test("should first", () => {
  render(<ImageTrain />);

  screen.debug();
});
