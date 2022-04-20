// Initialize LighterPack Data
function lighterPackInit(url){
	if(!url || url === ""){url = "https://lighterpack.com/r/c0z1be"}
	let itemID = "lighterPackData_"+url;
    let localstorageData = sessionHelper.getItem(itemID);
    if(!localstorageData){
        getLighterPackData(url);
    }else{
        popuplateLighterPackData(localstorageData);
    }
}

// Get LighterPack Data via PHP cURL Request
function getLighterPackData(url){
	$.ajax({
		type: "GET",
		url: "php/lighterPack.php",
		data:{
			lighterpackurl:url
		},
		beforeSend: function() {
			jQuery("#lighterPack .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#lighterPack .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			let jsonResponse = response;
			if(jsonResponse){
				sessionHelper.setItem("lighterPackData_"+url,jsonResponse);
				popuplateLighterPackData(jsonResponse);
			}else{
				console.log("Unable to retrieve LighterPack Data");
			}
		},
		error: function(response){
			console.log("Unable to retrieve LighterPack Data");
		}
	});
}

// Populate Results
function popuplateLighterPackData(data){
	jQuery("#lighterPackData").append(data);
    jQuery(".lpUnitDropdown, i, select.lpUnit, .lpWeightCell, .lpQtyCell, .lpActionsCell").remove();
	sessionHelper.addReadMore("lighterPack", "lighterPackData");
}