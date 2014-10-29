window.onload = function(){
  var container = document.querySelector('#container');
  var msnry = new Masonry( container, {
    // options
    columnWidth: 100,
    itemSelector: '.article'
  });
};