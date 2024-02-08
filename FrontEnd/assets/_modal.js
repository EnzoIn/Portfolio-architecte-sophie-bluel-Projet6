import { getWorks } from "./_api.js";
import { categories } from "./_dom.js";
let works = [];

export function modalCreateWorks(work) {
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

export async function displayModalWorks() {
  const modalGallery = document.querySelector("#modalGallery");
  modalGallery.innerHTML = "";
  works = await getWorks();
  works.forEach((work) => {
    modalCreateWorks(work);
  });
}

//Fonction pour afficher un message d'alerte quand un projet est supprimé ou ajouté
export function alertAddDelete() {
  const alertDiv = document.querySelector("#alertAddDelete");
  alertDiv.style.display = "block";
  setTimeout(() => {
    alertDiv.style.display = "none";
  }, 2000);
}

//Modale galerie photo
export function modalWorks() {
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

  const alert = document.createElement("div");
  alert.innerHTML = "Suppression réussie !";
  alert.id = "alertAddDelete";

  const modalGallery = document.createElement("div");
  modalGallery.id = "modalGallery";

  const modalHr = document.createElement("hr");

  const modalAdd = document.createElement("div");
  modalAdd.id = "modalAdd";
  modalAdd.innerHTML = "Ajouter une photo";

  modalWorks.append(
    modalIconBack,
    modalTitle,
    alert,
    modalGallery,
    modalHr,
    modalAdd
  );
  body.prepend(modalBackground);
}

//function pour prévisualiser l'image
export const previewImage = () => {
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

// Fonction pour activer/désactiver le bouton en fonction de la validation du formulaire
export function toggleSubmitButton() {
  const previewImageInput = document.querySelector("#uploadImage");
  const formSelectInput = document.querySelector("#select");
  const formTitleInput = document.querySelector("#title");
  const btnAdd = document.querySelector("#btnAdd");

  const formValid =
    previewImageInput.files.length > 0 &&
    formSelectInput.value.trim() !== "" &&
    formTitleInput.value.trim() !== "";

  btnAdd.disabled = !formValid;

  btnAdd.classList.toggle("enabled", formValid);
}

//Fonction pour créer le formulaire de la modale d'ajout de photo
export function createFormModal() {
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

  fileInput.addEventListener("change", toggleSubmitButton);
  titleInput.addEventListener("input", toggleSubmitButton);
  selectInput.addEventListener("input", toggleSubmitButton);

  return form;
}

//Modale galerie photo
export function modalWorksAdd() {
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

  const alert = document.createElement("div");
  alert.innerHTML = "La photo a été ajoutée avec succès !";
  alert.id = "alertAddDelete";

  const modalAdd = document.createElement("div");
  modalAdd.id = "btnAdd";
  modalAdd.innerHTML = "Valider";

  modalWorksAdd.append(
    modalIconPrevious,
    modalIconBack,
    modalTitle,
    formModal,
    modalHr,
    alert,
    modalAdd
  );

  modalBackground.appendChild(modalWorksAdd);
}