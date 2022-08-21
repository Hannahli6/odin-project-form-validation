const formsElement = document.getElementsByClassName("form");
const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", () => checkForms());

const checkForms = () => {
  const forms = [];
  const emailValidState = getEmailValidState();
  forms.push(emailValidState);

  clearErrorMessage();

  forms.forEach((form) => {
    if (!form.isValid) {
      const formEl = document.getElementsByClassName(`${form.type}-form`)[0];
      let errorText = document.createElement("span");
      errorText.classList.add("error-message");
      errorText.textContent = form.errorMsg;
      formEl.appendChild(errorText);
    }
  });
};

const getFormValue = (formType) => {
  const formEl = document.getElementsByClassName(`${formType}-form`)[0];
  const formValue = formEl.childNodes[3].value;
  return formValue;
};

const clearErrorMessage = () => {
  const errorMessages = document.getElementsByClassName("error-message");
  Array.from(errorMessages).forEach((errorMessage)=>{
    errorMessage.remove();
  })
}

const getEmailValidState = () => {
  const formValue = getFormValue("email");
  const validMailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return {
    type: "email",
    isValid: formValue.match(validMailFormat) ? true : false,
    errorMsg: "not a valid email",
  };
};


