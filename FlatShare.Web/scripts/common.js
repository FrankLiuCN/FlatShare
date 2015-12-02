$(function () {
    $('.datepicker').datepicker();
    $('.datepicker').css("z-index", "9999");
    $('table').on('click', 'tbody tr', function (event) {
        $('.click-highlight').removeClass('click-highlight');
        $(this).addClass("click-highlight");
    });
    app.value('$strapConfig', {
          datepicker: {
            language: 'fr',
            format: 'M d, yyyy'
          }
    });

});