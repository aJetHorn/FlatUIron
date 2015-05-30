chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
      // var firstHref = $("a[href^='http']").eq(0).attr("href");

      // console.log(firstHref);
      // console.log("fuck you pussy");
      $("body").append("fuck.");
      $("#content").css('backgroundColor', 'black');
      //flatUIron();
      console.log(document.styleSheets);
    }
  }
);

function flatUIron(){
	//iterate over each element
	$('*').each(function(){
		console.log(this.css());
	});
}