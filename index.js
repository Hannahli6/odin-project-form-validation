const submitButton = document.getElementById("submit-btn");

submitButton.addEventListener("click", () => checkForms());

const checkForms = () => {
  const forms = [];
  const emailValidState = getEmailValidState();
  const countryValidState = getCountryValidState();
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

  console.log(getCountries());
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
  
}

const getCountries = (lang = "en") => {
  const A = 65;
  const Z = 90;
  const countryName = new Intl.DisplayNames([lang], { type: "region" });
  const countries = {};
  for (let i = A; i <= Z; ++i) {
    for (let j = A; j <= Z; ++j) {
      let code = String.fromCharCode(i) + String.fromCharCode(j);
      let name = countryName.of(code);
      if (code !== name) {
        countries[code] = name;
      }
    }
  }
  return countries;
};

const addCountryOptions = () => {
  const select = document.getElementsByName("country")[0];
  const countries = Object.values(getCountries())
  for(let i = 0; i< countries.length; i++ ){
    let country = countries[i]
    const option = document.createElement("option");
    option.value = country;
    option.innerHTML = country;
    select.appendChild(option);
  }
};
addCountryOptions();
