let divMainContainer = document.querySelector(".mainContainer");
let scoreSpan = document.querySelector(".score");
let livesImg = document.querySelector(".livesImg");
let gameoverContainer = document.querySelector(".gameover");
let startOverAud = document.querySelector(".startOver");
let newgamebtn = document.querySelector(".newgame-btn");
let isNewGame = true;
let score = 0;
let lives = 0;

let a;
let sw;
window.ondragstart = function () { return false; }

let pushUp = [
    { transform: 'rotateZ(-15deg) scale(0.25)', bottom: '-200px' },
    { transform: 'rotateZ(0deg)  scale(0.25)', bottom: '250px' }

];

let pushUpTF = {
    duration: 1100,
    iterations: 1,
    easing: 'ease',
    fill: 'forwards'
};

let pullDown = [
    { transform: 'rotateZ(0deg)  scale(0.25)' },
    { transform: 'rotateZ(15deg)  scale(0.25)', bottom: '-400px' }
];

let pull0Down = [
    { transform: 'scale(0.25)' },
    { transform: 'scale(0.25)', bottom: '-300px' }
];

let pullDownTF = {
    duration: 1000,
    iterations: 1,
    easing: 'ease-in',
    fill: 'forwards'
};

let fallLeft = [
    { left: '0px', transform: 'rotateZ(0deg)' },
    { left: '-700px', transform: 'rotateZ(-100deg)' },
    { left: '-700px', transform: 'rotateZ(-100deg)' },


];

let fallTF = {
    duration: 3000,
    iterations: 1,
    easing: 'ease-in',


};

let fallRight = [
    { right: '0px', transform: 'rotateZ(0deg)' },
    { right: '-700px', transform: 'rotateZ(100deg)' },
    { right: '-700px', transform: 'rotateZ(100deg)' },


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


    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var rdeg = Math.ceil(Math.random() * 360)
    var rdegs = rdeg * plusOrMinus;
    pushUp = [
        { transform: `rotateZ(${rdegs}deg) scale(0.25)`, bottom: '-300px' },
        { transform: `rotateZ(${rdegs + 15}deg)  scale(0.25)`, bottom: '250px' }

    ];
    let pullDown = [
        { transform: `rotateZ(${rdegs + 15}deg) scale(0.25)` },
        { transform: `rotateZ(${rdegs + 30}deg)  scale(0.25)`, bottom: '-300px' }
    ];

    divEl.animate(pushUp, pushUpTF);
    setTimeout(() => {

        divEl.animate(pullDown, pullDownTF);
        setTimeout(() => {

            if (!divEl.classList.contains("sliced") && lives < 3) {
                lives++;
                livesImg.src = `/images/${lives}.png`
            }
            divEl.nextElementSibling.remove();
            divEl.remove();
        }, 1000)
    }, 1000)


}





function slice(el, x, y) {

    if (lives < 3) {
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
        score += 10;
        scoreSpan.innerHTML = score;
        //    el.parentElement.animate(pull0Down, pullDownTF)
    }

}







let isMouseDown = false;


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

let xOfMouse;
let yOfMouse;
// let aud0 = document.createElement("AUDIO");
// divMainContainer.append(aud0)
// let sndSm = 0;
// let ply = true;
// let lastx;
divMainContainer.addEventListener("mousemove", (event) => {
    xOfMouse = event.clientX;
    yOfMouse = event.clientY;

    if (isMouseDown) {
        swipeEf()
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
        if (event.target.className == "fruitImg") {
            slice(event.target, xOfMouse, yOfMouse);


        }
    }


}
);


// divMainContainer.addEventListener("touchmove", e => {
//     e.preventDefault();


//     xOfMouse = e.changedTouches[0].screenX;
//     yOfMouse = e.changedTouches[0].screenY;

//     swipeEf()

//     if (e.target.className == "fruitImg") {
//         slice(e.target, xOfMouse, yOfMouse);

//     }
// });

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
    if (ty = "fruit" && lives < 3) {
        let conDiv = document.createElement("div");

        let fruitmage = document.createElement("img");
        let righthf = document.createElement("img");
        let lfthf = document.createElement("img");
        let splat = document.createElement("img");
        let aud = document.createElement("AUDIO");
        let num = Math.ceil(Math.random() * 4);
        fruitmage.src = `images/Fruit${num}.png`
        aud.src = `media/slice${num}.wav`
        righthf.src = `images/Right${num}.png`
        lfthf.src = `images/Left${num}.png`
        splat.src = `images/Splat${num}.png`
        conDiv.classList.add("slice");
        fruitmage.classList.add("fruitImg");
        righthf.classList.add("half");
        lfthf.classList.add("half");

        splat.classList.add("splat");
        conDiv.appendChild(fruitmage);
        conDiv.appendChild(lfthf);
        conDiv.appendChild(righthf);
        conDiv.appendChild(aud);

        conDiv.style.left = Math.ceil(Math.random() * 500) + "px"
        righthf.style.right = "0px"
        lfthf.style.bottom = "0px"

        divMainContainer.append(conDiv);
        divMainContainer.append(splat);

        push(conDiv)
    }
}

setInterval(creatEle, 500, "fruit");
setInterval(() => {
    if (lives > 2 && isNewGame) {
        gameOver();
        isNewGame = false;
    }

}, 10);



function gameOver() {
    setTimeout(() => {
        gameoverContainer.style.top = "0px";
        startOverAud.src = "/media/Game-over.wav";
        startOverAud.play();
        setTimeout(() => {
            newgamebtn.style.visibility = "visible";
        }, 2000);
    }, 1000);
}

function newGame() {

    newgamebtn.style.visibility = "hidden";
    setTimeout(() => {
        gameoverContainer.style.top = "-100%";
        startOverAud.src = "/media/Game-start.wav";
        startOverAud.play()

        setTimeout(() => {
            lives = 0;
            isNewGame = true;
            livesImg.src = `/images/${lives}.png`
        }, 1100)
    }, 1000);
}
