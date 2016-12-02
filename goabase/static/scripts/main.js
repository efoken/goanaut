// import external dependencies
import 'jquery';
import 'tether';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap-slider';
import React from 'react';
import ReactDOM from 'react-dom';

import CountdownTimer from './components/CountdownTimer';
import MapSearchPage from './components/MapSearchPage';
import mapStyles from './map-styles';

$(document).ready(() => {
  $('.navbar-search .btn').on('click', () => {
    $('.navbar-search').toggleClass('active');
  });

  $('.custom-slider input').slider({
    tooltip: 'always',
    tooltip_position: 'bottom',
  });

  if ($('#map').length) {
    /* ReactDOM.render(
      <MapSearchPage />,
      $('.map-search')[0]
    ); */

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

    console.log(markers);
  }

  if ($('.party-location').length) {
    ReactDOM.render(
      <CountdownTimer initialTimeRemaining={$('.countdown').data('initialTimeRemaining')} />,
      $('.countdown')[0]
    );

    const map = new google.maps.Map($('.party-location')[0], {
      center: $('.party').data('location'),
      zoom: 13,
      styles: mapStyles,
      disableDefaultUI: true,
    });

    const marker = new google.maps.Marker({
      position: $('.party').data('location'),
      map,
      icon: {
        url: `/static/images/map-marker-${$('.party').data('type').replace('_', '-')}.svg`,
        optimized: false,
      },
    });

    console.log(marker);
  }
});
