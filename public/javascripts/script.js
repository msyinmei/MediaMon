window.onload = function(){

  $(document).ready(function(){
    var $container = $('.container');

      $container.masonry({
        itemSelector        : '.content',
        columnWidth         : '.content',
        transitionDuration  : 0
      });
    });

};