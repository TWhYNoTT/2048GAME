let divMainContainer = document.querySelector(".mainContainer");
let a;
let sw;
window.ondragstart = function () { return false; }

let pushUp = [
    { transform: 'rotateZ(-15deg) scale(0.25)', bottom: '-200px' },
    { transform: 'rotateZ(0deg)  scale(0.25)', bottom: '250px' }

];

let pushUpTF = {
    duration: 1500,
    iterations: 1,
    easing: 'ease',
    fill: 'forwards'
};

let pullDown = [
    { transform: 'rotateZ(0deg)  scale(0.25)' },
    { transform: 'rotateZ(15deg)  scale(0.25)', bottom: '-300px' }
];

let pull0Down = [
    { transform: 'scale(0.25)' },
    { transform: 'scale(0.25)', bottom: '-300px' }
];

let pullDownTF = {
    duration: 1500,
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





    divEl.animate(pushUp, pushUpTF);
    a = setTimeout(() => {

        divEl.animate(pullDown, pullDownTF);
        w = setTimeout(() => {

            divEl.nextElementSibling.remove();
            divEl.remove();
        }, 1500)
    }, 1500)

}





function slice(el, x, y) {


    el.parentElement.nextElementSibling.style.left = (el.parentElement.getBoundingClientRect().left - el.parentElement.parentElement.getBoundingClientRect().left) + "px";
    el.parentElement.nextElementSibling.style.top = (el.parentElement.getBoundingClientRect().top - el.parentElement.parentElement.getBoundingClientRect().top) + "px";
    el.style.visibility = "hidden";
    el.nextElementSibling.style.visibility = "visible";
    el.nextElementSibling.nextElementSibling.style.visibility = "visible";
    el.nextElementSibling.nextElementSibling.nextElementSibling.play();
    el.parentElement.nextElementSibling.style.visibility = "visible";

    el.nextElementSibling.animate(fallLeft, fallTF);
    el.nextElementSibling.nextElementSibling.animate(fallRight, fallTF);
    el.parentElement.animate(pull0Down, pullDownTF)

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
    if (ty = "fruit") {
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

