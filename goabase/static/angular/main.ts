import $ = require('jquery');
import mapStyles from './mapStyles';

$(document).ready(() => {
  const $navbarSearch = $('.navbar-search');

  $navbarSearch.find('.btn').on('click', () => {
    $navbarSearch.toggleClass('active');
  });

  $('.custom-slider input').slider({
    tooltip: 'always',
  });

  // const l = new SignupLoginModal();
  // l.init();

  const $map = $('#map');

  if ($map.length) {
    const map = new google.maps.Map($map[0], {
      center: {
        lat: 52.3764090,
        lng: 9.7540310,
      },
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyles,
      zoom: 13,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });

    const markers = [];

    $('.party-card').each((_0, el) => {
      const position = $(el).data('location');
      const type = $(el).data('type');

      markers.push(new google.maps.Marker({
        map,
        position,
        icon: {
          url: `/static/images/map-marker-${type.replace('_', '-')}.svg`,
        },
        optimized: false,
      }));
    });
  }

  const $partyLocation = $('.party-location');

  if ($partyLocation.length) {
    // ReactDOM.render(
    //   <CountdownTimer initialTimeRemaining={$('.countdown').data('initialTimeRemaining')} />,
    //   $('.countdown')[0]
    // );

    const map = new google.maps.Map($partyLocation[0], {
      center: $('.party').data('location'),
      disableDefaultUI: true,
      styles: mapStyles,
      zoom: 13,
    });

    new google.maps.Marker({
      map,
      icon: {
        url: `/static/images/map-marker-${$('.party').data('type').replace('_', '-')}.svg`,
      },
      optimized: false,
      position: $('.party').data('location'),
    });
  }
});
