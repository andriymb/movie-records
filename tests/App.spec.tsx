import { render, screen, within } from "@testing-library/react";
import App from "../src/App";
import userEvent from "@testing-library/user-event";

describe("App Component", () => {
    test("renders the course name somewhere", () => {
        render(<App />);
        const linkElement = screen.getByText(/Movie Records/i);
        expect(linkElement).toBeInTheDocument();
    });
    test("Watch/Unwatch movie button", () => {
        render(<App />);

        const movieSection = screen
            .getByText("Kiki's Delivery Service")
            .closest(".bg-light") as HTMLElement;

        const setWatchedButton1 = within(movieSection).getByRole("button", {
            name: "Mark as watched",
        });
        const setUnwatchedButton1 = within(movieSection).queryByRole("button", {
            name: "Mark as unwatched",
        });
        expect(setWatchedButton1).toBeInTheDocument();
        expect(setUnwatchedButton1).toBeNull();

        userEvent.click(setWatchedButton1);
        const setWatchedButton2 = within(movieSection).queryByRole("button", {
            name: "Mark as watched",
        });
        const setUnwatchedButton2 = within(movieSection).getByRole("button", {
            name: "Mark as unwatched",
        });
        expect(setWatchedButton2).toBeNull();
        expect(setUnwatchedButton2).toBeInTheDocument();

        userEvent.click(setUnwatchedButton2);
        const setWatchedButton3 = within(movieSection).getByRole("button", {
            name: "Mark as watched",
        });
        const setUnwatchedButton3 = within(movieSection).queryByRole("button", {
            name: "Mark as unwatched",
        });
        expect(setWatchedButton3).toBeInTheDocument();
        expect(setUnwatchedButton3).toBeNull();
    });
});
