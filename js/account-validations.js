// js/account-validations.js

document.addEventListener("DOMContentLoaded", () => {
    // Get references to the forms
    const loginForm = document.querySelector(".account-column:nth-child(1) form");
    const registerForm = document.querySelector(".account-column:nth-child(2) form");

    /**
     * Displays a validation message next to an input field.
     * @param {HTMLElement} inputElement The input field that failed validation.
     * @param {string} message The error message to display.
     */
    function showValidationMessage(inputElement, message) {
        // Remove existing messages for this input
        const existingMessage = inputElement.nextElementSibling;
        if (existingMessage && existingMessage.classList.contains("validation-message")) {
            existingMessage.remove();
        }

        const messageElement = document.createElement("p");
        messageElement.classList.add("validation-message");
        messageElement.style.color = "red";
        messageElement.style.fontSize = "0.8em";
        messageElement.style.marginTop = "5px";
        messageElement.textContent = message;
        inputElement.parentNode.insertBefore(messageElement, inputElement.nextSibling);
    }

    /**
     * Clears all validation messages for a given form.
     * @param {HTMLElement} formElement The form to clear messages from.
     */
    function clearValidationMessages(formElement) {
        formElement.querySelectorAll(".validation-message").forEach(msg => msg.remove());
        formElement.querySelector(".form-general-error")?.remove(); // Clear general error too
    }

    /**
     * Displays a general form error message (e.g., "Login failed").
     * @param {HTMLElement} formElement The form where the error occurred.
     * @param {string} message The general error message.
     */
    function showFormGeneralError(formElement, message) {
        clearValidationMessages(formElement); // Clear any specific messages first
        const errorElement = document.createElement("p");
        errorElement.classList.add("form-general-error");
        errorElement.style.color = "red";
        errorElement.style.fontWeight = "bold";
        errorElement.style.marginTop = "10px";
        errorElement.textContent = message;
        formElement.insertBefore(errorElement, formElement.firstChild); // Add at the top of the form
    }

    // --- Login Form Validation ---
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission
            clearValidationMessages(loginForm); // Clear previous messages

            const usernameOrEmailInput = loginForm.querySelector('input[type="text"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');

            let isValid = true;
            let generalLoginError = false; // Flag to show a general login failed message

            // Basic client-side validation for required fields
            if (usernameOrEmailInput.value.trim() === "") {
                showValidationMessage(usernameOrEmailInput, "Username or email address is required.");
                isValid = false;
            }

            if (passwordInput.value.trim() === "") {
                showValidationMessage(passwordInput, "Password is required.");
                isValid = false;
            }

            if (isValid) {
                // --- Simulate Server-Side Validation / Authentication ---
                // In a real application, you would send these credentials to a server
                // and the server would validate them against a database.
                // For this example, we'll use hardcoded values.
                const correctUsername = "user@example.com"; // Or "demo_user"
                const correctPassword = "password123";

                const enteredUsername = usernameOrEmailInput.value.trim();
                const enteredPassword = passwordInput.value.trim();

                if (enteredUsername !== correctUsername) {
                    showValidationMessage(usernameOrEmailInput, "Incorrect username or email.");
                    generalLoginError = true;
                    isValid = false; // Keep isValid false to prevent submission
                }

                if (enteredPassword !== correctPassword) {
                    showValidationMessage(passwordInput, "Incorrect password.");
                    generalLoginError = true;
                    isValid = false; // Keep isValid false to prevent submission
                }

                if (isValid) { // This means credentials match our hardcoded values
                    console.log("Login successful!");
                    alert("Login successful! Redirecting...");
                    // In a real app: window.location.href = "dashboard.html"; or redirect to previous page
                    // loginForm.submit(); // Uncomment this if you want the form to submit normally after successful validation
                } else if (generalLoginError) {
                    // Only show a general "Login failed" if specific errors are already shown
                    // or if it's a generic mismatch without specific field errors.
                    // For this setup, the specific errors are more helpful.
                    showFormGeneralError(loginForm, "Login failed. Please check your credentials.");
                }
            } else {
                // If basic client-side required fields failed
                showFormGeneralError(loginForm, "Please fill in all required fields.");
            }
        });
    }

    // --- Register Form Validation ---
    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission
            clearValidationMessages(registerForm); // Clear previous messages

            const usernameInput = registerForm.querySelector('label:nth-child(1) input[type="text"]');
            const emailInput = registerForm.querySelector('label:nth-child(2) input[type="email"]');
            const passwordInput = registerForm.querySelector('label:nth-child(3) input[type="password"]');

            let isValid = true;
            let messages = []; // Used for general alert, specific messages are shown next to fields

            // Validate Username
            if (usernameInput.value.trim() === "") {
                showValidationMessage(usernameInput, "Username is required.");
                isValid = false;
            }

            // Validate Email Address
            if (emailInput.value.trim() === "") {
                showValidationMessage(emailInput, "Email address is required.");
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                showValidationMessage(emailInput, "Please enter a valid email address.");
                isValid = false;
            }

            // Validate Password
            const minPasswordLength = 6;
            if (passwordInput.value.trim() === "") {
                showValidationMessage(passwordInput, "Password is required.");
                isValid = false;
            } else if (passwordInput.value.trim().length < minPasswordLength) {
                showValidationMessage(passwordInput, `Password must be at least ${minPasswordLength} characters long.`);
                isValid = false;
            }

            if (isValid) {
                // Simulate successful registration
                console.log("Register form submitted successfully!");
                alert("Registration successful! (This is a demo, no actual registration occurred)");
                // registerForm.submit(); // Uncomment this line to allow actual form submission if it's set up
            } else {
                // Only show a general alert if needed, otherwise specific messages are enough
                // alert("Please correct the errors in the form.");
                showFormGeneralError(registerForm, "Please correct the errors to register.");
            }
        });
    }
});