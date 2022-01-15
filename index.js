import { Loader } from '@googlemaps/js-api-loader';

// React Wrapper
// https://www.npmjs.com/package/@googlemaps/react-wrapper

// https://github.com/google-map-react/google-map-react
// https://react-leaflet.js.org/

const homeLatLng = { lat: 30.245196, lng: 31.471146 };

function displayMap() {
  const mapOptions = {
    center: { lat: 30.2459413, lng: 31.4729483 },
    zoom: 15,

    // disableDefaultUI: true,
    // mapId: 'cbd32b6be2b31eb8',
  };

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);
  return map;
}

function addHomeMarker(map) {
  const marker = new google.maps.Marker({
    map,
    position: homeLatLng,
    title: 'Home',
    animation: google.maps.Animation.DROP,
    // draggable: true,
    // icon: './images/marker.png', // custom icon image
  });
  return marker;
}

function addPanToMarker(map, marker) {
  marker.addListener('click', e => {
    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    // Move the map center to a certain location
    map.panTo(location);
    map.setZoom(18);
    // new google.maps.InfoWindow(); # For tooltip
  });
}

const loader = new Loader({
  apiKey: process.env.API_KEY,
  // not rquired
  region: 'EG',
  language: 'ar',
});

loader.load().then(() => {
  const map = displayMap();
  const homeMarker = addHomeMarker(map);

  addPanToMarker(map, homeMarker);
});
