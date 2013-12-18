//$( document).on("pagebeforechange",function ( event,ui) {console.log("pagebeforechange "+ $($.mobile.activePage).attr("id"))});
//$( document).on("pagecreate",function ( event,ui) {console.log("pagecreate "+ $($.mobile.activePage).attr("id")) });
//$( document).on("pagebeforecreate",function ( event,ui) {console.log("pagebeforecreate " + $($.mobile.activePage).attr("id")) });
//$( document).on("pageinit",function ( event,ui) {
//	delete $lP;
//	console.log("pageinit "+ $($.mobile.activePage).attr("id"))
//	});

//$( document).on("pagebeforehide",function ( event,ui) {console.log("pagebeforehide "+ $($.mobile.activePage).attr("id")) });


$( document ).on( "pageshow", "[data-role='page'].afms-base", function() {
	var pageID = $( this ).attr( "id") ;
	setPageVisited(pageID);
	updateVistedList()
});


$( document ).on( "pageinit", "[data-role='page'].afms-base", function() {
			var page = "#" + $( this ).attr( "id" ),
			// Get the filename of the next page that we stored in the data-next attribute
				next = $( this ).jqmData( "next" ),
			// Get the filename of the previous page that we stored in the data-prev attribute
			prev = $( this ).jqmData( "prev" );	

			//console.log(next + ".html")
	
			// Check if we did set the data-next attribute
			if ( next ) {
				console.log(next + ".html")
				// Prefetch the next page
				//$.mobile.loadPage( next + ".html" );
				// Navigate to next page on swipe left
				$( document ).on( "swipeleft", page, function() {
					$.mobile.changePage( next + ".html" );
				});
			
			}
			// Disable the "next" button if there is no next page
			else {
				
			}
			// The same for the previous page (we set  so there is no need to prefetch)
			if ( prev ) {
				console.log(prev + ".html")
				$( document ).on( "swiperight", page, function() {
					$.mobile.changePage( prev + ".html", { reverse: true } );
				});
			}else {
			
			}
});


function setPageVisited(id){
	localStorage[id + "_visited"] = true;
	//console.log(id)
}

function getPageVisited(id){
	return localStorage[id + "_visited"];
}

function setPageFavorite(id){
	localStorage[id + "_favorite"] = true;
	//console.log(id)
}

function getPageFavorite(id){
	return localStorage[id + "_favorite"];
}

function updateVistedList() {
	
//	once for the panel lists
	var listItems = $(".panel-content ul li a");
	listItems.each(function(idx, li) {
		var pageURL = $(li).attr("href");
		var pageID = pageURL.substr(0,pageURL.indexOf("."))
		if(getPageFavorite(pageID)) {
			var listItem = $(li).parent().parent();
			var span = listItem.find("span")
			span.data('icon', 'star'); 
  			span.addClass("ui-icon-star").removeClass("ui-icon-arrow");
		}else if(getPageVisited(pageID)) {
			var listItem = $(li).parent().parent();
			var span = listItem.find("span")
			span.data('icon', 'check'); 
  			span.addClass("ui-icon-check").removeClass("ui-icon-arrow");
			//console.log("listItem: " + span.html());
		}
		//console.log("Page ID: " + pageID);
	});
	
//	once for the content lists on some pages
	listItems = $(".ui-content ul li a");
	listItems.each(function(idx, li) {
		var pageURL = $(li).attr("href");
		var pageID = pageURL.substr(0,pageURL.indexOf("."))
		if(getPageFavorite(pageID)) {
			var listItem = $(li).parent().parent();
			var span = listItem.find("span")
			span.data('icon', 'star'); 
  			span.addClass("ui-icon-star").removeClass("ui-icon-arrow");
		}else if(getPageVisited(pageID)) {
			var listItem = $(li).parent().parent();
			var span = listItem.find("span")
			span.data('icon', 'check'); 
  			span.addClass("ui-icon-check").removeClass("ui-icon-arrow");
			//console.log("listItem: " + span.html());
		}
		//console.log("Page ID: " + pageID);
	});
}

  function logEvent(event) {
      console.log(event.type);
  }
 
  window.applicationCache.addEventListener('checking',logEvent,false);
  window.applicationCache.addEventListener('noupdate',logEvent,false);
  window.applicationCache.addEventListener('downloading',logEvent,false);
  window.applicationCache.addEventListener('cached',logEvent,false);
  window.applicationCache.addEventListener('updateready',logEvent,false);
  window.applicationCache.addEventListener('obsolete',logEvent,false);
  window.applicationCache.addEventListener('error',logEvent,false);



