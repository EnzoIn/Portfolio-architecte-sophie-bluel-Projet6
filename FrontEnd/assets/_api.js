//Fonction pour récupérer les API
//***** Page login.js *****//
export async function postUser(email, password) {
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

//***** Page index.js *****//
export async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

export async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

export async function deleteWorks(workId, authToken) {
  let errorResponse;
  try {
    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: "DELETE",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      if (response.status === 204) {
        return;
      }
    } else {
      errorResponse = await response.status;
      console.error("Erreur de suppression du projet :", errorResponse);
      throw new Error(
        `Erreur lors de la suppression du projet (status ${response.status})`
      );
    }
  } catch (error) {
    if (errorResponse === 401) {
      window.location.href = "./login.html";
      sessionStorage.clear();
    }
    console.error("Erreur lors de la suppression du projet :", error.message);
    throw error;
  }
}

export async function postWorks(image, title, category, authToken) {
  let errorResponse;
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", category);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });
    if (!response.ok) {
      errorResponse = await response.status;
      console.error("Erreur lors de l'ajout de projet :", errorResponse);
      throw new Error(
        `Erreur lors de l'ajout du projet (status ${response.status})`
      );
    }
  } catch (error) {
    if (errorResponse === 401) {
      window.location.href = "./login.html";
      sessionStorage.clear();
    }
    console.error("Erreur lors de l'ajout du projet :", error.message);
    throw error;
  }
}
