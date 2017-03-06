var holder = document.getElementById('holder'),
state = document.getElementById('status');
var displayLocation = document.getElementById('currentLocation') ;
var curLat = 43.65748683 ;
var curLong = -79.37176122 ;
var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ;
var labelIndex = 0 ;
var currentLabel = 0 ;
var currentLabAdd = 0 ;
var markers = [] ;
var locations = [] ;
var w = undefined ; //webworker

if (typeof window.FileReader === 'undefined') {
  state.className = 'fail';
} else {
  state.className = 'success';
  state.innerHTML = 'File API & FileReader available';
}

holder.ondragover = function() {
  this.className = 'hover';
  return false;
};
holder.ondragend = function() {
  this.className = '';
  return false;
};
holder.ondrop = function(e) {
  this.className = '';
  e.preventDefault();

  var file = e.dataTransfer.files[0],
  reader = new FileReader();
  reader.onload = function(event) {
    console.log(event.target);

    locations = event.target.result.split("\n") ;
    clearMarkers() ;
    addMarkers(locations) ;
    currentLabel = 0 ;
    currentLabAdd = 0 ;
    displayInfo(locations) ;
  };
  console.log(file);
  reader.readAsText(file);

  return false;
};

function clearMarkers() {
  for (var i = 0 ; i < markers.length ; i ++) {
    markers[i].setMap(null) ;
  }
  markers = [] ;
  labelIndex = 0 ;
}

function addMarkers(places) {
  for (var i = 0 ; i < places.length ; i++) {
    var temp = places[i].split(", ") ;
    markers.push(new google.maps.Marker({position: new google.maps.LatLng(parseFloat(temp[0]), parseFloat(temp[1])),
      label: labels[labelIndex++ % labels.length]
    })) ;
    markers[i].setMap(map) ;
  }
}

function displayInfo(locationArr) {
  console.log("hi") ;
  var out = "<table><tr><th>Marker</th><th>Distance from Current Location</th><th>Address</th></tr>" ;
  startWorker() ;
  for (var i = 0 ; i < locationArr.length - 1; i++) {
    out += "<tr><td>" + labels[i] + "</td><td id='" + labels[i] + "'>" ;
    w.postMessage(locationArr[i] + ", " + curLat + ", " + curLong) ;
    //console.log("msg sent") ;
    var latlngStr = locationArr[i].split(', ') ;
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])} ;
    out += "</td><td id='" + labels[i] + "A'>" ;
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          document.getElementById(labels[currentLabAdd++] + 'A').innerHTML = results[1].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    out += "</td></tr>" ;

  }

  // stopWorker() ;
  out += "</table>" ;
  document.getElementById("locationInfo").innerHTML = out ;
}

function startWorker() {
  if(typeof(Worker) !== "undefined") {
    if(typeof(w) == "undefined") {
      w = new Worker("calculateDist.js");
      console.log("worker ok") ;
      // w.postMessage("hi worker") ;
    }
    w.onmessage = function(e) {
      console.log(labels[currentLabel])
      document.getElementById(labels[currentLabel++]).innerHTML = parseFloat(e.data).toFixed(2) + "km" ;
    } ;
  }
  else {
    alert("no working") ;
  }
}

function stopWorker() {
  w.terminate();
  w = undefined;
}

function showPosition(position) {
  curLong = position.coords.longitude ;
  curLat = position.coords.latitude ;
  currentPos.setMap(null) ;

  currentPos.position = new google.maps.LatLng(curLat, curLong);
  map.center.lat = curLat ;
  map.center.lng = curLong ;
  currentPos.setMap(map) ;
  
}

function findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition) ;
  }
  else {
    displayLocation.innerHTML = "Geolocation is not supported or you did not give permission to use your location." ;
  }
}

function myMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: {lat: curLat, lng: curLong}
  });

  currentPos = new google.maps.Marker({
    position: new google.maps.LatLng(curLat, curLong),
  }) ;

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    currentLabel = 0 ;
    currentLabAdd = 0 ;
    displayInfo(locations) ;
  });

  geocoder = new google.maps.Geocoder ;

  currentPos.setMap(map) ;
}

function placeMarker(location) {
  currentPos.setMap(null) ;
  currentPos = new google.maps.Marker({
    position: location,
    map: map
  });
  console.log(location) ;
  curLat = location.lat() ;
  curLong = location.lng() ;
  currentPos.setMap(map) ;
}
