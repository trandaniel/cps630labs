function searchCities() {
  var key = credentials.apikey ;
  var apiSearch = "http://api.openweathermap.org/data/2.5/find?q=" ;
  var searchCond = "&type=like&appid=" ;
  var input = document.getElementById("inputStatus") ;
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
    out += "<option value =\"" + jsonArr.list[i].name + ", " + jsonArr.list[i].sys.country + "\"></option>" ;
  }
  document.getElementById("cities").innerHTML = out ;
}
