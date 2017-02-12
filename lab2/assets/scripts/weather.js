//{"id":2643743,"name":"London",
//"coord":{"lon":-0.12574,"lat":51.50853},
//"main":{"temp":274.034,"temp_min":274.034
//"temp_max":274.034,"pressure":1027.59,"sea_level":1035.46,"grnd_level":1027.59,"humidity":96},
//"dt":1486854542,"wind":{"speed":4.3,"deg":31.5007},
//"sys":{"country":"GB"},"clouds":{"all":88},
//"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}]}


function getWeather() {
  var key = credentials.apikey ;
  var input = document.getElementById("inputStatus") ;
  var apiSearch = "http://api.openweathermap.org/data/2.5/weather?q=" ;
  var searchCond = "&appid=" ;
  var xmlhttp = new XMLHttpRequest() ;
  var url = apiSearch + input.value + searchCond + key ;

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      displayWeather(JSON.parse(xmlhttp.responseText)) ;
    }
  } ;

  xmlhttp.open("GET", url, true) ;
  xmlhttp.send() ;

}

function displayWeather(response) {
  var display = document.getElementById("weatherInfo") ;
  var unit = document.getElementById("unit") ; //checked = F
  var id = response.id ;
  var cityName = response.name + ", " + response.sys.country ;
  var minTempInK = parseInt(response.main.temp_min) ;
  var tempInK = parseInt(response.main.temp) ;
  var maxTempInK = parseInt(response.main.temp_max) ;
  var pressure = parseInt(response.main.pressure) ;
  var humidity = parseInt(response.main.humidity) ;
  var windSpd = parseInt(response.wind.speed) ;
  var windDeg = parseInt(response.wind.deg) ;
  var weatherId = parseInt(response.weather[0].id) ;
  var clouds = parseInt(response.clouds.all) ;
  var weather = response.weather[0].main ;
  var weatherDes = response.weather[0].description ;

  var minTemp = Math.round(minTempInK - 273.15) ; //in C
  var temp = Math.round(tempInK - 273.15) ; //in C
  var maxTemp = Math.round(maxTempInK - 273.15) ; //in C

  if (unit.checked) {
    minTemp = Math.round((minTemp * 5 / 9 ) + 32) ;
    temp = Math.round((temp * 5 / 9 ) + 32) ;
    maxTemp = Math.round((maxTemp * 5 / 9 ) + 32) ;
    document.getElementById("tempImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("minTempImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("maxTempImg").src = "assets/images/001lighticons-47.png" ;
  }
  else {
    document.getElementById("tempImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("minTempImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("maxTempImg").src = "assets/images/001lighticons-46.png" ;
  }

  document.getElementById("currentCity").innerHTML = cityName ;
  document.getElementById("weatherCondNow").innerHTML = weather ;
  document.getElementById("weatherDesNow").innerHTML = weatherDes ;
  setImage(weatherId, "weatherImgNow") ;
  document.getElementById("temp").innerHTML = temp ;
  document.getElementById("minTemp").innerHTML = minTemp ;
  document.getElementById("maxTemp").innerHTML = maxTemp ;
  document.getElementById("pressure").innerHTML = pressure ;
  document.getElementById("humidity").innerHTML = humidity ;
  document.getElementById("windSpd").innerHTML = windSpd ;
  document.getElementById("windDeg").innerHTML = windDir(windDeg) ;

  forecastAjax(id) ;
}

function forecastAjax(cityId) {
  var key = credentials.apikey ;
  var apiSearch = "http://api.openweathermap.org/data/2.5/forecast?id=" ;
  var searchCond = "&appid=" ;
  var url = apiSearch + cityId + searchCond + key ;
  var xmlhttp = new XMLHttpRequest() ;

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      displayForecast(JSON.parse(xmlhttp.responseText)) ;
    }
  } ;

  xmlhttp.open("GET", url, true) ;
  xmlhttp.send() ;
}

// {"dt":1486944000,"main":{"temp":273.19,"temp_min":273.187,"temp_max":273.19,"pressure":999.19,"sea_level":1018.73,"grnd_level":999.19,
// "humidity":96,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":88},
// "wind":{"speed":3.47,"deg":241.501},"rain":{"3h":0.065},"snow":{"3h":0.7625},"sys":{"pod":"n"},"dt_txt":"2017-02-13 00:00:00"}
function displayForecast(response) {
  var forecastArr = response.list ;
  var unit = document.getElementById("unit") ;
  var day1weatherId = parseInt(forecastArr[4].weather[0].id) ;
  var day2weatherId = parseInt(forecastArr[12].weather[0].id) ;
  var day3weatherId = parseInt(forecastArr[20].weather[0].id) ;
  var day4weatherId = parseInt(forecastArr[28].weather[0].id) ;
  var day5weatherId = parseInt(forecastArr[36].weather[0].id) ;

  var day1weather = forecastArr[4].weather[0].main ;
  var day2weather = forecastArr[12].weather[0].main ;
  var day3weather = forecastArr[20].weather[0].main ;
  var day4weather = forecastArr[28].weather[0].main ;
  var day5weather = forecastArr[36].weather[0].main ;

  var day1temp = Math.round(forecastArr[4].main.temp - 273.15) ; //in C
  var day2temp = Math.round(forecastArr[12].main.temp - 273.15) ; //in C
  var day3temp = Math.round(forecastArr[20].main.temp - 273.15) ; //in C
  var day4temp = Math.round(forecastArr[28].main.temp - 273.15) ; //in C
  var day5temp = Math.round(forecastArr[36].main.temp - 273.15) ; //in C

  if (unit.checked) {
    day1temp = Math.round((day1temp * 5 / 9 ) + 32) ;
    day2temp = Math.round((day2temp * 5 / 9 ) + 32) ;
    day3temp = Math.round((day3temp * 5 / 9 ) + 32) ;
    day4temp = Math.round((day4temp * 5 / 9 ) + 32) ;
    day5temp = Math.round((day5temp * 5 / 9 ) + 32) ;
    document.getElementById("day1unitImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("day2unitImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("day3unitImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("day4unitImg").src = "assets/images/001lighticons-47.png" ;
    document.getElementById("day5unitImg").src = "assets/images/001lighticons-47.png" ;
  }
  else {
    document.getElementById("day1unitImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("day2unitImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("day3unitImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("day4unitImg").src = "assets/images/001lighticons-46.png" ;
    document.getElementById("day5unitImg").src = "assets/images/001lighticons-46.png" ;
  }

  document.getElementById("day1temp").innerHTML = day1temp ;
  document.getElementById("day2temp").innerHTML = day2temp ;
  document.getElementById("day3temp").innerHTML = day3temp ;
  document.getElementById("day4temp").innerHTML = day4temp ;
  document.getElementById("day5temp").innerHTML = day5temp ;

  document.getElementById("day1weather").innerHTML = day1weather ;
  document.getElementById("day2weather").innerHTML = day2weather ;
  document.getElementById("day3weather").innerHTML = day3weather ;
  document.getElementById("day4weather").innerHTML = day4weather ;
  document.getElementById("day5weather").innerHTML = day5weather ;

  setImage(day1weatherId, "day1weatherImg") ;
  setImage(day2weatherId, "day2weatherImg") ;
  setImage(day3weatherId, "day3weatherImg") ;
  setImage(day4weatherId, "day4weatherImg") ;
  setImage(day5weatherId, "day5weatherImg") ;

}

function windDir(deg) {
  if (deg >= 348.75 && deg < 11.25) {
    return "N" ;
  }
  else if (deg >= 11.25 && deg < 33.75) {
    return "NNE" ;
  }
  else if (deg >= 33.75 && deg < 56.25) {
    return "NE" ;
  }
  else if (deg >= 56.25 && deg < 78.75) {
    return "ENE" ;
  }
  else if (deg >= 78.75 && deg < 101.25) {
    return "E" ;
  }
  else if (deg >= 101.25 && deg < 123.75) {
    return "ESE" ;
  }
  else if (deg >= 123.75 && deg < 146.25) {
    return "SE" ;
  }
  else if (deg >= 146.25 && deg < 168.75) {
    return "SSE" ;
  }
  else if (deg >= 168.75 && deg < 191.25) {
    return "S" ;
  }
  else if (deg >= 191.25 && deg < 213.75) {
    return "SSW" ;
  }
  else if (deg >= 213.75 && deg < 236.25) {
    return "SW" ;
  }
  else if (deg >= 236.25 && deg < 258.75) {
    return "WSW" ;
  }
  else if (deg >= 258.75 && deg < 281.25) {
    return "W" ;
  }
  else if (deg >= 281.25 && deg < 303.75) {
    return "WNW" ;
  }
  else if (deg >= 303.75 && deg < 326.25) {
    return "NW" ;
  }
  else {
    return "NNW" ;
  }
}

function setImage(weatherId, eleId) {
  switch(weatherId) {
    //thunderstorm
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-15.png' height='60px' width='60px'>" ; break ;

    //drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-17.png' height='60px' width='60px'>" ; break ;

    //rain
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 511:
    case 520:
    case 521:
    case 522:
    case 531: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-18.png' height='60px' width='60px'>" ; break ;

    //snow
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-23.png' height='60px' width='60px'>" ; break ;

    //atmosp
    case 700:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
    case 761:
    case 762:
    case 771:
    case 781: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-10.png' height='60px' width='60px'>" ; break ;

    //clear
    case 800: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-02.png' height='60px' width='60px'>" ; break ;

    //clouds
    case 801:
    case 802:
    case 803:
    case 804: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-08.png' height='60px' width='60px'>" ; break ;

    //extreme
    case 900:
    case 901:
    case 902:
    case 903:
    case 904:
    case 905:
    case 906: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-20.png' height='60px' width='60px'>" ; break ;

    //additional
    case 951:
    case 952:
    case 953:
    case 954:
    case 955:
    case 956:
    case 957:
    case 958:
    case 959:
    case 960:
    case 961:
    case 962: document.getElementById(eleId).innerHTML="<img src='assets/images/001lighticons-08.png' height='60px' width='60px'>" ; break ;
    default:
  }
}
