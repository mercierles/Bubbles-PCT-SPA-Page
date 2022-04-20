const activityType_Array = ['steps','elevation','floors','calories'];
const unitType_kvp = {steps:"steps",elevation:"feet", floors:"floors", calories:"calories"}

// Initialize
function fitbitInit(){
    // Poplate data from each activity
    activityType_Array.forEach(function(value){
        let localstorageData = sessionHelper.getItem("fitbitData_"+value);
        if(!localstorageData){
            getFitbitData(value);
        }else{
        	popuplateFitbitData(value,localstorageData);
        }
    });
}

// If there is an error, populate with data from localstorage if available
function getFitbitData(activityType){
	let date = new Date();
	date = new Date(date - (5*day));
	$.ajax({
		type: "GET",
        data: {
            action: activityType,
			date: date.toISOString().split("T")[0]
        },
		url: "php/fitbitData.php",
		beforeSend: function() {
			jQuery("#fitbit .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#fitbit .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			// Populate 
			let jsonResponse = JSON.parse(response);
			if(jsonResponse){
				sessionHelper.setItem("fitbitData_"+activityType,jsonResponse);
				popuplateFitbitData(activityType,jsonResponse);
			}else{
				console.log("Unable to retrieve Fitbit Data");
			}
		},
		error: function(response){
			console.log("Unable to retrieve Fitbit Data");
		}
	});
}

// Populate Results
function popuplateFitbitData(activityType, data){
	jQuery("#fitbitData").append('<div class="col-6 mb-5"><h5>Average '+activityType+' Per Day:</h5><span id="'+activityType+'">'+data+' '+unitType_kvp[activityType]+'</span></div>');
	jQuery("#fitbit .section__show-more").remove();
	sessionHelper.addReadMore("fitbit", "fitbitData");
}
