//Fonction pour récupérer les API
async function postUser(email, password) {
  const requestBody = {
    email: email,
    password: password,
  };
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
      const responseData = await response.json();
      console.log("Autthentification réussie:", responseData);
      return responseData;
    } else {
      console.error("Échec de l'authentification:", response.status);
    }
  } catch (error) {
    console.error("Une erreur s'est produite,", error);
  }
}

const sendRequest = document.querySelector("#sendRequest");

sendRequest.addEventListener("click", async (event) => {
  event.preventDefault();
  const inputEmail = document.querySelector("#email").value;
  const inputPassword = document.querySelector("#password").value;
  try {
    const responseData = await postUser(inputEmail, inputPassword);
    if (responseData && responseData.token) {
      sessionStorage.setItem("token", responseData.token);
      window.location.href = "./index.html";
    } else {
      console.error("La réponse ne contient pas de token valide");
      return error;
    }
  } catch (error) {
    console.error("Une erreur s'est produite :", error);
    window.alert("Identifiant ou mot de passe incorrect");
  }
});

//postUser("sophie.bluel@test.tld", "S0phie");
