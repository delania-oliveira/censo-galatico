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
      const famousResidents = document.querySelector('.planet-famous')
      famousResidents.innerHTML = ''

      if (data.residents.length > 0) {
        const residents = data.residents

        const h3 = document.createElement('h3')
        const table = document.createElement('table')
        const thead = document.createElement('tr')
        const nameTh = document.createElement('th')
        const birthTh = document.createElement('th')
        const tbody = document.createElement('tbody')
        

        famousResidents.appendChild(h3).textContent = 'Residentes Famosos'
        
        famousResidents.appendChild(table)

        table.appendChild(thead)
        thead.appendChild(nameTh).textContent = 'Nome'
        thead.appendChild(birthTh).textContent = 'Data de Nascimento'

        table.appendChild(tbody)

        residents.forEach(resident => {
          fetch(resident)
            .then(res => res.json())
            .then(data => {
              
              const tr = document.createElement('tr')
              const nameTd = document.createElement('td') 
              const birthTd = document.createElement('td') 


              tr.appendChild(nameTd).textContent = data.name
              tr.appendChild(birthTd).textContent = data.birth_year 

              tbody.appendChild(tr)
            })
        }) 
      } else {
          famousResidents.innerHTML = `
            <h3>Não há residentes famosos nesse planeta</h3>
          `
      } 
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