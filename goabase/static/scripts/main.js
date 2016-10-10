// import external dependencies
import 'jquery';
import 'bootstrap/dist/js/bootstrap'
import 'tether';
import 'react';
import 'underscore';

$(document).ready(() => {
    $('.navbar-search .btn').on('click', () => {
        $('.navbar-search').toggleClass('active');
    });

    const map = new google.maps.Map($('#map')[0], {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
});
