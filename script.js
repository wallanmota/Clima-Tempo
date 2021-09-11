document.querySelector('form.busca').addEventListener('submit', async(event)=>{
    event.preventDefault()
    let input = document.querySelector('input#searchInput').value;
    if(input !== ""){
        clearInfo();
        showWarning('Carregando... ')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6499d42a2cda338ecdee6091268750b5&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();
        console.log(json)

        if(json.cod === 200 ){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo();
            showWarning('Não encontramos esta localização');
        }
    }else{
        clearInfo();
        showWarning('Digite a cidade!')
    }
});  

function showInfo(json){
    showWarning('');
    document.querySelector('div.resultado').style.display = "block"

    document.querySelector('div.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('div.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('div.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;

    document.querySelector('div.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('div.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
    
}

function clearInfo(){
    showWarning('');
    document.querySelector('div.resultado').style.display = "none"

}

function showWarning(msg){
    document.querySelector('div.aviso').innerHTML = msg;
}