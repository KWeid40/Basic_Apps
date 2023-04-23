'use strict';

var map = L.map('map').setView([0, 0], 0);
const myIcon = L.icon({
  iconUrl: 'International_Space_Station.svg.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [-3, -76],
});
var marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

const ISSURL = 'https://api.wheretheiss.at/v1/satellites/25544';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap"</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, { attribution });
tiles.addTo(map);

function buttonClick() {
  setInterval(getISS, 1000);
}

async function getISS() {
  const response = await fetch(ISSURL);
  const data = await response.json();
  const { latitude, longitude } = data;

  document.getElementById('Lat').textContent = latitude.toFixed(2);
  document.getElementById('Lon').textContent = longitude.toFixed(2);
  marker.setLatLng([latitude, longitude]);
  map.setView([latitude, longitude]);
}
