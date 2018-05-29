function init(){
  $(".content").slick({adaptiveHeight:true});

  $(".menu_items > a").click(function(){
    var id = $(this).attr("id");

    if(id === "home"){
      $(".content").slick("slickUnfilter");
    } else if(id !== null){
      $(".content").slick("slickUnfilter");
      $(".content").slick("slickFilter", function(i, elem){
        if($(elem).html().indexOf(id) !== -1)
          return true;

        return false;
      }); 
    }
  });
}

$(document).ready(function(){
  // Loaded via <script> tag, create shortcut to access PDF.js exports.
  var pdfjsLib = window['pdfjs-dist/build/pdf'];

  //load in the resume
  var loadingTask = pdfjsLib.getDocument("slides/resume.pdf");
  loadingTask.promise.then(function(pdf) {
    console.log('PDF loaded');

    // Fetch the first page
    var pageNumber = 1;
    pdf.getPage(pageNumber).then(function(page) {
      console.log('Page loaded');

      var scale = 1.5;
      var viewport = page.getViewport(scale);

      // Prepare canvas using PDF page dimensions
      var canvas = document.getElementById('cv-resume');
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      // Render PDF page into canvas context
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      var renderTask = page.render(renderContext);
      renderTask.then(function () {
        console.log('Page rendered');
        init();
      });
    });
  }, function (reason) {
    // PDF loading error
    console.error(reason);
  });
});
