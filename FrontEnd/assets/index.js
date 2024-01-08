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
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = work.imageUrl;
  img.alt = work.titre;
  figcaption.innerText = work.title;
  gallery.appendChild(figure);
  figure.appendChild(img);
  figure.appendChild(figcaption);
}

//Fonction pour afficher les projets
function displayPhotos() {
  works.forEach((work) => {
    createWorks(work);
  });
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

//Fonction pour trier les projets au click sur les bouttons
function categoriesSort() {
  const buttons = document.querySelectorAll("#filter li");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const filterBtnID = e.target.id;
      buttons.forEach((btn) => {
        btn.classList.remove("focusBtnFilter");
      });
      e.target.classList.add("focusBtnFilter");
      gallery.innerHTML = "";
      //Utilisation d'un "if" si filterBtn est différent de "Tous"
      if (filterBtnID !== "0") {
        // La variables workSort permet de filtrer l'ID des projets avec l'ID de filterBtn
        const workSort = works.filter((work) => work.categoryId == filterBtnID);
        workSort.forEach((work) => {
          createWorks(work);
        });
      } else {
        displayPhotos();
      }
    });
  });
}

displayPhotos();
categoriesButtons();
categoriesSort();
