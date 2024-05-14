const formulario = document.querySelector('#form');
const selectPais = document.querySelector('#pais');
const selecCripto = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

const objMonedas = {
    cripto: '',
    monedaPais: ''
}

document.addEventListener('DOMContentLoaded', ()=>{
    llenarSelectMoneda();
    llenarSelectCripto();
    formulario.addEventListener('submit', validarCampos);
    selecCripto.addEventListener('change', llenarObjMonedas);
    selectPais.addEventListener('change', llenarObjMonedas)

});


function llenarSelectMoneda(){
    const url = 'https://raw.githubusercontent.com/vijinho/ISO-Country-Data/master/currencies.json';

    fetch(url)
        .then(res => res.json())
        .then(result => optionMoneda(result))
        .catch(err => console.log(err))
}

function llenarSelectCripto(){
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then(res =>res.json())
        .then(result => optionCripto(result))
        .catch(err => console.log(err))
}

function optionMoneda(paises){
    paises.forEach(pais => {
        const{name, code} = pais;
        const option = document.createElement('option');
        option.value = `${code}`;
        option.innerHTML = `${name}`;
        selectPais.appendChild(option);
    });

}

function optionCripto(cripto){
    for(let i=0;i<cripto.Data.length;i++){
        const {FullName, Name} = cripto.Data[i].CoinInfo;
        const option = document.createElement('option');
        option.value = `${Name}`;
        option.innerHTML = `${FullName}`;
        selecCripto.appendChild(option);
    }
}

function llenarObjMonedas(e){
    objMonedas[e.target.name] = e.target.value;  
}

function validarCampos(e){
    e.preventDefault();
    const{cripto, monedaPais} = objMonedas;
    if(cripto === '' || monedaPais === ''){
        alert('Llene todos los campos')
        return;
    }

    consultarApi();

}

function consultarApi(){
    const{cripto, monedaPais} = objMonedas;
    console.log(cripto)
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${monedaPais}`;

    showSpinner();

    fetch(url)
        .then(res => res.json())
        .then(result =>{ 
            cotizar(result.DISPLAY[cripto][monedaPais]);
        })
        .catch(err => {
            console.log(err)
            alert('hubo un error en tu consulta pruebe con otra divisa o moneda virtual')
        })
}

function cotizar(criptomoneda){
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE} = criptomoneda;
    limipiarHtml();

    console.log('price',PRICE);
    console.log('valor mas alto del dia', HIGHDAY);
    console.log('valor mas bajo del dia', LOWDAY);
    console.log('variacion en las ultimas 42hs', CHANGEPCT24HOUR);
    console.log('ultima actializacion', LASTUPDATE);

    const price = document.createElement('p');
    const valorAlto = document.createElement('p');
    const valorBajo = document.createElement('p');
    const variacion = document.createElement('p');
    const ultimaActualizacion = document.createElement('p');

    price.innerHTML = `Precio actual: <span>${PRICE}</span>`;
    valorAlto.innerHTML = `Precio mas alto en el dia: <span>${HIGHDAY}</span>`;
    valorBajo.innerHTML = `Precio mas bajo en el dia: <span>${LOWDAY}</span>`;
    variacion.innerHTML = `Variacion: <span>${CHANGEPCT24HOUR}</span>`;
    ultimaActualizacion.innerHTML = `Ultima actualizacion: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(price);
    resultado.appendChild(valorAlto);
    resultado.appendChild(valorBajo);
    resultado.appendChild(variacion);
    resultado.appendChild(ultimaActualizacion);
}


function showSpinner(){
    limipiarHtml();

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');

    divSpinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `;

    resultado.appendChild(divSpinner);
    
}

function limipiarHtml(){
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}