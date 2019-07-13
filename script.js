(function () {
    // invocation

    // Tween();
    scrollMagic();
    ChoosePrice();
    sendPhone();


    /////Gsap

    function scrollMagic() {
        console.log(com.greensock.plugins.ScrollToPlugin.version);
        // Init controller
        var controller = new ScrollMagic.Controller({
            globalSceneOptions: {
                duration: $('.screen').height(),
                triggerHook: .025,
                reverse: true
            },
            vertical: false
        });


        var scenes = {

            'scene2': {
                'screen1': 'anchor1'
            },
            'scene3': {
                'screen2': 'anchor2'
            },
            'scene4': {
                'screen3': 'anchor3'
            }
        }

        for (var key in scenes) {
            if (!scenes.hasOwnProperty(key)) continue;
            var obj = scenes[key];
            for (var prop in obj) {
                if (!obj.hasOwnProperty(prop)) continue;

                new ScrollMagic.Scene({
                        triggerElement: '#' + prop
                    })
                    .setClassToggle('#' + obj[prop], 'active')
                    .addTo(controller);
            }
        }

        controller.scrollTo(function (target) {

            TweenMax.to(window, 0.5, {
                scrollTo: {
                    x: target,
                    autoKill: true // Allow scroll position to change outside itself
                },
                ease: Cubic.easeInOut
            });

        });

        var anchor_nav = document.querySelector('.anchor-nav');

        anchor_nav.addEventListener('click', function (e) {
            var target = e.target,
                id = target.getAttribute('href');

            if (id !== null && id.length > 0) {
                e.preventDefault();
                controller.scrollTo(id);

                if (window.history && window.history.pushState) {
                    history.pushState("", document.title, id);
                }
            }
        });

        var $navs = $('.anchor-nav a');
        window.addEventListener("wheel", onWheel);

        function onWheel(event) {

            var normalized;
            var delta = event.wheelDelta;
            var scroll = (window.pageXOffset || document.scrollLeft) - (document.clientLeft || 0) || 0;

            if (delta) {
                normalized = (delta % 120) == 0 ? delta / 120 : delta / 12;
            } else {
                delta = event.deltaY || event.detail || 0;
                normalized = -(delta % 3 ? delta * 10 : delta / 3);
            }

            var currentIndex = $navs.index($('.active'));
            var newIndex;
            newIndex = normalized > 0 ? currentIndex + 1 : currentIndex - 1;

            if (newIndex >= 0 && newIndex < $navs.length) {
                $navs.eq(newIndex)[0].click()
            }
        }
    }


    // function Tween() {
    //     let tl = new TimelineMax();
    //     tl
    //         .from('#left', 2, {
    //             x: '-300%',

    //         }, delay = 1)
    //         .from('#right', 2, {
    //             x: '300%',

    //         }, "-=2")
    //         .from('.wellcome__btn', .5, {
    //             borderRadius: "30px"
    //         })
    //         .from('.logo__h1', 1, {
    //             y: '-100',
    //             opacity: 0
    //         }, "-=0.5")
    //         .staggerFrom(".nav__list", .5, {
    //             y: '-50',
    //             opacity: 0
    //         }, 0.1, "-=0.25")
    // }

    // function scrollMagic() {
    //     // init controller
    //     let dur = document.querySelector(".screen").offsetWidth;
    //     console.log(window.TweenMax);

    //     var controller = new ScrollMagic.Controller({
    //         globalSceneOptions: {
    //             duration: dur,
    //             triggerHook: .025,
    //             reverse: true
    //         },
    //         vertical: false,
    //     });;

    //     var tween = TweenMax.fromTo('#screen1', 1, {
    //         x: 0
    //     }, {
    //         x: -100
    //     });
    //     var tween1 = TweenMax.to('#screen2', 1, {
    //         x: 0
    //     });
    //     var tween2 = TweenMax.fromTo('#screen2', 1, {
    //         x: 0
    //     }, {
    //         x: -100
    //     });
    //     var tween3 = TweenMax.to('#screen3', 1, {
    //         x: 0
    //     });
    //     // create a scene

    //     var scene = new ScrollMagic.Scene({
    //             triggerElement: '#screen2', // starting scene, when reaching this element
    //             // offset: 400
    //         })
    //         .setTween(tween)
    //         .setTween(tween1)
    //         .addTo(controller);
    //     var scene2 = new ScrollMagic.Scene({
    //             triggerElement: '#screen3', // starting scene, when reaching this element
    //             // offset: 300
    //         })
    //         .setTween(tween2)
    //         .setTween(tween3)
    //         .addTo(controller);
    // }
    // function Tween() {
    //     let tl = new TimelineMax();
    //     tl
    //         .from('#left', 2, {
    //             x: '-300%',
    //             ease: Bounce.easeOut
    //         }, delay = 1)
    //         .from('#right', 2, {
    //             x: '300%',
    //             ease: Bounce.easeOut
    //         }, "-=2")
    //         .from('.wellcome__btn', .5, {
    //             borderRadius: "30px"
    //         })
    //         .from('.logo__h1', 1, {
    //             y: '-100',
    //             opacity: 0
    //         }, "-=0.5")
    //         .staggerFrom(".nav__list", .5, {
    //             y: '-50',
    //             opacity: 0
    //         }, 0.1, "-=0.25")
    // }

    //     var tween = TweenMax.from('#about', 1, {
    //         y: 500,
    //         opacity: 0
    //     });
    //     var tween1 = TweenMax.from('#contacts', 1, {
    //         y: 500,
    //         opacity: 0
    //     });
    //     // create a scene

    //     var scene = new ScrollMagic.Scene({
    //             triggerElement: "#servises",
    //             offset: 400
    //         })
    //         .setTween(tween)
    //         .addTo(controller);
    //     var scene2 = new ScrollMagic.Scene({
    //             triggerElement: "#clients",
    //             offset: 300
    //         })
    //         .setTween(tween1)
    //         .addTo(controller);
    // }


    /////// choosing the price of site type

    function ChoosePrice() {
        let sites = document.querySelectorAll(".site");
        let price = document.querySelector(".price");

        sites.forEach((site) => {
            site.addEventListener("click", (event) => {
                if (!event.target.dataset) return;
                price.innerHTML = event.target.dataset.value;
            });
        });
    }

    //////// send form with validation input 

    function sendPhone() {
        let form = document.querySelector('.js-form');
        form.setAttribute('novalidate', 'true');
        let input = form.querySelector('.js-input');
        let isValid = true;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            isValid = true;
            setToDefaultStyles();
            // validate inputs
            validateInputs();
            // try to submit
            submitForm();
        });

        function setToDefaultStyles() {
            input.classList.remove("error");
        }

        function validateInputs() {
            isValid = checkOnRequired(input) && isValid;
        };

        function checkOnRequired(input) {
            if (input.hasAttribute('required')) {
                if (input.value.trim() === '') {
                    input.classList.add("error");
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }

        function submitForm() {
            if (!isValid) return console.log('NOT VALID');

            if (validate(input.value)) {
                alert("Введите номер телефона для заявки");
                input.classList.add("sent");
                isValid = true;
            } else {
                alert("Введите корректный номер телефона");
                isValid = false;
                input.classList.add("error");
            }

            function validate(value) {
                let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                return re.test(value);
            }
            // AJAX

            // Success messages
            if (isValid) {
                //sendForm();
                alert("Спасибо!");
            } else {
                form.reset();
            }
        }
    }
})();