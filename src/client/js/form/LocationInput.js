/*Generic input box
    args:
    {
        name: string //name of input, label
        semanticName: string //name for autocomplete
        icon: string //font-awesome icon name
        vaildate: function //callback function to validate input value
        value: function //callback on change
    }
*/

var LocationInput = {
    controller: function(){
      this.loadMap = function(){
        L.mapbox.accessToken = 'pk.eyJ1Ijoid29sa2VubWFjaGluZSIsImEiOiI5U21YdzNNIn0.cSp-n-GPeSBvZzqZYuxbbg';

        var map = L.mapbox.map('map', 'mapbox.streets');
                map.setView([51.42017745971680, 5.47374010086060], 16);

                var downIcon = L.icon({
                	iconUrl: 'img/mapmarker2_down.png',
                	iconRetinaUrl: 'img/mapmarker2_down.png',
                	iconSize: [50, 50],
                	iconAnchor: [25, 40]
                });

                var upIcon = L.icon({
                	iconUrl: 'img/mapmarker2_up.png',
                	iconRetinaUrl: 'img/mapmarker2_up.png',
                	iconSize: [50, 50],
                	iconAnchor: [25, 40]
                });

            var marker = L.marker([51.42017745971680, 5.47374010086060], {
                icon: downIcon
            });

            marker.addTo(map);

            map.addEventListener('move', function(e){
                marker.setLatLng(map.getCenter());
            }, false);

            map.addEventListener('mousedown', function(e){
                marker.setIcon(upIcon);
            }, false);

            window.addEventListener('mouseup', function(e){
                marker.setIcon(downIcon);
                open311.latlng(marker.getLatLng());
            }, false);
            // This uses the HTML5 geolocation API, which is available on
            // most mobile browsers and modern browsers, but not in Internet Explorer
            //
            // See this chart of compatibility for details:
            // http://caniuse.com/#feat=geolocation
            if (!navigator.geolocation) {
              alert('Locatiebepaling wordt niet ondersteund');
            } else {
              //e.preventDefault();
              //e.stopPropagation();
              map.locate();
            }
            // Once we've got a position, zoom and center the map
            // on it, and add a single marker.
            map.on('locationfound', function(e) {
              map.fitBounds(e.bounds);
              marker.setLatLng(map.getCenter());
            });

            // If the user chooses not to allow their location
            // to be shared, display an error message.
            map.on('locationerror', function() {
              alert('Kan geen locatie bepalen.');
            });
        };
    },

  view: function(ctrl){
    return m("div", [
      m.component(InputLabel, {name: "Locatie", icon: "map-marker"}),
      m("div", {id:"map", class: "map-box" , config:ctrl.loadMap})
    ]);
  }
};
