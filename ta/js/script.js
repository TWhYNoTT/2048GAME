window.addEventListener("load", () => {
    const eventCards = document.querySelectorAll('.event-card');
    const leftArrowe = document.querySelector('.left-arrow-e');
    const rightArrowe = document.querySelector('.right-arrow-e');
    const agendaEvents = document.querySelector('.agenda-events');
    const stakeCards = document.querySelectorAll('.stakeholder-card');
    const leftArrows = document.querySelector('.left-arrow-s');
    const rightArrows = document.querySelector('.right-arrow-s');
    const stakeEvents = document.querySelector('#xy');

    let currentCardIndexe = 0;
    let currentCardIndexs = 0;
    let scrollBy;
    let inlinebehave = "start";
    const smallDevice = window.matchMedia("(min-width: 768px)");
    const mediumDevice = window.matchMedia("(min-width: 992px)");
    const largeDevice = window.matchMedia("(min-width: 1200px)");

    smallDevice.addListener(handleDeviceChange);
    mediumDevice.addListener(handleDeviceChange);
    largeDevice.addListener(handleDeviceChange);

    function handleDeviceChange() {
        inlinebehave = "start";
        if (largeDevice.matches) scrollBy = 4;
        else if (mediumDevice.matches) scrollBy = 3;
        else if (smallDevice.matches) scrollBy = 2;
        else {
            scrollBy = 1;
            inlinebehave = "center"
        }
    }

    // Run it initially
    handleDeviceChange();
    let startX;

    function setActiveCard() {
        eventCards.forEach((card, index) => {
            if (index === currentCardIndexe) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    function scrollLeft() {
        if (currentCardIndexe > 0) {
            currentCardIndexe--;
            setActiveCard();
            eventCards[currentCardIndexe].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: "center" });
        }
    }

    function scrollRight() {
        if (currentCardIndexe < eventCards.length - 1) {
            currentCardIndexe++;
            setActiveCard();
            eventCards[currentCardIndexe].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: "center" });
        }
    }

    ////////////////
    function setActiveCards() {
        stakeCards.forEach((card, index) => {
            if (index === currentCardIndexs) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    function scrollLefts() {
        try {
            if (currentCardIndexs > 0) {
                currentCardIndexs -= scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });

            }
        } catch (err) {
            currentCardIndexs = 0;

        }
    }

    function scrollRights() {
        try {
            if (currentCardIndexs < stakeCards.length - 1) {
                currentCardIndexs += scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });

            }
        } catch (err) {
            currentCardIndexs = stakeCards.length - 1;

        }
    }


    function handleTouchStarts(event) {
        event.preventDefault();
        startX = event.touches[0].pageX;
    }

    function handleTouchMoves(event) {

        if (!startX) {
            return;
        }

        let diffX = startX - event.touches[0].pageX;

        if (diffX > 0 && currentCardIndexs < stakeCards.length - 1) {
            try {
                currentCardIndexs += scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });
            } catch (err) {
                currentCardIndexs = stakeCards.length - 1;


            }
        } else if (diffX < 0 && currentCardIndexs > 0) {
            try {
                currentCardIndexs -= scrollBy;

                stakeCards[currentCardIndexs].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: inlinebehave });
            } catch (err) {
                currentCardIndexs = 0;


            }
        }

        startX = null;
    }

    function handleTouchEnds(event) {
        startX = null;
    }
    //////////////

    function handleTouchStart(event) {
        event.preventDefault();
        startX = event.touches[0].pageX;
    }

    function handleTouchMove(event) {
        if (!startX) {
            return;
        }

        let diffX = startX - event.touches[0].pageX;

        if (diffX > 0 && currentCardIndexe < eventCards.length - 1) {
            currentCardIndexe++;
            setActiveCard();
            eventCards[currentCardIndexe].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: "center" });
        } else if (diffX < 0 && currentCardIndexe > 0) {
            currentCardIndexe--;
            setActiveCard();
            eventCards[currentCardIndexe].scrollIntoView({ block: 'nearest', behavior: 'smooth', inline: "center" });
        }

        startX = null;
    }

    function handleTouchEnd(event) {
        startX = null;
    }

    setActiveCards();
    leftArrows.addEventListener('click', scrollLefts);
    rightArrows.addEventListener('click', scrollRights);
    stakeEvents.addEventListener('touchstart', handleTouchStarts);
    stakeEvents.addEventListener('touchmove', handleTouchMoves);
    stakeEvents.addEventListener('touchend', handleTouchEnds);

    setActiveCard();
    leftArrowe.addEventListener('click', scrollLeft);
    rightArrowe.addEventListener('click', scrollRight);
    agendaEvents.addEventListener('touchstart', handleTouchStart);
    agendaEvents.addEventListener('touchmove', handleTouchMove);
    agendaEvents.addEventListener('touchend', handleTouchEnd);
    ////////////////////////////


    let registerForm = document.querySelector('.form-container');
    let navMenu = document.querySelector('.nav-menu');
    let overlay = document.querySelector('.overlay')

    document.querySelector('.burger-button').addEventListener("click", () => {

        navMenu.classList.toggle("active")
        overlay.classList.toggle("active")
    })

    overlay.addEventListener("click", (e) => {
        e.target.classList.remove("active")
        navMenu.classList.remove("active")
        registerForm.classList.remove("active")
    })

    document.querySelectorAll('.nav-menu a').forEach((el) => {
        el.addEventListener("click", () => {
            navMenu.classList.remove("active")
            overlay.classList.remove("active")
        })
    })

    document.querySelector('.register-button').addEventListener("click", () => {

        registerForm.classList.toggle("active")
        overlay.classList.toggle("active")
    })

    document.querySelector('.img-frm').addEventListener("click", () => {

        registerForm.classList.remove("active")
        overlay.classList.remove("active")
    })
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    let daysEle = document.querySelector('.days')
    let hoursEle = document.querySelector('.houres')
    let minutesEle = document.querySelector('.minutes')
    let secondsEle = document.querySelector('.seconds')


    var countDownDate = new Date("Jun 22, 2023").getTime();


    var x = setInterval(function () {


        var now = new Date().getTime();
        var distance = countDownDate - now;


        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);


        daysEle.innerHTML = days;
        hoursEle.innerHTML = hours;
        minutesEle.innerHTML = minutes;
        secondsEle.innerHTML = seconds;

        if (distance < 0) {
            clearInterval(x);
            daysEle.innerHTML = '0';
            hoursEle.innerHTML = '0';
            minutesEle.innerHTML = '0';
            secondsEle.innerHTML = '0';
        }
    }, 1000);

})