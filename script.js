let  busca = document.querySelector(".busca").addEventListener("submit", async (event)=>{
	event.preventDefault();


	let input = document.querySelector("#searchInput").value;

	if(input !== ""){
		clearInfo();
		showWarning("Carregando...");

		let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=657f4bbd0c3031d63e6dee7ccb0bf589&unit=metric&lang=pt_br`;
		
		let results = await fetch(url);

		let json = await results.json();

		if(json.cod === 200){
			showInfo({
				name: json.name,
				country: json.sys.country,
				temp: json.main.temp,
				tempIcon: json.weather[0].icon,
				windSpeed:json.wind.speed,
				windDeg:json.wind.deg 
			})
		} else {
			clearInfo();
			showWarning("Não encontramos esta Cidade.");
		}

	} else {
		clearInfo();
		showWarning("Digite o nome de uma Cidade.")
	}
});


function showInfo(json){
	showWarning("");

	document.querySelector(".titulo").innerHTML = `${json.name} , ${json.country}`;
	
	document.querySelector(".tempInfo").innerHTML = `${(json.temp / 10).toFixed(2)} <sup>C°</sup>`;
	
	document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>km/h</span>`;

	document.querySelector(".temp img").setAttribute("src" , `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
	
	document.querySelector(".ventoPonto").style.transform = `rotate(${json.windDeg - 90}deg)`;
	

	document.querySelector(".resultado").style.display = "block";
}

function clearInfo(){
	document.querySelector(".resultado").style.display = "none";
	

}

function showWarning(msg){
	document.querySelector(".aviso").innerHTML = msg;
}