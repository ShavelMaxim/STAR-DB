// fetch('https://swapi.dev/api/people/11/')
//   .then(res => {
//     console.log('Got response', res.status)
//     return res.json()
//   })
//   .then(body => {
//     console.log(body)
//   })
export default class SwapiService {
  _apiBase = 'https://swapi.dev/api'

  async getResource (url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }
  async getAllSpecies () {
    const res = await this.getResource(`/species/`)
    return res.results.map(species => this._transformSpecies(species))
  }
  getSpecies = async id => {
    const species = await this.getResource(`/species/${id}`)
    return this._transformSpecies(species)
  }
  async getAllPeople () {
    const res = await this.getResource(`/people/`)
    return res.results.map(person => this._transformPerson(person))
  }
  getPerson = async id => {
    const people = await this.getResource(`/people/${id}`)
    return this._transformPerson(people)
  }
  async getAllPlanets () {
    const res = await this.getResource(`/planets/`)
    return res.results.map(planet => this._transformPerson(planet))
  }
  getPlanet = async id => {
    const planet = await this.getResource(`/planets/${id}`)
    return this._transformPlanet(planet)
  }
  async getAllStarships () {
    const res = await this.getResource(`/starships/`)
    return res.results.map(starship => this._transformPerson(starship))
  }
  getStarship = async id => {
    const starship = await this.getResource(`/starships/${id}`)
    return this._transformStarship(starship)
  }

  _extractId (item) {
    const idRegExp = /\/([0-9]*)\/$/
    return item.url.match(idRegExp)[1]
  }

  _transformPlanet (planet) {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
      climate: planet.climate
    }
  }
  _transformPerson (person) {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
      height: person.height
    }
  }
  _transformStarship (starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    }
  }
  _transformSpecies (species) {
    return {
      id: this._extractId(species),
      name: species.name,
      classification: species.classification,
      hairColors: species.hair_colors,
      skinColors: species.skin_colors,
      height: species.average_height,
      averageLifespan: species.average_lifespan,
      language: species.language
    }
  }
}
