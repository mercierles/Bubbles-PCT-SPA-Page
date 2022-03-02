// Calculate Time
// const minute = 1000 * 60;
// const hour = minute * 60;
// const day = hour * 24;
// const year = day * 365;
// const sessionExpireTime = year;
// sessionItem = localStorage.getItem("fitbitData");
// const activityType_Array = ['steps','elevation','floors','calories'];
const activityType_Array = ['steps'];
// Initialize
function fitbitInit(){
    // Poplate data from each activity
    activityType_Array.forEach(function(value){
        let localstorageData = localStorage.getItem("fitbitData_"+value);
        if(!localstorageData){
            getFitbitData(value);
        }else{
            let temp = JSON.parse(localstorageData);
            let oldDate = Math.round(new Date(temp.key).getTime());
            let newDate = Math.round(new Date().getTime());  
            if ((newDate-oldDate) > sessionExpireTime) {
                getFitbitData(value);
            }else{
                popuplateFitbitData(temp.value);
            }
        }
    })
}

// If there is an error, populate with data from localstorage if available
function getFitbitData(activityType){
	$.ajax({
		type: "POST",
        data: {
            action: activityType
        },
		url: "php/fitbitData.php",
		success: function(response){
			// Populate 
			let jsonResponse = JSON.parse(response);
			if(jsonResponse){
				let fitbitDataObject = {key:new Date(),value:jsonResponse};
				localStorage.setItem("fitbitData_"+activityType,JSON.stringify(fitbitDataObject));
				popuplateFitbitData(fitbitDataObject.value);
			}else{
				popuplateFitbitDataFromLocalStorage();
			}
		},
		error: function(response){
			popuplateFitbitDataFromLocalStorage();
		}
	});

	// Using Test Data from Instagram
	// let instagramDataObject = {key:new Date(),value:JSON.parse('{"key":"2022-02-22T00:12:05.308Z","value":[{"id":"17957526469176359","caption":"PCT2022|LewisBurg,CA|Mile:800 - Appalachian Trail complete!\\n\\n#at2018 #at2018thruhike #appalachiantrail #appalachiantrail2018","media_url":"https://scontent-ort2-1.cdninstagram.com/v/t51.2885-15/42431696_1990653351016438_4219257434892460822_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=cP-f98psfDYAX8OnVZo&_nc_ht=scontent-ort2-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT9hzTf6tdSQGVy-yA77Ml8FP17PcLbF4yZVsf7iUB_-Iw&oe=6219F713"},{"id":"17970968002096395","caption":"PCT2022|Hardberg,CA|Mile:2000 - Crushed the 100 mile wilderness with a huge 42 mile day!","media_url":"https://scontent-ort2-1.cdninstagram.com/v/t51.2885-15/42704527_266370094007919_4615885717418227146_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=N4cbUkPZ2msAX_xZ0Gg&_nc_ht=scontent-ort2-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT_BlIyIgzcI7wo6YyTTTU08pKfap3Ppp0nYIycmMoyhrA&oe=621874B2"},{"id":"17947858612139475","caption":"PCT2022|LewisBurg,CA|Mile:10 - 500 miles to go!","media_url":"https://scontent-ort2-1.cdninstagram.com/v/t51.2885-15/39381484_1943535082359497_3690923018181148672_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=EBapOfZjkrMAX8R9wvZ&_nc_oc=AQkVRoJ5Od7Thsiqq99jX1D_nERTqe7rB_K7SZfmfia2VmGXudT0qle2LyTEEUXf_o8&_nc_ht=scontent-ort2-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT9v_xlwq440wnqOp5lyebqmaMpbKrW-hmykQXpmEqBmZw&oe=6219DB95"},{"id":"17958776269031545","caption":"Made it halfway through the AT! Crushed the half gallon challenge in 16min 23sec. #appalachiantrail #appalachiantrail2018 #at2018","media_url":"https://scontent-ort2-1.cdninstagram.com/v/t51.2885-15/36540142_2131800540367865_8924479601959239680_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8ae9d6&_nc_ohc=v_Axy6L-dqsAX_1QLIe&_nc_ht=scontent-ort2-1.cdninstagram.com&edm=ANo9K5cEAAAA&oh=00_AT-TsrQ2M0laL1XxFBdhlxnCCZCvQORzdL7iY-lWj5-hdQ&oe=621A04F1"}]}').value};
	// localStorage.setItem("instagramData",JSON.stringify(instagramDataObject));
	// popuplateInstragramData(instagramDataObject.value);

}

// // Populate Instagram with old data if available
function popuplateFitbitDataFromLocalStorage(activityType){
	let temp = JSON.parse(localStorage.getItem("fitbitData_"+activityType));
	if(temp){
		popuplateFitbitData(temp.value);
	}else{
		console.log("Unable to retrieve Data.");
	}
}

function popuplateFitbitData(activityType, data){
    console.log("TODO: Implement popuplateFitbitData()")
	for( x in data){
		// Add data/stats to page
	}
}
