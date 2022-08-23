import getCountries from "./getCountries";
const addCountryOptions = () => {
  const select = document.getElementsByName("country")[0];
  const countries = Object.values(getCountries());
  for (let i = 0; i < countries.length; i++) {
    let country = countries[i];
    const option = document.createElement("option");
    option.value = country;
    option.innerHTML = country;
    select.appendChild(option);
  }

};
export default addCountryOptions;