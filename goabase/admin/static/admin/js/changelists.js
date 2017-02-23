(function($) {
  $(document).ready(function() {
    $('#action-toggle, .action-select')
      .wrap('<label class="custom-checkbox"></label>')
      .after('<span class="custom-checkbox-indicator"></span>');

    $('.action-select').on('change', function() {
      $(this)
        .parents('.action-checkbox').removeClass('selected')
        .parent()
          .toggleClass('selected', this.checked);
    });

    $('#action-toggle').on('change', function() {
      $('.action-select').trigger('change');
    });
  });
}(django.jQuery));
