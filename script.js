document.querySelector('form.busca').addEventListener('submit', (event)=>{
    event.preventDefault()
    let input = document.querySelector('input#searchInput').value;
    if(input !== ""){
        showWarning('Carregando... ')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=6499d42a2cda338ecdee6091268750b5&units=metric&lang=pt_br`;
    }
});  

 function showWarning(msg){
    document.querySelector('div.aviso').innerHTML = msg;
 }