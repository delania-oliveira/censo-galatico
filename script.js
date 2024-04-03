function getPlanets() {
  fetch('https://swapi.dev/api/planets/')
    .then(res => res.json())
    .then(data => {
      const planets = data.results
      
      const navBar = document.querySelector('.menu-container')

      planets.forEach(planet => {
        const btn = document.createElement('button')

        btn.innerHTML= `${planet.name}`

        navBar.appendChild(btn)
      })

    })
}
document.addEventListener('DOMContentLoaded', getPlanets)