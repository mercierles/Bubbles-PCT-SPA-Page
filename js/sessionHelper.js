// Calculate Time
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const year = day * 365;
const sessionExpireTime = 1;

// Create Namespace for these Global variable
var sessionHelper = {};
sessionHelper.getItem = function(storageKey){
    let storageValue = localStorage.getItem(storageKey);
	if(storageValue){
        let temp = JSON.parse(storageValue);
        let oldDate = Math.round(new Date(temp.key).getTime());
        let newDate = Math.round(new Date().getTime());  
        if ((newDate-oldDate) < sessionExpireTime) {
            return temp.value;
        }
    }
    return null;
}

sessionHelper.setItem = function(storageKey,storageValue){
    let dataObject = {key:new Date(),value:storageValue};
    localStorage.setItem(storageKey,JSON.stringify(dataObject));
}