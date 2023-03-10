import { render, screen } from "@testing-library/react";
import Footer from ".";

describe("<Footer/>", () => {
  it("should render the footer text", () => {
    render(<Footer />);

    const footerText = screen.getByRole("contentinfo");
    expect(footerText).toHaveTextContent(/Developed by Pablo Bombonato/i);
  });
});
