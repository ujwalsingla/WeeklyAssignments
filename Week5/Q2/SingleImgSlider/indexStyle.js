var slides = document.getElementsByClassName("slides");
        var total_slides = document.getElementsByClassName("slides").length;
        var dots = ul.getElementsByTagName("li");
        var i,index = 0;

        document.getElementById("next").addEventListener("click",function(){
            for(i=0;i<total_slides;i++){
                index+=1;
                GoSlides(index);
            }
        })

        document.getElementById("prev").addEventListener("click",function(){
            for(i=0;i<total_slides;i++){
                index-=1;
                GoSlides(index);
            }
        })

        function GoSlides(x){
            if(x > total_slides-1){
                index=0;
            }
            if(x<0){
                index=total_slides-1;
            }
            if(x<total_slides && x>=0){
                index=x;
            }

            for(i=0;i<total_slides;i++){
                dots[i].classList.remove("active");
                slides[i].classList.remove("active");
            }
            dots[index].classList.add("active");
            slides[index].classList.add("active");
        }