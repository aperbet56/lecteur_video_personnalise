// Récupération de l'élément HTML5 <main>
const main = document.querySelector(".main__content");

// Création de l'élément HTML5 <section> et ajout dans le DOM
const container = document.createElement("section");
container.setAttribute("class", "container");
main.appendChild(container);

// Création de l'élément HTML5 <div> et ajout dans le DOM
const containerVideo = document.createElement("div");
containerVideo.setAttribute("class", "container__video");
container.appendChild(containerVideo);

// Création de l'élément HTML5 <video> et ajout dans le DOM
const video = document.createElement("video");
video.setAttribute("src", "video/video.mp4");
containerVideo.appendChild(video);

// Création de l'élément HTML5 <div> pour la barre de controle et ajout dans le DOM
const controls = document.createElement("div");
controls.setAttribute("class", "controls");
containerVideo.appendChild(controls);

// Création de l'élément HTML5 <progress> et ajout dans le DOM
const progressBar = document.createElement("progress");
progressBar.setAttribute("class", "progress__bar");
progressBar.setAttribute("aria-label", "Barre de progression de la vidéo");
progressBar.setAttribute("min", 0);
progressBar.setAttribute("max", video.duration);
progressBar.value = 0;
controls.appendChild(progressBar);

// Création de l'élément HTML5 <div> et ajout dans le DOM
const containerBtns = document.createElement("div");
containerBtns.setAttribute("class", "container__btns");
controls.appendChild(containerBtns);

// Création de l'élément HTML5 <div> pour le bouton play / pause et ajout dans le DOM
const playPauseBtn = document.createElement("div");
playPauseBtn.setAttribute("class", "pause__play");
playPauseBtn.setAttribute(
  "aria-label",
  "Bouton pour jouer ou mettre en pause la vidéo"
);
containerBtns.appendChild(playPauseBtn);

// Création de l'élément HTML5 <div> pour le bouton mute et ajout dans le DOM
const muted = document.createElement("div");
muted.setAttribute("class", "muted");
playPauseBtn.setAttribute(
  "aria-label",
  "Bouton pour couper le son de la vidéo"
);
muted.textContent = "Mute";
containerBtns.appendChild(muted);

// Création de l'élément HTML5 <input> et ajout dans le DOM
const volumeBtn = document.createElement("input");
volumeBtn.setAttribute("type", "range");
volumeBtn.setAttribute("min", 0);
volumeBtn.setAttribute("max", 100);
volumeBtn.setAttribute("value", 50);
volumeBtn.setAttribute("class", "volum");
containerBtns.appendChild(volumeBtn);

// Création de l'élément HTML5 <div> pour le bouton plein écran et ajout dans le DOM
const fullscreen = document.createElement("div");
fullscreen.setAttribute("class", "fullscreen");
containerBtns.appendChild(fullscreen);

/* Fonctions */

// Déclaration de la fonction TimerProgression qui va afficher la progression de la vidéo
const timerProgression = () => {
  progressBar.value = video.currentTime / video.duration;

  // Condition if qui va vérifier si la vidéo est terminée
  if (video.ended) {
    //Si oui, retrait de la classe "pause" et modification de l'image
    playPauseBtn.classList.remove("pause");
    playPauseBtn.style.backgroundImage = "url(img/play.svg)";
  }
};

// Déclaration de la fonction changeTime qui va permettre de faire des bonds dans le temps
const changeTime = (e) => {
  let bar = progressBar.getBoundingClientRect();
  let barWidth = bar.width;

  let positionClick = e.clientX - bar.left;
  let widthPercent = positionClick / barWidth;

  video.currentTime = video.duration * widthPercent;
};

// Déclarattion de la fonction playPause qui ve permettre de jouer et/ou mettre en pause la vidéo
const playPause = () => {
  playPauseBtn.classList.toggle("pause");

  // Condition if... else
  if (playPauseBtn.classList.contains("pause")) {
    video.play();
  } else {
    video.pause();
  }
};

// Déclaration de la fonction muteOrNot qui va permettre de couper et remettre le son
const muteOrNot = () => {
  // Condition if... else
  if (muted.textContent === "Mute") {
    muted.textContent = "Unmute";
    video.muted = true;
  } else {
    muted.textContent = "Mute";
    video.muted = false;
  }
};

// Déclaration de la fonction volumModification qui va permettre d'augmenter et/ou baisser le volume
const volumModification = () => {
  volumeBtn.setAttribute("value", volumeBtn.value);
  video.volume = volumeBtn.value / 100;
};

// Déclaration de la fonction screenModification qui va permettre de passer en plein écran ou revenir à la taille normale
const screenModification = () => {
  // Condition if... else
  if (containerVideo.requestFullscreen()) {
    document.exitFullscreen();
  } else {
    containerVideo.requestFullscreen();
  }
};

/* Ecouteurs d'événement */

// Ecoute de l'événement "timeupdate" et appel de la fonction timerProgression
video.addEventListener("timeupdate", timerProgression);
// Ecoute de l'événement "click" et appel de la fonction changeTime
progressBar.addEventListener("click", changeTime);
// Ecoute de l'événement "click" et appel de la fonction playPause
playPauseBtn.addEventListener("click", playPause);
// Ecoute de l'événement "click" et appel de la fonction muteOrNot
muted.addEventListener("click", muteOrNot);
// Ecoute de l'événement "input" et appel de la fonction VolumModification
volumeBtn.addEventListener("input", volumModification);
// Ecoute de l'événement "click" et appel de la fonction ecranModification
fullscreen.addEventListener("click", screenModification);
