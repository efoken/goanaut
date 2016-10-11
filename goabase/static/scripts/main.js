// import external dependencies
import 'jquery';
import 'tether';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-slider';
import 'react';
import 'underscore';

import mapStyles from './map-styles';

$(document).ready(() => {
  $('.navbar-search .btn').on('click', () => {
    $('.navbar-search').toggleClass('active');
  });

  $('.custom-slider input').slider({
    tooltip: 'always',
  });

  const map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 52.3764090,
      lng: 9.7540310,
    },
    zoom: 13,
    styles: mapStyles,
  });
  console.log(map);
});
