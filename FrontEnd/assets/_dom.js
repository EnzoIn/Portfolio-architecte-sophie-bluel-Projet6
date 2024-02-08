import { getCategories, getWorks } from "./_api.js";

//Variables
export let works = await getWorks();
export const categories = await getCategories();
export const gallery = document.querySelector(".gallery");
export const filterCategories = document.getElementById("filter");
export let currentCategoryId = "0";

//fonction pour créer un projet dans le DOM
export function createWorks(work) {
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

// Fonction pour afficher les projets en fonction de la catégorie
export async function displayPhotos(categoryId = "0") {
  gallery.innerHTML = "";
  const works = await getWorks();
  works.forEach((work) => {
    if (categoryId === "0" || work.categoryId == categoryId) {
      createWorks(work);
    }
  });
  currentCategoryId = categoryId;
}

//Fonction pour créer les bouttons de catégories
export function categoriesButtons() {
  const filter = document.querySelector("#filter");
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

//Fonction pour créer le mode édition
export function editionMod() {
  const logOut = document.querySelector("#loginPage");
  logOut.innerHTML = "logout"

  const editionLogo1 = document.createElement("i");
  editionLogo1.classList.add("fa-regular", "fa-pen-to-square");

  const editionLogo2 = document.createElement("i");
  editionLogo2.classList.add("fa-regular", "fa-pen-to-square");

  const body = document.querySelector("body");

  const headerEditionMod = document.createElement("div");
  headerEditionMod.classList.add("headerEditionMod");
  headerEditionMod.innerHTML = "Mode édition";

  body.prepend(headerEditionMod);
  headerEditionMod.appendChild(editionLogo1);

  const sectionPortfolio = document.querySelector("#portfolio");

  const h2Elem = sectionPortfolio.querySelector("h2");

  const worksEditionMod = document.createElement("div");
  worksEditionMod.classList.add("worksEditionMod");
  worksEditionMod.innerHTML = "modifier";

  h2Elem.insertAdjacentElement("afterend", worksEditionMod);

  worksEditionMod.appendChild(editionLogo2);
}
