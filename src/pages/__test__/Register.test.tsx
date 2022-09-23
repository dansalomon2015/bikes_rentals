import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AuthProvider } from "context/";
import { Register } from "pages/";
import { BrowserRouter } from "react-router-dom";

test("renders email input", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    expect(emailInputEl).toBeInTheDocument();
});

test("renders password input", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );
    const passwordInputEl = screen.getByPlaceholderText("Password");
    expect(passwordInputEl).toBeInTheDocument();
});

test("renders confirm password input", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );

    const confirmPasswordInputEl = screen.getByPlaceholderText(/Confirm Password/i);
    expect(confirmPasswordInputEl).toBeInTheDocument();
});

test("renders button form", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
});

test("renders not visible error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );
    const errorMsg = screen.getByTestId("errorMessageId");
    expect(errorMsg.innerHTML).toBe("");
});

test("renders message email error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );

    const testEmail = "testemail";
    const passwordTest = "12345";

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const confirmPasswordInputEl = screen.getByPlaceholderText(/Confirm Password/i);

    const errorMsg = screen.getByTestId("errorMessageId");

    const buttonEl = screen.getByRole("button");

    fireEvent.change(emailInputEl, { target: { value: testEmail } });
    fireEvent.change(passwordInputEl, { target: { value: passwordTest } });
    fireEvent.change(confirmPasswordInputEl, { target: { value: passwordTest } });
    fireEvent.click(buttonEl);

    expect(errorMsg.textContent).toBe("Invalid email adress !");
});

test("renders password length error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );

    const testEmail = "testemail@gmail.com";
    const passwordTest = "1234";

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const confirmPasswordInputEl = screen.getByPlaceholderText(/Confirm Password/i);

    const errorMsg = screen.getByTestId("errorMessageId");

    const buttonEl = screen.getByRole("button");

    fireEvent.change(emailInputEl, { target: { value: testEmail } });
    fireEvent.change(passwordInputEl, { target: { value: passwordTest } });
    fireEvent.change(confirmPasswordInputEl, { target: { value: passwordTest } });
    fireEvent.click(buttonEl);

    expect(errorMsg.textContent).toBe("Password too short !");
});

test("renders password do no match error", () => {
    render(
        <BrowserRouter>
            <AuthProvider>
                <Register />
            </AuthProvider>
        </BrowserRouter>
    );

    const testEmail = "testemail@gmail.com";
    const passwordTest = "12345";
    const confirmPasswordTest = "123455";

    const emailInputEl = screen.getByPlaceholderText(/Email/i);
    const passwordInputEl = screen.getByPlaceholderText("Password");
    const confirmPasswordInputEl = screen.getByPlaceholderText(/Confirm Password/i);

    const errorMsg = screen.getByTestId("errorMessageId");

    const buttonEl = screen.getByRole("button");

    fireEvent.change(emailInputEl, { target: { value: testEmail } });
    fireEvent.change(passwordInputEl, { target: { value: passwordTest } });
    fireEvent.change(confirmPasswordInputEl, { target: { value: confirmPasswordTest } });
    fireEvent.click(buttonEl);

    expect(errorMsg.textContent).toBe("Passwords do not match!");
});
