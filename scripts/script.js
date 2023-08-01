//ATIVIDADE 01

function mostraAlerta() {

    let button01 = document.getElementById("button01");

    button01.innerText = "Aguarde...";
    setTimeout(() => {
        alert("Identificamos uma falha na Matrix! Veja sua conexão imediatamente!");
        button01.innerText = "Pronto!";
    }, 3000);
};

//ATIVIDADE 02

let intervaloRelogio;

function iniciaRelogio() {

    let button02 = document.getElementById("button02");
    button02.innerText = "Aguarde...";

    setTimeout(() => {

        intervaloRelogio = setInterval(function () {

            let relogio = document.getElementById("relogio");
            relogio.style.display = "block";

            let horaAtual = new Date();

            relogio.innerHTML = `${horaAtual.toLocaleTimeString('pt-BR')}`;

            button02.innerText = "Seu tempo está passando, quer parar?";
            button02.onclick = resetaRelogio;
        }, 1000);

    }, 2000);
}

function resetaRelogio() {

    clearInterval(intervaloRelogio);

    let relogio = document.getElementById("relogio");
    relogio.style.display = "none";

    let button02 = document.getElementById("button02");
    button02.innerText = "Iniciar relógio";
    button02.onclick = iniciaRelogio;
}

//ATIVIDADE 03

const cores = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "gray", "brown", "Indigo", "Magenta"];

let intervalo;


function mudaCor() {

    button03.innerText = "As cores mudam! Quer pausar?";

    intervalo = setInterval(mudanca, 1000);
}

function mudanca() {

    let pArcoIris = document.getElementById("pArcoIris");

    let coresAleatorias = Math.floor(Math.random() * cores.length);
    let corAleatoria = cores[coresAleatorias];
    pArcoIris.style.color = corAleatoria;

    let button03 = document.getElementById("button03");
    button03.onclick = pauseChangingColor;
}

function pauseChangingColor() {

    button03.innerText = "Ver cores!"
    button03.onclick = mudaCor;

    pArcoIris.style.color = "black";

    clearInterval(intervalo);
}

//ATIVIDADE 04

const nomes = ["Felipe", "Anne", "Clara", "Davi", "Diego", "Rafael", "Monara", "Fabíola", "Glauber", "Marcos"];

let intervaloNomes;

function iniciaSorteio() {

    let inputTempo = parseInt(document.getElementById("inputTempo").value);
    let inputVelocidade = parseInt(document.getElementById("inputVelocidade").value);

    sorteia(inputTempo, inputVelocidade);
}

function sorteia(tempo, velocidade) {

    let button04 = document.getElementById("button04");
    button04.innerText = "Sorteando...";

    setTimeout(() => {

        intervaloNomes = setInterval(function () {

            let nomesAleatorio = Math.floor(Math.random() * nomes.length);
            let nomeAleatorio = nomes[nomesAleatorio];
            console.log(nomeAleatorio);

            button04.onclick = pausaSorteio;

        }, velocidade);

    }, tempo);
}


function pausaSorteio() {
    
    let button04 = document.getElementById("button04");
    button04.innerText = "Sortear!";

    button04.onclick = iniciaSorteio;
    
    clearInterval(intervaloNomes);

}

//ATIVIDADE 05

async function consomePokeAPI(name = "") {

    const loading = document.querySelector('#loading')

    const url = name.length > 0 ? `https://pokeapi.co/api/v2/pokemon/${name}` : 'https://pokeapi.co/api/v2/pokemon'

    const pokemonsDaAPI = await fetch(url)
      .then(
        response => response.json()
      )
      .catch(
        error => console.log(error)
      )

    loading.style.display = 'none'

    return pokemonsDaAPI
}

async function renderizaPokemons(name = "") {
    const ulTag = document.querySelector('#ul')
    ulTag.innerText = ""
    const listaDePokemons = await consomePokeAPI(name)

    if (name.length > 0 && listaDePokemons) {
        const pokemon = listaDePokemons
        const numeroNaPokedex = pokemon.id

        ulTag.insertAdjacentHTML('beforeend', `
            <li>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
                <h3>${pokemon.name}</h3>
            </li>
        `)
    } else if (listaDePokemons) {
        listaDePokemons.results.forEach(pokemon => {

            const numeroNaPokedex = pokemon.url.slice(34, -1)

            ulTag.insertAdjacentHTML('beforeend', `
                <li>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${numeroNaPokedex}.png" alt=${pokemon.name}>
                    <h3>${pokemon.name}</h3>
                </li>
            `)
        })
    } 
}

renderizaPokemons()


function verificaInput() {
    const input = document.querySelector('.inputBusca')
    const button = document.querySelector('.buttonS')

    button.addEventListener('click', async (event) => {
        event.preventDefault()
        await renderizaPokemons(input.value)
    })
}

verificaInput()