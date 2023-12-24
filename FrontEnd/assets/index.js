async function fetchDisplayPhotos() {
  try {
    //Récupération des données de l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();

    //Parcourir les données avec un forEach
    data.forEach((photo) => {
      //Création des éléments HTML
      const gallery = document.querySelector(".gallery");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      //Configuration de l'image
      img.src = photo.imageUrl;
      img.alt = photo.titre;

      //Configuration du titre
      figcaption.innerText = photo.title;

      //Ajouter les éléments au DOM
      gallery.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(figcaption);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des données API:", error);
  }
}

//Appel de la fonction
fetchDisplayPhotos();
