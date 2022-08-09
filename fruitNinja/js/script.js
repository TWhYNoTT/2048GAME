let divMainContainer = document.querySelector(".mainContainer");
let scoreSpan = document.querySelector(".score");
let livesImg = document.querySelector(".livesImg");
let gameoverContainer = document.querySelector(".gameover");
let startOverAud = document.querySelector(".startOver");
let newgamebtn = document.querySelector(".newgame-btn");
let isNewGame = true;
let isGameOver = false;
let score = 0;
let lives = 0;
let isMouseDown = false;
let sw;
window.ondragstart = function () { return false; }




function genrateAnimation(el) {

    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var rdeg = Math.ceil(Math.random() * 360)
    var rdegs = rdeg * plusOrMinus;

    let leftRandomStart = Math.ceil(Math.random() * (divMainContainer.getBoundingClientRect().width - 100)) + "px";
    let leftRandomEnd = Math.ceil(Math.random() * (divMainContainer.getBoundingClientRect().width - 100)) + "px";
    let bottomEnd = (divMainContainer.getBoundingClientRect().height / 1.5);

    let xMoving = [
        {
            left: leftRandomStart,
            transform: `rotateZ(${rdegs}deg)`
        },
        {
            left: leftRandomEnd,
            transform: `rotateZ(${rdegs + 60}deg)`
        }
    ]
    let yMoving = [
        {
            bottom: '-200px',

        },
        {
            bottom: bottomEnd + 'px'
        }

    ]

    let xMovingTF = {
        duration: 2200,
        iterations: Infinity,


    };

    let yMovingTF = {
        duration: 1100,
        iterations: Infinity,
        easing: 'ease-in-out',
        direction: "alternate"


    };

    let pushBomb = [
        { bottom: '-200px' },
        { bottom: bottomEnd - 200 + 'px' }
    ];

    let rotateBomb = [
        { transform: `rotateZ(0deg) ` },
        { transform: `rotateZ(2160deg)  ` }
    ];

    let rotateBombTF = {
        duration: 6000,
        iterations: Infinity,
        fill: 'forwards'
    };
    let pushBombTF = {
        duration: 1100,
        iterations: Infinity,
        easing: 'ease-in-out',
        direction: "alternate"
    };



    el.animate(xMoving, xMovingTF);
    el.animate(yMoving, yMovingTF);

    if (el.classList.contains("bomb")) {
        el.animate(pushBomb, pushBombTF);
        el.animate(rotateBomb, rotateBombTF);

    }

}






let pullDown = [

    { bottom: '250px' }

];

let pushUpTF = {
    duration: 1100,
    iterations: 1,
    easing: 'ease',
    fill: 'forwards'
};



let pullDownTF = {
    duration: 1000,
    iterations: 1,
    easing: 'ease-in',
    fill: 'forwards'
};

let fallLeft = [
    { left: '0px', transform: 'rotateZ(0deg)' },
    { left: '-400px', transform: 'rotateZ(-80deg)' },



];

let fallTF = {
    duration: 3000,
    iterations: 1,
    easing: 'ease-in',


};

let fallRight = [
    { right: '0px', transform: 'rotateZ(0deg)' },
    { right: '-400px', transform: 'rotateZ(80deg)' },



];







let arr = [[], []];
let divsw = document.querySelector(".divsw");

for (let i = 0; i < 20; i++) {
    let sw = document.createElement("div");
    sw.classList.add("sw");

    divsw.appendChild(sw);

}

sw = document.querySelectorAll(".sw");

function push(divEl) {



    setTimeout(() => {



        if (divEl.classList.contains("slice")) {
            divEl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.left = -(divEl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.getBoundingClientRect().width / 2 - divEl.getBoundingClientRect().width / 2) + "px"
            divEl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.top = (divEl.getBoundingClientRect().height / 2 - divEl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.getBoundingClientRect().height / 2) + "px"
            //    / divEl.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.style.transform = 'rotateZ(45deg)';
        }




        genrateAnimation(divEl);









        setTimeout(() => {

            if (divEl.classList.contains("slice")) {
                if (!divEl.classList.contains("sliced") && lives < 3) {
                    lives++;
                    livesImg.src = `images/${lives}.png`
                    createExInThisPos(divEl.getBoundingClientRect().left - divEl.parentElement.getBoundingClientRect().left)
                    if (lives == 3)
                        isGameOver = true;
                }

                divEl.nextElementSibling.remove();

            }
            divEl.remove();
        }, 1800)



    }, 500);
}

function createExInThisPos(x) {
    let ex = document.createElement("img")
    ex.classList.add("ex");
    ex.src = "images/dropped.png"

    divMainContainer.appendChild(ex)
    ex.style.left = (x + 20) + "px";
    ex.style.bottom = "0px";

    setTimeout(() => {
        ex.remove();
    }, 500)

}



function slice(el) {

    let sliceEf = [
        { transform: 'scale(0)', visibility: 'visible' },
        { transform: 'scale(1)', visibility: 'visible' },




    ];

    let sliceEfTF = {
        duration: 100,
        iterations: 1,

    };


    if (lives < 3 && el.parentElement.classList.contains("slice")) {
        el.parentElement.nextElementSibling.style.left = (el.parentElement.getBoundingClientRect().left - el.parentElement.parentElement.getBoundingClientRect().left) + "px";
        el.parentElement.nextElementSibling.style.top = (el.parentElement.getBoundingClientRect().top - el.parentElement.parentElement.getBoundingClientRect().top) + "px";
        el.style.visibility = "hidden";
        el.nextElementSibling.style.visibility = "visible";
        el.nextElementSibling.nextElementSibling.style.visibility = "visible";
        el.nextElementSibling.nextElementSibling.nextElementSibling.play();
        el.parentElement.nextElementSibling.style.visibility = "visible";
        el.parentElement.classList.add("sliced");

        el.nextElementSibling.animate(fallLeft, fallTF);
        el.nextElementSibling.nextElementSibling.animate(fallRight, fallTF);
        el.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.animate(sliceEf, sliceEfTF);

        score += 10;
        scoreSpan.innerHTML = score;
        //    el.parentElement.animate(pull0Down, pullDownTF)
    }
    else if (lives < 3 && el.parentElement.classList.contains("bomb")) {
        el.nextElementSibling.play();
        el.parentElement.animate(pullDown, pushUpTF);
        lives = 3;
        setTimeout(() => {
            isGameOver = true;

        }, 2000)
    }

}










divMainContainer.addEventListener("mousedown", () => {
    isMouseDown = true;
}
);
divMainContainer.addEventListener("mouseup", () => {
    isMouseDown = false;
    sw.forEach((elem) => {
        elem.style.visibility = "hidden";
    })

}
);


// let aud0 = document.createElement("AUDIO");
// divMainContainer.append(aud0)
// let sndSm = 0;
// let ply = true;
// let lastx;

divMainContainer.addEventListener("mousemove", (event) => {
    xOfMouse = event.clientX;
    yOfMouse = event.clientY;

    if (isMouseDown) {
        swipeEf();
        sliceElementsInThisRange(xOfMouse, yOfMouse);
        // if (!sndSm && ply) {
        //     aud0.src = `media/Sword-swipe-1.wav`;
        //     aud0.play()
        //     ply = false;
        //     sndSm = 1;
        //     setTimeout(() => { ply = true }, 1000)
        // }
        // else if (sndSm && ply) {
        //     aud0.src = `media/Sword-swipe-2.wav`;
        //     aud0.play()
        //     sndSm = 0;
        //     ply = false;
        //     setTimeout(() => { ply = true }, 1000)
        // }
        // if (event.target.className == "fruitImg" || event.target.parentElement.classList.contains("bomb")) {
        //     slice(event.target, xOfMouse, yOfMouse);


        // }

    }


}
);



function sliceElementsInThisRange(x, y) {
    let elmm;
    for (let i = 0; i < 5; i++) {

        elmm = document.elementFromPoint(x + i, y)

        if (elmm.className == "fruitImg") {

            slice(elmm, x + i, y);

        }
        elmm = document.elementFromPoint(x - i, y)

        if (elmm.className == "fruitImg") {

            slice(elmm, x - i, y);

        }
    }
    for (let i = 0; i < 5; i++) {

        elmm = document.elementFromPoint(x, y + i)

        if (elmm.className == "fruitImg") {

            slice(elmm, x, y + i);

        }
        elmm = document.elementFromPoint(x, y - i)

        if (elmm.className == "fruitImg") {

            slice(elmm, x, y - i);

        }
    }
    elmm = document.elementFromPoint(x, y)
    if (elmm.className == "fruitImg" || elmm.parentElement.classList.contains("bomb")) {

        slice(elmm, x, y);

    }
}


divMainContainer.addEventListener("touchstart", () => {
    isMouseDown = true
});
divMainContainer.addEventListener("touchend", () => {
    isMouseDown = false;
    sw.forEach((elem) => {
        elem.style.visibility = "hidden";
    })
});
divMainContainer.addEventListener("touchmove", e => {
    e.preventDefault();


    xOfMouse = e.changedTouches[0].clientX;
    yOfMouse = e.changedTouches[0].clientY;

    swipeEf()
    sliceElementsInThisRange(xOfMouse, yOfMouse);
});

function swipeEf() {
    sw.forEach((elem) => {


        elem.style.visibility = "visible";



    })
}




setInterval(() => {
    let x = 0;
    sw.forEach((elem) => {
        if (!x) {
            elem.style.left = xOfMouse - divsw.getBoundingClientRect().left + "px";
            elem.style.top = yOfMouse - divsw.getBoundingClientRect().top + "px";
        }
        arr[0][x] = elem.getBoundingClientRect().left;
        arr[1][x] = elem.getBoundingClientRect().top;
        x++;
    })

}, 1);
setInterval(() => {
    let x = 0;


    sw.forEach((elem) => {
        if (x) {
            elem.style.left = arr[0][x - 1] - divsw.getBoundingClientRect().left + 'px';
            elem.style.top = arr[1][x - 1] - divsw.getBoundingClientRect().top + "px";
        }
        x++;
    })
}, 1);


function creatEle(ty) {

    if (ty == "fruit" && lives < 3) {
        let x = Math.floor(Math.random() * 3)
        for (let i = 0; i <= x; i++) {
            let conDiv = document.createElement("div");
            let aud = document.createElement("AUDIO");
            let mainImage = document.createElement("img");
            conDiv.classList.add("movingel");
            let righthf = document.createElement("img");
            let lfthf = document.createElement("img");
            let splat = document.createElement("img");
            let sliceeff = document.createElement("img");
            let num = Math.ceil(Math.random() * 5);
            mainImage.src = `images/Fruit${num}.png`
            aud.src = `media/slice${num}.wav`
            righthf.src = `images/Right${num}.png`
            lfthf.src = `images/Left${num}.png`
            sliceeff.src = `images/sliceeff${num}.png`
            splat.src = `images/Splat${num}.png`
            conDiv.classList.add("slice");
            mainImage.classList.add("fruitImg");
            righthf.classList.add("half");
            righthf.classList.add("lfthf");
            lfthf.classList.add("half");
            lfthf.classList.add("rithf");
            sliceeff.classList.add("sliceeff");

            splat.classList.add("splat");
            conDiv.appendChild(mainImage);
            conDiv.appendChild(lfthf);
            conDiv.appendChild(righthf);
            conDiv.appendChild(aud);
            conDiv.appendChild(sliceeff);


            righthf.style.right = "0px"
            lfthf.style.bottom = "0px"



            divMainContainer.append(conDiv);
            divMainContainer.append(splat);

            push(conDiv)

        }
    }
    else if (ty == "bomb" && lives < 3) {
        let x = Math.floor(Math.random() * 3)
        for (let i = 0; i <= x; i++) {
            let conDiv = document.createElement("div");
            let aud = document.createElement("AUDIO");
            let mainImage = document.createElement("img");
            conDiv.classList.add("movingel");
            conDiv.classList.add("bomb");
            aud.src = `media/Bomb-explode.wav`
            mainImage.src = `images/bomb.png`
            conDiv.appendChild(mainImage);
            conDiv.appendChild(aud);
            conDiv.style.left = Math.ceil(Math.random() * (divMainContainer.getBoundingClientRect().width - 100)) + "px"
            divMainContainer.append(conDiv);
            push(conDiv)
        }
    }
}

setInterval(creatEle, 1000, "fruit");

setInterval(creatEle, 3000, "bomb");

setInterval(() => {
    if (lives > 2 && isNewGame && isGameOver) {
        gameOver();
        isNewGame = false;
        isGameOver = false
    }

}, 10);



function gameOver() {
    setTimeout(() => {
        gameoverContainer.style.top = "0px";
        startOverAud.src = "media/Game-over.wav";
        startOverAud.play();
        score = 0;
        setTimeout(() => {
            newgamebtn.style.visibility = "visible";
        }, 2000);
    }, 1000);
}

function newGame() {

    newgamebtn.style.visibility = "hidden";
    setTimeout(() => {
        gameoverContainer.style.top = "-100%";
        startOverAud.src = "media/Game-start.wav";
        startOverAud.play()

        setTimeout(() => {
            lives = 0;
            isNewGame = true;
            livesImg.src = `images/${lives}.png`
        }, 1100)
    }, 1000);
}

function freeze() {
    let frez = [
        { bottom: '0px', transform: 'rotateZ(0deg)' },


    ];

    let frezTF = {
        duration: 5000000,
        iterations: Infinity,
        easing: 'ease',
        fill: 'forwards'
    };


    let movingel = document.querySelectorAll(".movingel");
    movingel.forEach(el => {
        console.log(el)
        el.animate(frez, frezTF);
    })
}
