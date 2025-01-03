$(document).ready(function() {
    drawerFunc();
});

$(document).resize(function() {
    drawerFunc();
});

function drawerFunc() {
    $(document).on('click', '.js-drawer[data-id]', function(e) {
        e.preventDefault();
        var detailId = $(this).data('id'); 
        var drawer = $('.cp-drawer[id="' + detailId + '"]'); 
        drawer.addClass('active'); 
        $('body').addClass('cm-overflow-hidden');
        $('.cm-overlay').addClass('active');
    });

    $(document).on('click', '.cp-drawer .js-close-btn', function(e) {
        e.preventDefault();
        var drawer = $(this).closest('.cp-drawer'); 
        drawer.removeClass('active'); 
        $('body').removeClass('cm-overflow-hidden');
        $('.cm-overlay').removeClass('active');
    });

    $(document).on('click', '.cm-overlay', function(e) {
        e.preventDefault();
        $('.cp-drawer').removeClass('active'); 
        $('body').removeClass('cm-overflow-hidden');
        $('.cm-overlay').removeClass('active');
    });
}