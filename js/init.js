/*global
    jQuery, console, Materialize
*/
function sendEmail(form) {
    "use strict";
    var name, email, phone, message;
    // get values from FORM
    name = form.elements.name.value;
    email = form.elements.email.value;
    phone = form.elements.phone.value;
    message = form.elements.message.value;
    fetch('https://contact-form-api.erickmadrigalrios.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        })
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Email request failed');
        }
        Materialize.toast('Thanks. Succesfully sent', 4000);
        //clear all fields
        jQuery('#contactForm').trigger("reset");
    }).catch(function () {
        // Fail message
        Materialize.toast('<p>Sorry, the message cannot be sended. Please write an email to <br /><a href="mailto:erickmadrigalrios@gmail.com">erickmadrigalrios@gmail.com</a></p>', 4000, 'toast-error');
    });
    return false;
}

function changeClassCards() {
    "use strict";
    if (window.innerWidth > 600) {
        jQuery('.card').addClass('horizontal');
    } else {
        jQuery('.card').removeClass('horizontal');
    }
}

var showModal;

(function ($) {
    "use strict";
    var removeChildOnce;
    $('.modal').modal();
    showModal = function(selector) {
        var imageUrl = document.querySelector(selector + ' .image-placeholder').dataset.src;
        if (imageUrl === "") {
            $(selector).modal('open');
        } else {
            var img = new Image();
            document.querySelector(selector + ' .image-placeholder').dataset.src = "";
            img.onload = function () {
                document.querySelector(selector + ' .image-placeholder').append(img);
               $(selector).modal('open');
            }
            img.alt = "";
            img.className = "responsive-img";
            img.style.border = "1px solid black";
            img.src = imageUrl;
        }
    }
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    };
    function invoqueOnce(fTI) {
        var invoqued, functionToInvoque;
        invoqued = true;
        functionToInvoque = fTI || null;
        return {
            invoque: function () {
                if (invoqued && functionToInvoque) {
                    invoqued = false;
                    return functionToInvoque();
                }
                return null;
            }
        };
    }
    removeChildOnce = invoqueOnce(
        function () {
            return document.body.removeChild($('#index-banner')[0]);
        }
    );

    function goToContent() {
        $('html, body').animate({
            scrollTop: $('#index-banner').height()
        },
            1000,
            "swing",
            function () {
                $('#main-nav').css("position", "fixed");
                $('#presentation').css("margin-top", 64);
                removeChildOnce.invoque();
                window.scrollTo(0, 0);
            }
            );
    }
    $(document).ready(function () {
        var offset, options;
        changeClassCards();
        $('.parallax').parallax();
        $('.button-collapse').sideNav({
            closeOnClick: true
        });
        offset = $('#index-banner').height();
        options = [{
            selector: '#index-banner',
            offset: offset,
            callback: goToContent
        }];
        Materialize.scrollFire(options);
        $('.scrollspy').scrollSpy({
            scrollOffset: 40,
            getActiveElement: function (id) {
                return 'a[href="#' + id + '"]';
            }
        });
        $(window).resize(changeClassCards);
        
        var priorityList = document.querySelectorAll('img.delayPriority');
        var list = document.querySelectorAll('img.delay');
        
        var onComplete = doOtherPriorities(priorityList.length);
        
        function getFirstClassImages() {
            Array.prototype.forEach.call(priorityList, function (img) {
              img.onload = onComplete;
              img.src = img.dataset.src;
            });
        }
        
        setTimeout(getFirstClassImages, 100);
        
        function doOtherPriorities(n) {
            var count = n;
            return function() {
                --count;
                if(count === 0) {
                    Array.prototype.forEach.call(list, function (img) {
                      img.src = img.dataset.src;
                    });
                    document.querySelector('.lds-ellipsis').style.display = 'none';
                    Array.prototype.forEach.call(document.querySelectorAll('.text-box p'), function(p) { p.style.display = 'inline';});
                    document.documentElement.style.overflow = "unset";
                    document.body.style.overflow = "unset";
                }
            }
        }
        
        document.getElementById("index-banner").addEventListener('mousemove', changeLogoPersective);
        document.getElementById("index-banner").addEventListener('touchmove', changeLogoPersectiveTouch);
        
        function changeLogoPersective(event){
            event.preventDefault();
            var pos = [event.pageX / document.body.clientWidth, event.pageY / document.body.clientHeight];
            for (var i=0;i < pos.length;i++) {
                if (pos[i]<0) {
                    pos[i] = 0;
                }
                if (pos[i]>1) {
                    pos[i] = 1;
                }
            }
            pos[0] = Math.round(((pos[0]*2)-1)*18);
            pos[1] = Math.round(((pos[1]*-2)+1)*18);
            document.getElementById("logo").style.transform = "perspective( 750px) rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)";
        }
        
        
        function changeLogoPersectiveTouch(touch){
            touch.preventDefault();
            var event = touch.changedTouches[0];
            var pos = [event.pageX / document.body.clientWidth, event.pageY / document.body.clientHeight];
            for (var i=0;i < pos.length;i++) {
                if (pos[i]<0) {
                    pos[i] = 0;
                }
                if (pos[i]>1) {
                    pos[i] = 1;
                }
            }
            pos[0] = Math.round(((pos[0]*2)-1)*18);
            pos[1] = Math.round(((pos[1]*-2)+1)*18);
            document.getElementById("logo").style.transform = "perspective( 600px) rotateX("+pos[1]+"deg) rotateY("+pos[0]+"deg)";
        }
    });
}(jQuery));
