const form = document.getElementById('search-form');
const searchField = document.getElementById('search-key-word');
const responseContainer = document.getElementById('response-container');
const responseContainer2 = document.getElementById('response-container-2');




form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = "";
    searchedForText = searchField.value;
    console.log(searchedForText);
    //getWeatherData();
    getCall();
});




function getCall() {

    $.ajax({
        type: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${searchedForText}&key=AIzaSyBtv8hBzVT3EDF39uVdN4oUxHGHEBOgpMI`,
        dataType: 'json',

    }).done(getLocation);

    function getLocation(results) {
        console.log(results);
        const coordenates = results.results[0].geometry.location;
        const lat = coordenates.lat;
        const lng = coordenates.lng;
        console.log(lat);
        getWeatherData(lat, lng);
    }
}

//problema con  Access-Control-Allow, revisar consola. Solo se puede acceder instalando el pluggin de CORS
function getWeatherData(lat, lng) {
    $.ajax({
        type: "GET",
        
        url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/44f1b9aff98cc70b888435b1888ccba6/${lat},${lng}`,
        /*origin:"https://api.darksky.net/forecast",
        crossDomain : true,
        Access-Control-Allow-Credentials: true,*/
        dataType: 'json',

    }).done(getWeather);
}

function getWeather(data) {
    responseContainer2.innerHTML="";
    console.log(data)
    const temp = data.currently.apparentTemperature;
    const summary = data.currently.summary;
    const precip = data.currently.precipType;
    const daily = data.daily.summary;
    const weeklyInfo=data.daily.data;
    console.log(temp);
   
    const icon = data.currently.icon;
    const humid = data.currently.humidity;
    const wi = data.currently.windSpeed;
    const uv = data.currently.uvIndex;
    const press = data.currently.pressure;
   //console.log(daily);
    paintInfo(icon,humid,wi,uv,press,temp,summary,precip,daily)

weeklyInfo.forEach(function(day){
    const time=day.time;
    
    const max=day.apparentTemperatureMax;
    const min=day.apparentTemperatureMin;
    const datee=new Date(0);
    datee.setUTCSeconds(time);
    const realDate= datee.toLocaleString('en-US',{weekday:'long', day:'numeric'})
    
   
    
    paintDays( realDate,max,min)


})

    


}



function paintInfo(icon,humid,wi,uv,press,temp,summary,precip,daily){
    let name = document.createElement('h1');
    let temperature = document.createElement('h2');
    let hum = document.createElement('h3');
    let wind = document.createElement('h3');
    let uvIndex = document.createElement('h3');
    let pressure = document.createElement('h3');
    let summa = document.createElement('p');
    let precipitation = document.createElement('span');
    let daily1 = document.createElement('p');
    let iconn = document.createElement('img');

    iconn.innerHTML = icon;
    name.innerText = searchedForText.toUpperCase();
    temperature.innerText = temp + "ºF";
    summa.innerText = "Sky: " + summary
    precipitation.innerText = "Precipitation: " + precip;
    daily1.innerText = daily;
    hum.innerText = "Humidity: " + humid;
    wind.innerText = "Wind Speed: " + wi;
    uvIndex.innerText = "Uv Index: " + uv;
    pressure.innerText = "Pressure: " + wi + " hPa";

    responseContainer.appendChild(name);
    responseContainer.appendChild(temperature);
    responseContainer.appendChild(hum);
    responseContainer.appendChild(wind);
    responseContainer.appendChild(uvIndex);
    responseContainer.appendChild(pressure);
    responseContainer.appendChild(summa);
    responseContainer.appendChild(precipitation);
    responseContainer.appendChild(daily1);
    responseContainer.appendChild(iconn);
}


function paintDays(realDate,max,min){
    
    const date=document.createElement('p');
    const maxTemp=document.createElement('span');
    const minTemp=document.createElement('span');
    date.innerHTML= realDate;
    maxTemp.innerText='Max:'+ max+'º' + '-';
    minTemp.innerText='Min:' + min+'º';
    console.log(date);
    date.appendChild(maxTemp);
    date.appendChild(minTemp);
    responseContainer2.appendChild(date);
}





/*
349687dbd574cdd20d242aa1f0461949 weather key


AIzaSyBtv8hBzVT3EDF39uVdN4oUxHGHEBOgpMI      google key*/
