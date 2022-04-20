// Setup IntersectionObserver for Lazy Loading
const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {
        if(entry.isIntersecting){
            // Load html instead of setting innerHTML (to prevent cross script attacks)
            jQuery(entry.target).load("./html/"+entry.target.id+".html", function(){
                if(entry.target.id === "instagram"){
                    instaInit(mapInit);
                    var myCarousel = document.querySelector('#instagram-carousel')
                }else if(entry.target.id === "fitbit"){
                    fitbitInit();
                }else if(entry.target.id === "lighterPack"){
                    lighterPackInit();
                }else if(entry.target.id === "blog"){
                    blogInit();
                }
                entry.target.classList.toggle("section__show", entry.isIntersecting);
                observer.unobserve(entry.target);

            });            
        }
    });
},{rootMargin: '40%'});

sections.forEach(section => {observer.observe(section)}); 


function addReadMore(){
    // Haven't resized in 100ms!
    // console.log("Resize");
    jQuery("section .section__overflow").each(function(index, item){
        let id = jQuery(this).parent()[0].id;
        let section = jQuery(this)[0].firstElementChild.id;
        // console.log(id);
        // console.log(section);
        jQuery("#"+id+" .section__show-more").remove();
        sessionHelper.addReadMore(id, section);
        // console.log(item);
    });
}

var timeout;
window.onresize = function(){
  clearTimeout(timeout);
  timeout = setTimeout(addReadMore, 500);
};