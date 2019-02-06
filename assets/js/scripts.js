// This document controls navigation and dispaying various sections
$(document).ready(function() {
  var currentFragment = window.location.hash ? (window.location.hash[0] + '_' + window.location.hash.slice(1)) : '#_welcome';
  navigate(currentFragment);
  $('body').fadeIn(600);
  $('nav.main>ul').addClass('instant');

  $('a.section-link').click(function(e) {
    pauseVideos();
    $('.reveal').removeClass('reveal');
    var selected = $(this).attr('href');
    selected = selected[0] + '_' + selected.slice(1);
    e.preventDefault();
    var fragment = $(this).attr('data-fragment') || null;
    navigate(selected, fragment);
  });

  function navigate(link, fragment) {
  // Make active section non-active

    $('.section.active').removeClass('active').hide();
    $('.selected').removeClass('selected');

    $('.section' + link).addClass('active').show();
    $('.section' + link).addClass('show');

    $('a.section-link[href=#' + link.split('_')[1] + ']').addClass('selected');

    $('html, body').animate({scrollTop: 0}, 300);

    history.replaceState(null, '', link.split('_').join(''));
  }

  // Resets all iframes with class="video"
  function pauseVideos(){
    var link = $('.selected').attr('href');
    link = link[0] + '_' + link.slice(1);

    var frames = $('.section' + link + ' iframe.video')
    framesLength = frames.length; 

    for (var i=0; i<framesLength; i++){
      frames[i].src = frames[i].src; 
    }
  }

});