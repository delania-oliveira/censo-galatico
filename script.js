function getPlanets() {
  fetch('https://swapi.dev/api/planets/')
    .then(res => res.json())
    .then(data => {
      const planets = data.results
      
      const navBar = document.querySelector('.menu-container')

      planets.forEach(planet => {
        const btn = document.createElement('button')
        const planetUrl = planet.url

        btn.innerHTML= `${planet.name}`        
        btn.addEventListener('click', () => {handleDataPlanet(planetUrl)})

        navBar.appendChild(btn)
      })
    })
}
document.addEventListener('DOMContentLoaded', getPlanets)

function handleDataPlanet(url){
  fetch(url)
    .then(res => res.json())
    .then(data => {

      if(data.results && data.results.length > 0) {
        data = data.results[0]
      } else if (data.results && data.results.length === 0) {
        alert('Planeta não encontrado')
        return
      }
            
      const planetData = document.getElementById('planet-content')

      planetData.innerHTML = `
        <div class="planet-info">
          <h2>${data.name}</h2>
          <span><strong>População: </strong>${data.population}</span>
          <span><strong>Clima: </strong>${data.climate}</span>
          <span><strong>Terreno: </strong>${data.terrain}</span>
        </div>
      `
    })
}

function searchPlanet() {
  const input = document.getElementById('search-planet')
  const inputValue = input.value.toLowerCase()

  if(inputValue === '') {
    alert('Digite o nome do planeta')
    return
  }
  
  handleDataPlanet(`https://swapi.dev/api/planets/?search=${inputValue}`)

  input.value = ''
}