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
    tooltip_position: 'bottom',
  });

  const map = new google.maps.Map($('#map')[0], {
    center: {
      lat: 52.3764090,
      lng: 9.7540310,
    },
    zoom: 13,
    styles: mapStyles,
    mapTypeControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    streetViewControl: false,
  });

  const markers = [];

  $('.party-card').each((i, el) => {
    const position = $(el).data('location');
    const type = $(el).data('type');
    markers.push(new google.maps.Marker({
      position,
      map,
      icon: {
        url: `/static/images/map-marker-${type.replace('_', '-')}.svg`,
        optimized: false,
      },
    }));
  });
});
