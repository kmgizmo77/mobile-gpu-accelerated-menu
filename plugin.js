(function(win, doc){
    var requestAnimationFrame = win.requestAnimationFrame || win.mozRequestAnimationFrame ||
                  win.webkitRequestAnimationFrame || win.oRequestAnimationFrame;
    var scrollDirection = "none",
        previousYOffset = 0;
        isMenuHidden = false;
    win.onscroll = function() {
        clearTimeout(win.menuShowTimeout);                    
        win.menuShowTimeout = setTimeout(function() {
            win.showHideMenuOnScroll();
        }, 100);
    };
    win.showHideMenuOnScroll = function() {
        var scrollTop = doc.body.scrollTop || document.documentElement.scrollTop;
        if(previousYOffset == 0 && scrollDirection == "none") {
            previousYOffset = win.pageYOffset;
            return;
        }
        
        if(scrollTop <= 0) {
            doc.querySelector(".rn-header").classList.remove("slideUp");
            isMenuHidden = false;
            previousYOffset = win.pageYOffset;
            return;
        }
        if(win.innerHeight + scrollTop >= doc.body.offsetHeight) {
            doc.querySelector(".rn-header").classList.add("slideUp");
            isMenuHidden = true;
            previousYOffset = win.pageYOffset;
            return;
        }

        if(win.pageYOffset >= previousYOffset) {
            scrollDirection = "down";
        } else {
            scrollDirection = "up";
        }
        previousYOffset = win.pageYOffset;

        if(isMenuHidden && scrollDirection == "down") {
            return;
        } else
        if(!isMenuHidden && !scrollDirection == "up") {
            return;
        } else if(isMenuHidden && scrollDirection == "up") {
            doc.querySelector(".rn-header").classList.remove("slideUp");
            isMenuHidden = false;
        } else if(!isMenuHidden && scrollDirection == "down") {
            doc.querySelector(".rn-header").classList.add("slideUp");
            isMenuHidden = true;
        }
    };
})(window, document);