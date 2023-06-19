/* eslint-disabled */

console.log('Client says HII');
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiYW5lZXMxMDEiLCJhIjoiY2xqMm5ka2F3MTIzZTNlb3hjdWNuajJneCJ9.CK4y7LAubb_EKeRqn6BDnA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/anees101/clj2nhg8j00fs01qqgyin2xmk',
  scrollZoom: false,
  //   center: [-118.113491, 34.111745],
  //   zoom: 8,
  //   interactive: false
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  // create marker
  const el = document.createElement('div');
  el.className = 'marker';

  // add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // add popup
  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);

  // extends map bounds to the current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
