//Fonction pour récupérer les API
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function deleteWorks(workId, authToken) {
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
      const result = await response.json();
      console.log("Projet supprimé", result);
    } else {
      console.error("Erreur de suppression du projet :", errorResponse);
      throw new Error(
        `Erreur lors de la suppression du projet (status ${response.status})`
      );
    }
  } catch (error) {
    throw error;
  }
}

async function postWorks(image, title, category, authToken) {
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
    if (response.ok) {
      const result = await response.json();
      console.log("Projet ajouté", result);
    } else {
      const errorResponse = await response.json();
      console.error("Erreur lors de l'ajout de projet :", errorResponse);
      throw new Error(
        `Erreur lors de l'ajout du projet (status ${response.status})`
      );
    }
  } catch (error) {
    throw error;
  }
}

//Variables
const works = await getWorks();
const categories = await getCategories();
const gallery = document.querySelector(".gallery");
const filter = document.querySelector("#filter");

//fonction pour créer un projet dans le DOM
function createWorks(work) {
  const figure = document.createElement("figure");
  const workId = gallery.children.length + 1;
  figure.id = `containerWork${workId}`;
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.alt = work.title;
  figcaption.innerText = work.title;
  gallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
}

//Fonction pour afficher les projets
async function displayPhotos() {
  try {
    const works = await getWorks();
    works.forEach((work) => {
      createWorks(work);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

//Fonction pour créer les bouttons de catégories
function categoriesButtons() {
  const liTous = document.createElement("li");
  liTous.innerHTML = "Tous";
  liTous.classList.add("focusBtnFilter");
  liTous.id = 0;
  filter.appendChild(liTous);

  categories.forEach((category) => {
    const filterBtn = document.createElement("li");
    filterBtn.innerText = category.name;
    filterBtn.id = category.id;
    filter.appendChild(filterBtn);
  });
}

// Fonction pour trier les projets au click sur les boutons
function categoriesSort() {
  const buttons = document.querySelectorAll("#filter li");

  buttons.forEach((button) => {
    button.addEventListener("click", async (event) => {
      const filterBtnID = event.target.id;
      buttons.forEach((btn) => {
        btn.classList.remove("focusBtnFilter");
      });
      event.target.classList.add("focusBtnFilter");
      gallery.innerHTML = "";
      try {
        const works = await getWorks();
        // Utilisation d'un "if" si filterBtn est différent de "Tous"
        if (filterBtnID !== "0") {
          // La variable workSort permet de filtrer l'ID des projets avec l'ID de filterBtn
          const workSort = works.filter(
            (work) => work.categoryId == filterBtnID
          );
          workSort.forEach((work) => {
            createWorks(work);
          });
        } else {
          // Afficher tous les projets
          displayPhotos();
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des travaux :", error);
      }
    });
  });
}

//Fonction pour créer le mode édition
function editionMod() {
  //Logo mode édition
  const editionLogo1 = document.createElement("i");
  editionLogo1.classList.add("fa-regular", "fa-pen-to-square");

  const editionLogo2 = document.createElement("i");
  editionLogo2.classList.add("fa-regular", "fa-pen-to-square");

  //Header mode édition
  const body = document.querySelector("body");

  const headerEditionMod = document.createElement("div");
  headerEditionMod.classList.add("headerEditionMod");
  headerEditionMod.innerHTML = "Mode édition";

  body.prepend(headerEditionMod);
  headerEditionMod.appendChild(editionLogo1);

  //Projet mode édition
  const sectionPortfolio = document.querySelector("#portfolio");

  const h2Elem = sectionPortfolio.querySelector("h2");

  const worksEditionMod = document.createElement("div");
  worksEditionMod.classList.add("worksEditionMod");
  worksEditionMod.innerHTML = "modifier";

  h2Elem.insertAdjacentElement("afterend", worksEditionMod);

  worksEditionMod.appendChild(editionLogo2);
}

function modalCreateWorks(work) {
  const modalGallery = document.querySelector("#modalGallery");

  const containerWork = document.createElement("div");
  containerWork.classList.add("containerWork");

  const img = document.createElement("img");
  img.src = work.imageUrl;

  const trashIcon = document.createElement("i");
  trashIcon.dataset.workId = work.id;
  trashIcon.classList.add("fa-solid", "fa-trash-can");

  containerWork.appendChild(trashIcon);
  modalGallery.appendChild(containerWork);
  containerWork.appendChild(img);
  containerWork.appendChild(trashIcon);
}

async function displayModalWorks() {
  try {
    const works = await getWorks();

    const modalGallery = document.querySelector("#modalGallery");
    modalGallery.innerHTML = "";

    works.forEach((work) => {
      modalCreateWorks(work);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des travaux :", error);
  }
}

//Modale galerie photo
function modalWorks() {
  //Arrière de la modale
  const body = document.querySelector("body");
  const modalBackground = document.createElement("div");
  modalBackground.id = "modalBackground";

  //Modale
  const modalWorks = document.createElement("dialog");
  modalWorks.id = "modalWorks";
  modalBackground.appendChild(modalWorks);

  const modalIconBack = document.createElement("i");
  modalIconBack.classList.add("fa-solid", "fa-xmark");

  const modalTitle = document.createElement("h2");
  modalTitle.innerHTML = "Galerie photo";

  const modalGallery = document.createElement("div");
  modalGallery.id = "modalGallery";

  const modalHr = document.createElement("hr");

  const modalAdd = document.createElement("div");
  modalAdd.id = "modalAdd";
  modalAdd.innerHTML = "Ajouter une photo";

  modalWorks.append(modalIconBack, modalTitle, modalGallery, modalHr, modalAdd);
  body.prepend(modalBackground);
}

//Événement au click pour aller à la page login.html
const loginPage = document.querySelector("#loginPage");
loginPage.addEventListener("click", () => {
  window.location.href = "./login.html";
});

//function pour prévisualiser l'image
const previewImage = () => {
  const input = document.querySelector("#uploadImage");
  const preview = document.querySelector("#previewImage img");
  const file = input.files;

  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      preview.setAttribute("src", event.target.result);
    };

    const iconDisplay = document.querySelector("#iconDisplay");
    const pDisplay = document.querySelector("#pDisplay");
    const spanDisplay = document.querySelector("#spanDisplay");
    const imgDisplay = document.querySelector("#imgPreview");

    if (iconDisplay || pDisplay || spanDisplay) {
      iconDisplay.style.display = "none";
      pDisplay.style.display = "none";
      spanDisplay.style.display = "none";
      imgDisplay.style.display = "block";
    }

    fileReader.readAsDataURL(file[0]);
  }
};

//Fonction pour valider le formulaire
function formValid() {
  const previewImageInput = document.querySelector("#uploadImage");
  const formSelectInput = document.querySelector("#select");
  const formTitleInput = document.querySelector("#title");
  const btnAdd = document.querySelector("#btnAdd");
  if (
    previewImageInput.files.length > 0 &&
    formSelectInput.value.trim() !== "" &&
    formTitleInput.value.trim() !== ""
  ) {
    btnAdd.disabled = false;
    btnAdd.style.backgroundColor = "green";
    btnAdd.style.cursor = "pointer";
  } else {
    btnAdd.disabled = true;
  }
  console.log(btnAdd.disabled);
}

//Fonction pour créer le formulaire de la modale d'ajout de photo
function createFormModal() {
  const form = document.createElement("form");

  const fileLabel = document.createElement("label");
  fileLabel.id = "previewImage";
  fileLabel.htmlFor = "uploadImage";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.id = "uploadImage";
  fileInput.addEventListener("change", previewImage);

  const imagePreview = document.createElement("img");
  imagePreview.src = "";
  imagePreview.id = "imgPreview";

  const iconImage = document.createElement("i");
  iconImage.classList.add("fa-regular", "fa-image");
  iconImage.id = "iconDisplay";

  const paraText = document.createElement("p");
  paraText.innerHTML = "+ Ajouter photo";
  paraText.id = "pDisplay";

  const spanText = document.createElement("span");
  spanText.textContent = "jpg, png : 4mo max";
  spanText.id = "spanDisplay";

  fileLabel.append(fileInput, imagePreview, iconImage, paraText, spanText);

  const titleLabel = document.createElement("label");

  titleLabel.textContent = "Titre";
  titleLabel.classList.add("labelTitle");

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";

  const selectLabel = document.createElement("label");

  selectLabel.textContent = "Catégorie";

  const selectInput = document.createElement("select");
  selectInput.id = "select";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  selectInput.appendChild(defaultOption);

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.text = category.name;
    selectInput.appendChild(option);
  });

  form.append(fileLabel, titleLabel, titleInput, selectLabel, selectInput);

  fileInput.addEventListener("change", formValid);
  titleInput.addEventListener("input", formValid);
  selectInput.addEventListener("input", formValid);

  return form;
}

//Modale galerie photo
function modalWorksAdd() {
  const modalBackground = document.querySelector("#modalBackground");

  const modalWorksAdd = document.createElement("dialog");
  modalWorksAdd.id = "modalWorksAdd";

  const modalIconBack = document.createElement("i");
  modalIconBack.classList.add("fa-solid", "fa-xmark");

  const modalIconPrevious = document.createElement("i");
  modalIconPrevious.classList.add("fa-solid", "fa-arrow-left");

  const modalTitle = document.createElement("h2");
  modalTitle.innerHTML = "Ajout photo";

  const formModal = createFormModal();

  const modalHr = document.createElement("hr");

  const modalAdd = document.createElement("div");
  modalAdd.id = "btnAdd";
  modalAdd.innerHTML = "Valider";

  modalWorksAdd.append(
    modalIconPrevious,
    modalIconBack,
    modalTitle,
    formModal,
    modalHr,
    modalAdd
  );

  modalBackground.appendChild(modalWorksAdd);
}

displayPhotos();
categoriesButtons();
categoriesSort();
//Fonction et événement quand on est connecté
if (sessionStorage.getItem("token")) {
  editionMod();

  //Événement au click pour modifier ou ajouter des projets
  const editWorks = document.querySelector(".worksEditionMod");
  editWorks.addEventListener("click", () => {
    modalWorks();
    displayModalWorks();
  });

  //Événement au click pour quitter la modale
  document.addEventListener("click", (event) => {
    const modalBackground = document.querySelector("#modalBackground");
    if (
      (event.target.tagName === "I" &&
        event.target.classList.contains("fa-xmark")) ||
      event.target === modalBackground
    ) {
      modalBackground.remove();
    }
  });

  //Événement au click pour supprimer un projet
  document.addEventListener("click", async (event) => {
    if (
      event.target.tagName === "I" &&
      event.target.classList.contains("fa-trash-can")
    ) {
      const workId = event.target.dataset.workId;
      const authToken = sessionStorage.getItem("token");
      if (workId && authToken) {
        try {
          await deleteWorks(workId, authToken);
          await displayModalWorks();
          gallery.innerHTML = "";
          await displayPhotos();
          console.log(`Projet avec l'ID ${workId} supprimé avec succès.`);
        } catch (error) {
          console.error(
            "Erreur lors de la suppression du projet :",
            error.message
          );
        }
      }
    }
  });

  //Événement au click pour afficher la modale d'ajout de photo
  document.addEventListener("click", (event) => {
    const modalWorks = document.querySelector("#modalWorks");
    const modalAdd = document.querySelector("#modalAdd");
    if (event.target === modalAdd) {
      modalWorks.remove();
      modalWorksAdd();
    }
  });

  //Événement au click pour afficher la modale précédente
  document.addEventListener("click", (event) => {
    const modalBackground = document.querySelector("#modalBackground");
    if (
      event.target.tagName === "I" &&
      event.target.classList.contains("fa-arrow-left")
    ) {
      modalBackground.remove();
      modalWorks();
      displayModalWorks();
    }
  });

  //Événement au click pour poster un nouveau projet
  document.addEventListener("click", async (event) => {
    const btnAdd = document.querySelector("#btnAdd");
    const authToken = sessionStorage.getItem("token");
    if (!authToken) {
      console.error("L'utilisateur n'est pas correctement authentifié.");
      return;
    }
    if (
      event.target === btnAdd &&
      btnAdd.disabled !== undefined &&
      !btnAdd.disabled
    ) {
      const previewImageInput = document.querySelector("#uploadImage");
      const formSelectInput = document.querySelector("#select");
      const formTitleInput = document.querySelector("#title");

      const imageFile = previewImageInput.files[0];
      const categoryId = formSelectInput.value;
      const title = formTitleInput.value;

      if (!imageFile || !categoryId || !title) {
        console.error("Veuillez remplir tous les champs.");
        return;
      }
      try {
        await postWorks(imageFile, title, categoryId, authToken);
        console.log("Le projet est posté.");
        modalWorksAdd();
        gallery.innerHTML = "";
        await displayPhotos();
      } catch (error) {
        console.error("Erreur lors du post du projet :", error.message);
      }
    }
  });
}
