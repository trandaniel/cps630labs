//{"id":2643743,"name":"London",
//"coord":{"lon":-0.12574,"lat":51.50853},
//"main":{"temp":274.034,"temp_min":274.034
//"temp_max":274.034,"pressure":1027.59,"sea_level":1035.46,"grnd_level":1027.59,"humidity":96},
//"dt":1486854542,"wind":{"speed":4.3,"deg":31.5007},
//"sys":{"country":"GB"},"clouds":{"all":88},
//"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}]}

function getWeather() {
  var key = "b43f49e52ab5d9256ec3c0806f19eb49" ;
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
  var cityName = response.name + ", " + response.sys.country ;
  var minTempInK = parseInt(response.main.min_temp) ;
  var tempInK = parseInt(response.main.temp) ;
  var maxTempInK = parseInt(response.main.max_temp) ;
  var pressure = parseInt(response.main.pressure) ;
  var humidity = parseInt(response.main.humidity) ;
  var windSpd = parseInt(response.wind.speed) ;
  var windDeg = parseInt(response.wind.deg) ;
  var weatherId = parseInt(response.weather.id) ;
  var clouds = parseInt(response.clouds.all) ;
  var weather = response.weather.main ;
  var weatherDes = response.weather.description ;

  var minTemp = minTempInK - 273.15 ; //in C
  var temp = tempInK - 273.15 ; //in C
  var maxTemp = maxTempInK - 273.15 ; //in C

  if (unit.checked) {
    minTemp = (minTemp - 32) * 5 / 9 ;
    temp = (temp - 32) * 5 / 9 ;
    maxTemp = (temp - 32) * 5 / 9 ;
  }

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
    case 232: break ;

    //drizzle
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321: break ;

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
    case 531: break ;

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
    case 622: break ;

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
    case 781: break ;

    //clear
    case 800: break ;

    //clouds
    case 801:
    case 802:
    case 803:
    case 804: break ;

    //extreme
    case 900:
    case 901:
    case 902:
    case 903:
    case 904:
    case 905:
    case 906: break ;

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
    case 962: break ;
    default:
  }

  display.innerHTML = temp ;

}
