var lat2 = 42.741;
var lon2 = -71.3161;
var lat1 = 42.806911;
var lon1 = -71.290611;

var R = 6371; // km

var curLat ;
var curLng ;

onmessage = function(e) {

  var location = e.data.split(', ') ;
  curLat = parseFloat(location[2]) ;
  curLng = parseFloat(location[3]) ;
  postMessage(calculateDist(parseFloat(location[0]), parseFloat(location[1]))) ;

} ;


function calculateDist(lat, lng) {
  var dLat = (lat - curLat).toRad() ;
  var dLng = (lng - curLng).toRad() ;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(curLat.toRad()) * Math.cos(lat.toRad()) *
          Math.sin(dLng/2) * Math.sin(dLng/2) ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) ;
  console.log(R * c) ;
  return R * c ;
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}
