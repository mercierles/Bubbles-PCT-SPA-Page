var svgTrail, svgTrailLength,PCTMileageRatio,currentMileage;
function mapInit(){
    svgTrail = document.getElementById("Trail_Progress");
    svgTrailLength = Number(svgTrail.getTotalLength()).toFixed(2);
    PCTMileageRatio = Number((2650/svgTrailLength)).toFixed(2);
    
    svgTrail.style.strokeDasharray = svgTrailLength;
    svgTrail.style.strokeDashoffset = svgTrailLength;
    // drawTrail();
}

function drawTrail() {
    getCurrentMileMarker();
    currentMileage = Number((currentMileMarker/PCTMileageRatio)).toFixed(2); //replace with milageage retrieved from Instagrams latest post
    svgTrail.style.strokeDasharray = svgTrailLength;
    svgTrail.style.strokeDashoffset = svgTrailLength;
    svgTrail.style.strokeDashoffset = svgTrailLength - estimateTrailPosition();
}


function getCurrentMileMarker(){
	let caption = jQuery(".carousel-item.active .carousel-caption")[0].innerText;
	let splitCaption = caption.split("-")[0].split("|");
	if(splitCaption.length > 1){
		currentMileMarker = parseInt(splitCaption[2].split(":")[1].trim());
		console.log(currentMileMarker);
	}   
}

function estimateTrailPosition(){
    if(currentMileMarker > 100 && currentMileMarker < 600){
        return Number(currentMileage*0.8).toFixed(2);
    }else if(currentMileMarker < 2000){
        return Number(currentMileage*0.97).toFixed(2);
    }else{
        return Number(currentMileage).toFixed(2);
    }
}