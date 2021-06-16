
$(document).ready(function () {
  
	
    // footer menu
    $(".footer .foot-btn ").click(function () {
        $(".footer .foot-btn ").removeClass("active");
        $(this).addClass("active");
    });

    //header scroll add class
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 45) {
            $(".header").addClass("opaque");

        } else {
            $(".header").removeClass("opaque");
        }
    });
    
    // side nav
    $(".header .ic-menu").on("click", function () {
        $(".mask").fadeIn();
        $(".nav-side").addClass("fadeInLeft");
    });

    $(".mask, .nav-side .menu-inner li").on("click", function () {
        $(".mask").fadeOut();
        $(".nav-side").removeClass("fadeInLeft");
    });
  

    $('.bg-casino .tab-item').click(function(e) {
        event.preventDefault();
        var tab_id = $(this).attr('data-tab');
        $(this).addClass('active').siblings().removeClass('active');
        $("#" + tab_id).addClass('show').siblings().removeClass('show');
        
    });
	
});

// 視窗高度
window.onload = function () {
    var screenHeight = document.documentElement.clientHeight;
    $(".main-content").css("min-height", screenHeight);
}









