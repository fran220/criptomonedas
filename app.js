const botonCotizar = document.querySelector('#cotizar');
const selectPais = document.querySelector('#pais');
const selecCripto = document.querySelector('#moneda');

document.addEventListener('DOMContentLoaded', ()=>{
    llenarSelectPais();
    llenarSelectCripto();
    botonCotizar.addEventListener('click', cotizar);
});


function llenarSelectPais(){
    const url = 'https://gist.githubusercontent.com/ssskip/5a94bfcd2835bf1dea52/raw/3b2e5355eb49336f0c6bc0060c05d927c2d1e004/ISO3166-1.alpha2.json';

    fetch(url)
        .then(res => res.json())
        .then(result => optionPais(result))
        .catch(err => console.log(err))
}

function llenarSelectCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(res =>res.json())
        .then(result => optionCripto(result))
        .catch(err => console.log(err))
}

function optionPais(paises){

}

function optionCripto(cripto){
    
}

function cotizar(e){
    e.preventDefault();
    const monedaPais = document.querySelector('#pais').value;
    const monedaVirtual = document.querySelector('#moneda').value;
    console.log('cotizando..');

}