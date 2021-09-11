document.querySelector('form.busca').addEventListener('submit', async(event)=>{
    event.preventDefault()
    let input = document.querySelector('input#searchInput').value;
    if(input !== ""){
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
            document.querySelector('div.resultado').style.display = "none"
            showWarning('Não encontramos esta localização')
        }
    }else{
        document.querySelector('div.resultado').style.display = "none"
        showWarning('Digite a cidade!')
    }
});  

function showInfo(json){
    showWarning('');
    document.querySelector('div.resultado').style.display = "block"

    document.querySelector('div.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('div.tempInfo').innerHTML = json.temp;
    // document.querySelector('div.titulo').innerHTML = json.name;
    // document.querySelector('div.titulo').innerHTML = json.name;
    // document.querySelector('div.titulo').innerHTML = json.name;
    // document.querySelector('div.titulo').innerHTML = json.name;
}

function showWarning(msg){
    document.querySelector('div.aviso').innerHTML = msg;
}