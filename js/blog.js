// Initialize Blog Data
function blogInit(blogPost){
	if(!blogPost || blogPost === ""){
		getBlogData(blogPost);
	}else{
		let itemID = "blogData_"+blogPost.split("/")[2].split(".")[0];
		let localstorageData = sessionHelper.getItem(itemID);
		if(!localstorageData){
			getBlogData(blogPost);
		}else{
			popuplateBlogData(localstorageData);
		}
	}
}

// Get Blog Data via PHP cURL Request
function getBlogData(blogPost){
	$.ajax({
		type: "GET",
		url: "php/blog.php",
		data:{
			fileName:blogPost
		},
		beforeSend: function() {
			jQuery("#blog .section-title").addClass("section-title--loading");
		},
		complete: function(){
			jQuery("#blog .section-title").removeClass("section-title--loading");
		},
		success: function(response){
			let jsonResponse = JSON.parse(response);
			if(jsonResponse != "File not found"){
				if(jQuery("#blogDate option[value='select']").length == 1){
					popuplateDropDown(jsonResponse[0], jsonResponse[2]);
				}
				popuplateBlogData(jsonResponse[1]);
				sessionHelper.setItem("blogData_"+jsonResponse[2].split("/")[2].split(".")[0], jsonResponse[1]);
			}else{
				jQuery("#blog").remove();
			}

		},
		error: function(response){
			console.log("Unable to retrieve Blog Data");
		}
	});
}

// Populate Results
function popuplateBlogData(data){
	jQuery("#blog").children().show();
	jQuery("#blogData").append("<pre>"+data+"</pre>");
	sessionHelper.addReadMore("blog", "blogData");
}

// Populate Results
function popuplateDropDown(data, fileName){
	data.forEach(function(item,index){
		let selected;
		if(item.split("/")[2] === fileName){
			jQuery("#blogDate").append("<option value='"+item+"' selected>"+item.split("/")[2].split(".")[0]+"</option>");
		}else{
			jQuery("#blogDate").append("<option value='"+item+"'>"+item.split("/")[2].split(".")[0]+"</option>");
		}
	})
	jQuery("option[value*='select']").remove();
}