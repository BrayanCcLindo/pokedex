import { getPokemon, getSpecies } from "./api.js";
import { createChart } from "./stats.js";

export async function findPokemon(id) {
  const pokemon = await getPokemon(id);
  const species = await getSpecies(id);

  const sprites = [pokemon.sprites.front_default];
  const stats = pokemon.stats.map((item) => item.base_stat);
  for (const item in pokemon.sprites) {
    if (
      item !== "front_default" &&
      item !== "other" &&
      item !== "version" &&
      pokemon.sprites[item]
    ) {
      sprites.push(pokemon.sprites[item]);
    }
  }
  const test = sprites;

  test.pop();

  // Object.keys(pokemon.sprites).forEach((item) => {
  //   if (
  //     item !== "front_default" &&
  //     item !== "other" &&
  //     item !== "version" &&
  //     pokemon.sprites[item]
  //   ) {
  //     sprites.push(pokemon.sprites[item]);
  //   }
  // });
  const description = species.flavor_text_entries.find(
    (flavor) => flavor.language.name === "es"
  );
  return {
    sprites,
    description: description.flavor_text,
    id: pokemon.id,
    nombre: pokemon.name,
    stats,
  };
}

const img = document.querySelector("#image");
export function setImage(image) {
  img.src = image;
}

const descriptions = document.querySelector("#description");
function setDescription(text) {
  descriptions.textContent = text;
}

const imagen = document.querySelector("#screen");
function loader(isloading = false) {
  const screen = isloading ? "url(./images/loading.gif)" : "";
  imagen.style.backgroundImage = screen;
}

const light = document.querySelector("#light");
function speech(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es";
  speechSynthesis.speak(utterance);
  light.classList.add("is-animated");

  utterance.addEventListener("end", () => {
    light.classList.remove("is-animated");
  });
}
let activeChart = null;
export async function setPokemon(id) {
  //inicia loader
  loader(true);
  const pokemon = await findPokemon(id);
  //   finaliza loader
  loader(false);

  setImage(pokemon.sprites[0]);
  setDescription(pokemon.description);
  speech(`${pokemon.nombre}, ${pokemon.description}`);
  if (activeChart instanceof Chart) {
    activeChart.destroy();
  }
  activeChart = createChart(pokemon.stats, pokemon.nombre);
  return pokemon;
}
