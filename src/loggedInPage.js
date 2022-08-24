const loggedInPage = () =>{
  document.body.innerHTML = "";
  const loggedInMsg = document.createElement("h1");
  loggedInMsg.textContent = "You logged in!"
  document.body.appendChild(loggedInMsg);
}

export default loggedInPage;