
const getPokemonURL = id => `https://pokeapi.co/api/v2/pokemon/${id}`


const generatePokemonPromises = () => Array(150).fill().map((_, index) => {
    return fetch(getPokemonURL(index + 1)).then(response => response.json())

})

const gerateHTML = pokemon => {
    console.log(pokemon)
    return liPokemons = pokemon.reduce((acumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        acumulator += `
    <li class="card ${types[0]}  ">

    <img class="card-image " alt="${pokemon.name}"  src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png"/>
    <h3 style="opacity: 0;">${pokemon.id}</h3>
    <h2 class="card-title">${pokemon.name}</h2>
    <p class="card-subtitle">${types.join(' | ')}</p>
    </li>`
        return acumulator
    }, '')
}

const insertPokemonIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

const pokemomPromises = generatePokemonPromises()



Promise.all(pokemomPromises)
    .then(gerateHTML)
    .then(insertPokemonIntoPage)

// button para selecionar os Pokemons

const IntoTypePokemonDom = type => {
    const typePokemon = document.querySelectorAll(`.${type}`)

    clearDisplay()

    typePokemon.forEach(btn => {
        btn.classList.remove('none')
        btn.classList.add('on')
    })
}

const intoTypePokemonDisplay = () => {
    const btnType = document.querySelectorAll('button')

    const typesPokemon = ['grass', 'fire', 'water', 'bug', 'normal', 'poison', 'electric',
        'ground', 'fairy', 'fighting', 'psychic', 'rock', 'ghost', 'ice', 'dragon']

    typesPokemon.forEach((types, index) => {

        btnType[index + 1].addEventListener('click', () => IntoTypePokemonDom(types))
    })
}

// Limpa os pokemon que esta na tela
const clearDisplay = () => {
    const li = document.querySelectorAll('li')

    li.forEach(teste => {
        teste.classList.add('none')
        teste.classList.remove('on')
    })
}

Promise.all(pokemomPromises)
    .then(intoTypePokemonDisplay)

const modal = document.querySelector('.modal')
const btnCloser = document.querySelector('[data-modal="closer"]')


Promise.all(pokemomPromises)
    .then((pokemon) => {
        function cards() {
            const cards = [...document.querySelectorAll('li')]
            cards.forEach((item) => {

                item.addEventListener('click', (event) => {
                    const cardTtile = item.querySelector('h3')

                    // Puxa Id do Pokemon com click
                    const id = +cardTtile.innerHTML - 1

                    const modalPokemon = pokemon[id]
                    insetModalPokemon(gerateHTMLModal(modalPokemon))
                    //modal
                    modal.classList.add('active')
                })
            })
        }

        function debouse(callback, delay) {
            setTimeout(() => {
                callback()
                clearTimeout()
            }, delay)
        }

        debouse(cards, 2000)

    })

btnCloser.addEventListener('click', () => {
    modal.classList.remove('active')
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active')
    }
})

// infor Modal

const gerateHTMLModal = (modal) => {


    const types = modal.types.map(typeInfo => typeInfo.type.name)

    const hp = modal.stats[0].base_stat
    const attack = modal.stats[1].base_stat
    const defense = modal.stats[2].base_stat
    const speed = modal.stats[5].base_stat
    const exp = modal.base_experience

    //Medidas dos pokemons
    const weight = (modal.weight) / 10 + ' KG'
    const height = (modal.height)

    console.log(height)



    return html = `
    <div class="card-image-modal "><img  alt="${modal.name}"  src="https://cdn.traction.one/pokedex/pokemon/${modal.id}.png"/></div>
    <h1 class="title-pokemon ${types[0]}">${modal.name}</h1>
    <div class="info-base">
        <div class="Weight">${weight}<p>Peso</p></div>
        <div class="height">${height}<p>Altura</p></div>
    </div>

    <ul class="statistic">

        <li> 
            <div class="stats-name">
                <h2>HP</h2>
            </div> 

            <div class="base-stats">
                 <span class="background"></span>
                 
                 <span class="hp" style="width: ${hp}px;"></span><div class="dados">${hp} / 300</div>
            </div>
        </li>
        
        <li> 
            <div class="stats-name">
                <h2>ATK</h2>
            </div> 

            <div class="base-stats">
                 <span class="background"></span>
                 
                 <span class="defense" style="width: ${attack}px;"></span><div class="dados">${attack} / 300</div>
            </div>
        </li>
        <li> 
        <div class="stats-name">
            <h2>DEF</h2>
        </div> 

        <div class="base-stats">
             <span class="background"></span>
             
             <span class="attack" style="width: ${defense}px;"></span><div class="dados">${defense} / 300</div>
        </div>
    </li>
    <li> 
    <div class="stats-name">
        <h2>SPD</h2>
    </div> 

    <div class="base-stats">
         <span class="background"></span>
         
         <span class="speed" style="width: ${speed}px;"></span><div class="dados">${speed} / 300</div>
    </div>
</li>

<li> 
    <div class="stats-name">
        <h2>EXP</h2>
    </div> 

    <div class="base-stats">
         <span class="background"></span>
         
         <span class="exp" style="width: ${exp / 2}px;"></span><div class="dados">${exp} / 600</div>
    </div>
</li>    
    </ul>`

}

const insetModalPokemon = (html) => {

    const iten = document.querySelector('.iten')
    iten.innerHTML = html
}




