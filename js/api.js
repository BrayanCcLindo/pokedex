const BASE_API = "https://pokeapi.co/api/v2/";

export async function getPokemon(id) {
  try {
    const response = await fetch(`${BASE_API}pokemon/${id}/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getSpecies(id) {
  try {
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}
