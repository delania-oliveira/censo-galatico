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