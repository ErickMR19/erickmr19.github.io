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
    console.log({
        name: name,
        phone: phone,
        email: email,
        message: message
    });
    jQuery.ajax({
        url: "././mail/contact_me.php",
        type: "POST",
        data: {
            name: name,
            phone: phone,
            email: email,
            message: message
        },
        cache: false,
        success: function () {
            Materialize.toast('Muchas gracias, su mensaje fue enviado exitosamente', 4000);
            //clear all fields
            jQuery('#contactForm').trigger("reset");
        },
        error: function () {
            // Fail message
            Materialize.toast('<p>Ocurrió un error. Por favor inténtelo luego o escriba un correo a <br /><a href="mailto:erickmadrigalrios@gmail.com">erickmadrigalrios@gmail.com</a></p>', 4000, 'toast-error');
        }
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

(function ($) {
    "use strict";
    var removeChildOnce;
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
    });
}(jQuery));
