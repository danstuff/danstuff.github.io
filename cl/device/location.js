var google_ok = false;

function gcb(){  google_ok = true; }

function fetchStreetAddress(callback){
  //uses HTML5 geolocation and google maps geocoding to output:
  //[street number] [street name].<br>
  if(!navigator.geolocation){
    callback("Location is not enabled on this device");
  }

  //try to fetch current latitude and longitude
  navigator.geolocation.getCurrentPosition(function(pos){
    if(!google_ok){
      callback("Failed to access Google Maps");
    }

    var geocoder = new google.maps.Geocoder();

    if(!geocoder){
      callback("Failed to access Google Maps geocoder");
    }

    var latlng = new google.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude);

    //try to geocode the current latitude and longitude
    geocoder.geocode({'latLng' : latlng}, function(results, status){
      if(status !== google.maps.GeocoderStatus.OK){
        callback("Google Maps geocoding failed");
      }

      var adr = results[0].address_components;
      var short_address = adr[0].short_name +" "+ adr[1].short_name;

      callback("", short_address);
    });
  })
}
