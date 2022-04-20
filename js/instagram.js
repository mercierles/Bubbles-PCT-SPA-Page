var currentMileMarker = Math.abs((new Date("2022-04-26") - new Date))/day * 15;

// Initialize
function instaInit(callback){
	let igData = sessionHelper.getItem("instagramData");
	if(!igData){
		getInstagramData(callback);
	}else{
		popuplateInstragramData(igData,callback);
	}
}

// Get Instagram Data via PHP call to Instagram API
function getInstagramData(callback){
	$.ajax({
		type: "GET",
		url: "php/instagramData.php",
		beforeSend: function() {
			jQuery("#instagram .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#instagram .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			// Populate 
			let jsonResponse = JSON.parse(response);
			if(jsonResponse){
				sessionHelper.setItem("instagramData",jsonResponse)
				popuplateInstragramData(jsonResponse,callback);
			}else{
				console.log("Unable to retrieve Instagram Data");
			}
		},
		error: function(response){
			console.log("Unable to retrieve Instagram Data");
		}
	});
}

// Populate results, callback to run next function if available
function popuplateInstragramData(data,callback){
	$('.carousel-inner').append('<div class="carousel-item active"><img class="section-instagram-post__img" src="'+data["main"][0]['url']+'"></div>');
	$('.section-instagram-caption')[0].innerText = data["main"][0]['caption'];
	data['children'].forEach(function(value,index){
		if(index!=0){
			$('.carousel-inner').append('<div class="carousel-item"><img class="section-instagram-post__img" src="'+value['url']+'"></div>');
		}
		if(index === data['children'].length-1){
			callback();
		}
	});
	callback();
}
