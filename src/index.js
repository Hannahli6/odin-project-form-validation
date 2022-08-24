import getKeyByValue from "./getKeyByValue";
import getCountries from "./getCountries";
import addCountryOptions from "./addCountriesOption";
import loggedInPage from "./loggedInPage";

const postalCodes = require("postal-codes-js");

const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", () => checkForms());
addCountryOptions();

const checkForms = () => {
  const emailValidState = getEmailValidState();
  const countryValidState = getCountryValidState();
  const zipCodeValidState = getZipCodeValidState();
  const passwordValidState = getPasswordValidState();
  const confirmPasswordValidState = getConfirmPasswordValidState();

  const forms = [
    emailValidState,
    countryValidState,
    zipCodeValidState,
    passwordValidState,
    confirmPasswordValidState,
  ];
  clearErrorMessage();

  forms.forEach((form, index) => {
    const formEl = document.getElementsByClassName(`${form.type}-form`)[0];
    const input = formEl.childNodes[3];
    if (!form.isValid) {
      input.classList.add("invalid");
      let errorText = document.createElement("span");
      errorText.classList.add("error-message");
      errorText.textContent = form.errorMsg;
      formEl.appendChild(errorText);
    } else {
      input.classList.add("valid");
    }
  });
  const isAllFormValid = forms.every((form)=>form.isValid);
  isAllFormValid? loggedInPage() : null;  
};

const getFormValue = (formType) => {
  const formEl = document.getElementsByClassName(`${formType}-form`)[0];
  const formValue = formEl.childNodes[3].value;
  return formValue;
};

const clearErrorMessage = () => {
  const errorMessages = document.getElementsByClassName("error-message");
  Array.from(errorMessages).forEach((errorMessage) => {
    errorMessage.remove();
  });
};

const getEmailValidState = () => {
  const formValue = getFormValue("email");
  const validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return {
    type: "email",
    isValid: formValue.match(validMailFormat) ? true : false,
    errorMsg: "not a valid email",
  };
};

const getCountryValidState = () => {
  const formValue = getFormValue("country");
  return {
    type: "country",
    isValid: formValue != "--" && formValue != "Unknown Region" ? true : false,
    errorMsg: "not a valid country",
  };
};

const getZipCodeValidState = () => {
  const postalCode = getFormValue("zip-code");
  const select = document.getElementsByName("country")[0];
  const countryCode = getKeyByValue(getCountries(), select.value);
  return {
    type: "zip-code",
    isValid:
      postalCodes.validate(countryCode, postalCode) === true ? true : false,
    errorMsg: "not a valid zip code",
  };
};

const getPasswordValidState = () => {
  const password = getFormValue("password");
  const isPasswordLengthValid = password.length >= 6 && password.length <= 15;
  const hasUpperCase = (string) => string.toLowerCase() != string;
  const hasLowerCase = (string) => string.toUpperCase() != string;
  const hasNumericDigit = (string) => /\d/.test(string);

  return {
    type: "password",
    isValid:
      isPasswordLengthValid &&
      hasUpperCase(password) &&
      hasLowerCase(password) &&
      hasNumericDigit,
    errorMsg:
      "6 - 20 charc that contain at least 1 numeric digit, 1 uppercase and 1 lowercase letter",
  };
};

const getConfirmPasswordValidState = () => {
  const password = getFormValue("password");
  const confirmPassword = getFormValue("confirm-password");
  return {
    type: "confirm-password",
    isValid: confirmPassword === password && confirmPassword !== "",
    errorMsg: "password do not match",
  };
};
