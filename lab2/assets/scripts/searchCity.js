var key = "b43f49e52ab5d9256ec3c0806f19eb49" ;
var apiSearch = "http://api.openweathermap.org/data/2.5/find?q=" ;
var searchCond = "&type=like&cnt=10&appid=" ;
var input = document.getElementById("inputStatus") ;
function searchCities() {
  var xmlhttp = new XMLHttpRequest() ;
  var url = apiSearch + input.value + searchCond + key ;

  xmlhttp.onreadystatechange = function() {
    if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      findCities(xmlhttp.responseText) ;
    }
  } ;

  xmlhttp.open("GET", url, true) ;
  xmlhttp.send() ;
}

function findCities(response) {
  var out = "" ;
  var jsonArr = JSON.parse(response) ;
  for(var i = 0 ; i < jsonArr.list.length ; i++) {
    out += "<option value =\"" + jsonArr.list[i].name + ", " + jsonArr.list[i].sys.country +
    "\" onclick=\"getWeather(" + jsonArr.list[i] +")\"></option>" ;
  }
  document.getElementById("cities").innerHTML = out ;
}
