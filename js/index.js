const sections = document.querySelectorAll(".section");
const observer = new IntersectionObserver(entries => {
     entries.forEach(entry => {
        if(entry.isIntersecting){
            // Load html instead of setting innerHTML (to prevent cross script attacks)
            jQuery(entry.target).load("./html/"+entry.target.id+".html", function(){
                if(entry.target.id === "instagram"){
                    instaInit(mapInit);
                    var myCarousel = document.querySelector('#instagram-carousel')
                    // var carousel = new bootstrap.Carousel(myCarousel,{interval: false})
                    myCarousel.addEventListener('slid.bs.carousel', function () {
                        drawTrail();
                    })
                }
                if(entry.target.id === "stats"){
                    fitbitInit();
                }
                entry.target.classList.toggle("section__show", entry.isIntersecting);
                observer.unobserve(entry.target);

            });            
        }
    });
},{threshold:0.2});

sections.forEach(section => {observer.observe(section)}); 