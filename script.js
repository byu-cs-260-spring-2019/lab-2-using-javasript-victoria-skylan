window.onload = function() {
	document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
		event.preventDefault();
		const value = document.getElementById("weatherInput").value;
		if (value === "")
		return;
		console.log(value);

		const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=0a16ffe08907a6a070eb9f39d251fd36";
		try {
			// getting current weather by sending the API and getting response
			const response = await fetch(url);
			const json = await response.json();
			console.log("json: ",json);
			// creating the html from the json
			let results = "";
			results += '<h2 class="weatherTitle">Weather in ' + json.name + "</h2>";
			// location of city coord: {lat: 40.3433, lon: -111.7208}
			for (let i=0; i < json.weather.length; i++) {
				results += '<img class="weatherIcon" src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
			}
			//wind: {speed: 8.1, deg: 184.02}
			results += '<h2 class="weatherIcon">' + json.main.temp + " &deg;F</h2>"
			results += '<h3 class="weatherIcon">'
			for (let i=0; i < json.weather.length; i++) {
				results += json.weather[i].description
			if (i !== json.weather.length - 1)
				results += ", "
			}
			results += "</h3>";
			results += '<h4 class="weatherIcon"> Low: ' + json.main.temp_min + " &deg;F</h4>"
			results += '<h4 class="weatherIcon"> High: ' + json.main.temp_max + " &deg;F</h4>"
			results += '<h4 class="weatherIcon"> Wind: ' + json.wind.speed + " mph</h4>"
			results += '<h4 class="weatherIcon"> Humidity: ' + json.main.humidity + "&percnt;</h4>"
			
			document.getElementById("weatherResults").style.padding = "10px";
			document.getElementById("weatherResults").innerHTML = results;
		}catch(err) {
			console.log(err);
		}
		
		const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=0a16ffe08907a6a070eb9f39d251fd36";
		/*
						forecast += '<tr class ="aBlock">'
			let day = moment(json.list[0].dt_txt).format('MMMM Do YYYY');
			forecast += '<td rowspan = "3" id="day">' + day  + "</td>";
				for (let i=0; i < json.list.length; i++) {
				let currentDay = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
				if (day != currentDay) {
					forecast += '<tr class ="aBlock">'
					forecast += '<td rowspan = "2" id="day">' + currentDay  + "</td>";
				}
				else {
					if (i!=0) {
						forecast += '<tr class ="aBlock">'
					}
				}
				forecast += "<td id='time'>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</td>";
				forecast += "<td>" + json.list[i].main.temp + "</td>";
				forecast += '<td>' + json.list[i].wind.speed + " mph</td>"
				forecast += "<td>" + json.list[i].weather[0].main + "</td>";
				forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/> </td> </tr>'
				
				
				forecast += '<tr class ="aBlock">'
				let day = moment(json.list[i].dt_txt).format('MMMM Do YYYY');
				
				forecast += '<td rowspan = "3" id="day">' + day + "</td>";
				for (let j=0; j<3; j++) {
					if (j===1) {
						forecast += '<tr>';
					}
					forecast += "<td id='time'>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</td>";
					forecast += "<td>" + json.list[i].main.temp + "</td>";
					forecast += '<td>' + json.list[i].wind.speed + " mph</td>"
					forecast += "<td>" + json.list[i].weather[0].main + "</td>";
					forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/> </td> </tr>'
					i++;
				}
				
			}
			}
			
			
			more this is a first case senario
			forecast += '<tr class ="aBlock">'
			forecast += '<td rowspan = "3" id="day">' + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</td>";
			let time = moment(json.list[i].dt_txt).format('h:mm:ss a');
			while (time != "12:00:00 am") {
				forecast += "<td id='time'>" + time + "</td>";
				forecast += "<td>" + json.list[i].main.temp + "</td>";
				forecast += '<td>' + json.list[i].wind.speed + " mph</td>"
				forecast += "<td>" + json.list[i].weather[i].main + "</td>";
				forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/> </td> </tr>'
				i++;
				time = moment(json.list[i].dt_txt).format('h:mm:ss a');
				forecast += '<tr class ="aBlock">'
				let time = moment(json.list[i].dt_txt).format('h:mm:ss a');
				while (time != "12:00:00 am" && ((i+k) < (json.list.length - 1))) {			// making the day column the right size
					k++;
					time = moment(json.list[i+k].dt_txt).format('h:mm:ss a');//if it is not 12, keep looking
				}
				forecast += '<td rowspan = "' + k + '" id="day">' + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</td>";
				for (let j = 0; j <= k; j++) {
					forecast += "<td id='time'>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</td>";
					forecast += "<td>" + json.list[i].main.temp + "</td>";
					forecast += '<td>' + json.list[i].wind.speed + " mph</td>"
					forecast += "<td>" + json.list[i].weather[0].main + "</td>";
					forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/> </td> </tr>'
					i++;
				} 
			}
		*/
		try {
			// now forcasting the weather, sending API and getting response
			const response = await fetch(url2);
			const json = await response.json();
			console.log(json);
			//creating the html from the json
			let forecast = "<table><br/><br/><tr><th>Day</th><th>Time</th><th>Temperature</th><th>Wind</th><th>Condition</th><th>Icon</th></tr>";	
			let k = 0;
			forecast += '<td rowspan = "' + 7 + '" id="day">' + moment(json.list[k].dt_txt).format('MMMM Do YYYY') + "</td>";
			for (let j = 0; j < 7; j++) {
					forecast += "<td id='time'>" + moment(json.list[k].dt_txt).format('h:mm:ss a') + "</td>";
					forecast += "<td>" + json.list[k].main.temp + "</td>";
					forecast += '<td>' + json.list[k].wind.speed + " mph</td>"
					forecast += "<td>" + json.list[k].weather[0].main + "</td>";
					forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[k].weather[0].icon + '.png"/> </td> </tr>'
					k++;
				} 
			for (let i = k; i < json.list.length; i++) {
				forecast += '<td rowspan = "' + 8 + '" id="day">' + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</td>";
				
				for (let j = 0; j < 8; j++) {
					if (i < json.list.length) {
						forecast += "<td id='time'>" + moment(json.list[i].dt_txt).format('h:mm:ss a') + "</td>";
						forecast += "<td>" + json.list[i].main.temp + "</td>";
						forecast += '<td>' + json.list[i].wind.speed + " mph</td>"
						forecast += "<td>" + json.list[i].weather[0].main + "</td>";
						forecast += '<td> <img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/> </td> </tr>'
						i++;
					}
				} 
			 }
			forecast += "</table>";
			console.log(forecast);
			
			document.getElementById("resultTable").innerHTML = forecast;
		}
		catch(err) {
			console.log(err);
		}
	});
}