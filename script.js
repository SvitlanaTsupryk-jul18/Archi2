(function () {
    // invocation

    Tween();
    scrollMagic();
    ChoosePrice();
    sendPhone();


    /////Gsap

    function Tween() {
        let tl = new TimelineMax();
        tl
            .from('#left', 2, {
                x: '-300%',
                ease: Bounce.easeOut
            }, delay = 1)
            .from('#right', 2, {
                x: '300%',
                ease: Bounce.easeOut
            }, "-=2")
            .from('.wellcome__btn', .5, {
                borderRadius: "30px"
            })
            .from('.logo__h1', 1, {
                y: '-100',
                opacity: 0
            }, "-=0.5")
            .staggerFrom(".nav__list", .5, {
                y: '-50',
                opacity: 0
            }, 0.1, "-=0.25")
    }

    function scrollMagic() {
        // init controller
        var controller = new ScrollMagic.Controller();

        var tween = TweenMax.from('#about', 1, {
            y: 500,
            opacity: 0
        });
        var tween1 = TweenMax.from('#contacts', 1, {
            y: 500,
            opacity: 0
        });
        // create a scene

        var scene = new ScrollMagic.Scene({
                triggerElement: "#servises",
                offset: 400
            })
            .setTween(tween)
            .addTo(controller);
        var scene2 = new ScrollMagic.Scene({
                triggerElement: "#clients",
                offset: 300
            })
            .setTween(tween1)
            .addTo(controller);
    }


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