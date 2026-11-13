import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App.jsx";

describe("App", () => {
  it("adds a goal from the form", () => {
    render(<App />);
    fireEvent.change(screen.getByLabelText(/goal title/i), { target: { value: "Write unit tests" } });
    fireEvent.change(screen.getByLabelText(/due date/i), { target: { value: "2099-01-01" } });
    fireEvent.click(screen.getByRole("button", { name: /add goal/i }));
    expect(screen.getByText("Write unit tests")).toBeInTheDocument();
  });

  it("shows a validation error for an empty form", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: /add goal/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/enter a goal title/i);
  });

  it("updates the summary when a goal reaches 100%", () => {
    render(<App />);
    expect(screen.getByTestId("completed")).toHaveTextContent("0");
    fireEvent.change(screen.getByLabelText(/progress for ship the reports page/i), { target: { value: "100" } });
    expect(screen.getByTestId("completed")).toHaveTextContent("1");
  });

  it("filters to overdue goals", () => {
    render(<App />);
    fireEvent.click(screen.getByRole("button", { name: "Overdue" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText(/review q3 feedback/i)).toBeInTheDocument();
  });

  it("deletes a goal", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: "Delete" })[0]);
    expect(screen.queryByText("Ship the reports page")).not.toBeInTheDocument();
  });
});
