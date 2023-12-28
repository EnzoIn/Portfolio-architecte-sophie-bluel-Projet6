//Fonction pour récupérer les API
async function getWorks() {
  const reponse = await fetch("http://localhost:5678/api/works");
  return await reponse.json();
}

async function getCategories() {
  const reponse = await fetch("http://localhost:5678/api/categories");
  return await reponse.json();
}

//Variables
const works = await getWorks();
const categories = await getCategories();
const gallery = document.querySelector(".gallery");
const filter = document.querySelector("#filter");

//fonction pour créer un projet dans le DOM
function createWorks(work) {
  //Création des éléments HTML
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  //Configuration de l'image
  img.src = work.imageUrl;
  img.alt = work.titre;
  //Configuration du titre
  figcaption.innerText = work.title;
  //Ajout des éléments au DOM
  gallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
}

//Fonction pour afficher les projets
async function displayPhotos() {
  //Parcourir les données avec un forEach
  works.forEach((work) => {
    //Appel de la fonction
    createWorks(work);
  });
}

//Fonction pour créer les bouttons de catégories
async function categoriesButtons() {
  //Parcourir les données avec un forEach
  categories.forEach((category) => {
    //Création des éléments HTML
    const filterBtn = document.createElement("li");
    //Configuration des titres et ID des bouttons
    filterBtn.innerText = category.name;
    filterBtn.id = category.id;
    //Ajout des éléments au DOM
    filter.appendChild(filterBtn);
  });
}

//Fonction pour trier les projets au click sur les bouttons
async function categoriesSort() {
    //Récupération des bouttons #filtre li
  const buttons = document.querySelectorAll("#filter li");
  //Parcourir les données avec un forEach
  buttons.forEach((button) => {
    //Appliquer un événement au click
    button.addEventListener("click", (e) => {
        //Au click récupération de l'ID du button
      const filterBtnID = e.target.id;
      //Suppression du contenu de .gallery
      gallery.innerHTML = "";
    //Utilisation d'un "if" si filterBtn est différent de "0"
      if (filterBtnID !== "0") {
        // La variables workSort permet de filtrer l'ID des projets avec l'ID de filterBtn
        const workSort = works.filter((work) => work.categoryId == filterBtnID);
         //Parcourir les données avec un forEach
        workSort.forEach((work) => {
            //Appel de la fonction
          createWorks(work);
        });
      } else {
        //Sinon appel de la fonction pour afficher tous les projets
        displayPhotos();
      }
    });
  });
}

//Appel des fonctions
displayPhotos();
categoriesButtons();
categoriesSort();