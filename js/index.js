import { setPokemon, setImage } from "./pokemon.js";
import "./stats.js";

const form = document.querySelector("#form");
const input = document.querySelector("#input");

const $pokedex = document.querySelector("#pokedex");
const descriptions = document.querySelector("#description");

const prevPokemon = document.querySelector("#prev-pokemon");
const nextPokemon = document.querySelector("#next-pokemon");
const nextImage = document.querySelector("#next-image");
const prevImage = document.querySelector("#prev-image");

form.addEventListener("submit", handleSubmit);
prevPokemon.addEventListener("click", handlePrevPokemon);
nextPokemon.addEventListener("click", handleNextPokemon);
nextImage.addEventListener("click", handleNextImage);
prevImage.addEventListener("click", handlePrevImage);

let activePokemon = null;
async function handleSubmit(event) {
  $pokedex.classList.add("is-open");
  event.preventDefault();
  const forms = new FormData(form);
  const id = forms.get("id");
  if (id > 898 || id == 0) {
    descriptions.textContent =
      "Pokemon no encontrado, por favor ingrese otro valor";
  } else if (id > 898 || id == 0) {
    loader(true);
  }

  activePokemon = await setPokemon(id);
  if (id === `${activePokemon.id}`) {
    input.value = activePokemon.nombre;
  }
}

async function handlePrevPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 1
      ? 898
      : activePokemon.id - 1;
  activePokemon = await setPokemon(id);
  input.value = activePokemon.nombre;
}

async function handleNextPokemon() {
  const id =
    activePokemon === null || activePokemon.id === 898
      ? 1
      : activePokemon.id + 1;

  activePokemon = await setPokemon(id);
  input.value = activePokemon.nombre;
}

const imagen = document.querySelector("#screen");
function loader(isloading = false) {
  const screen = isloading ? "url(./images/loading.gif)" : "";
  imagen.style.backgroundImage = screen;
}

let activeSprites = 0;
function handleNextImage() {
  if (activePokemon === null) return false;
  if (activeSprites >= activePokemon.sprites.length - 1) {
    activeSprites = 0;
    return setImage(activePokemon.sprites[activeSprites]);
  }
  activeSprites = activeSprites + 1;
  return setImage(activePokemon.sprites[activeSprites]);
}

function handlePrevImage() {
  if (activePokemon === null) return false;
  if (activeSprites <= 0) {
    activeSprites = activePokemon.sprites.length - 1;
    return setImage(activePokemon.sprites[activeSprites]);
  }
  activeSprites = activeSprites - 1;
  return setImage(activePokemon.sprites[activeSprites]);
}
