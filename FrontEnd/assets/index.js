import { deleteWorks, postWorks } from "./_api.js";

import {
  categoriesButtons,
  currentCategoryId,
  displayPhotos,
  editionMod,
  filterCategories,
  gallery,
} from "./_dom.js";

import {
  alertAddDelete,
  displayModalWorks,
  modalWorks,
  modalWorksAdd,
} from "./_modal.js";

//Événement au click pour changer de catégorie
filterCategories.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    const buttons = filterCategories.querySelectorAll("li");
    const categoryId = event.target.id;

    buttons.forEach((btn) => {
      btn.classList.remove("focusBtnFilter");
    });

    event.target.classList.add("focusBtnFilter");
    gallery.innerHTML = "";

    displayPhotos(categoryId);
  }
});

//Événement au click pour aller à la page login.html
const loginPage = document.querySelector("#loginPage");
loginPage.addEventListener("click", () => {
  window.location.href = "./login.html";
});

displayPhotos();
categoriesButtons();

//****** ESPACE CONNECTÉ ******/
//Fonction et événement quand on est connecté
if (sessionStorage.getItem("token")) {
  
  editionMod();

  //Événement au click pour accéder à la modification de projet
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
      if (workId && authToken && authToken !== "") {
        await deleteWorks(workId, authToken);
        displayModalWorks();
        gallery.innerHTML = "";
        displayPhotos(currentCategoryId);
        alertAddDelete();
      }else {
        window.location.href = "./login.html";
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
      window.location.href = "./login.html";
    }
    if (event.target === btnAdd && btnAdd.disabled) {
      const alertElement = document.querySelector("#alertAddDelete");
      alertElement.innerHTML =
        "Veuillez remplir tous les champs du formulaire.";
      alertElement.style.background = "red";
      alertAddDelete();
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

      await postWorks(imageFile, title, categoryId, authToken);

      previewImageInput.value = "";
      formSelectInput.value = "";
      formTitleInput.value = "";

      const modalAdd = document.querySelector("#modalWorksAdd");
      if (modalAdd) {
        modalAdd.remove();
      }
      modalWorksAdd();
      alertAddDelete();
      gallery.innerHTML = "";
      displayPhotos(currentCategoryId);
    }
  });
}