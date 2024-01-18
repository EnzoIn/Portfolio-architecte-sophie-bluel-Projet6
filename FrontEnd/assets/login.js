//Fonction pour récupérer les API
async function postUser(email, password) {
  const requestBody = {
    email: email,
    password: password,
  };
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify(requestBody),
    headers: { "content-type": "application/json" },
  });
  if (response.ok) {
    const responseData = await response.json();
    return responseData;
  }
}

//Fonction pour créer un message d'alerte en cas d'identifiant ou de mot de passe erroné
function alertPassword() {
  const form = document.querySelector("form");
  const alertPasswordLocation = document.createElement("div");
  alertPasswordLocation.id = "alertPassword";
  alertPasswordLocation.innerHTML =
    "Erreur dans l’identifiant ou le mot de passe !";
  form.insertBefore(alertPasswordLocation, form.firstChild);
}

//Événement au click pour se connecter au site
sendRequest.addEventListener("click", async (event) => {
  const sendRequest = document.querySelector("#sendRequest");
  event.preventDefault();
  try {
    const inputEmail = document.querySelector("#email").value;
    const inputPassword = document.querySelector("#password").value;
    const responseData = await postUser(inputEmail, inputPassword);
    if (responseData && responseData.token) {
      sessionStorage.setItem("token", responseData.token);
      window.location.href = "./index.html";
    } else {
      alertPassword();
      return error;
    }
  } catch (error) {
    console.error("Échec de l'authentification", error.message);
  }
});

//postUser("sophie.bluel@test.tld", "S0phie");
