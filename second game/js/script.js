let divMainContainer = document.querySelector(".mainContainer");
let a;
let sw;
window.ondragstart = function () { return false; }

let pushUp = [
    { transform: 'rotateZ(-15deg) scale(0.25)', bottom: '-100px' },
    { transform: 'rotateZ(0deg)  scale(0.25)', bottom: '200px' }

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
        setTimeout(() => {

            divEl.nextElementSibling.remove();
            divEl.remove();
        }, 1500)
    }, 1500)

}





function slice(el, x, y) {
    clearTimeout(a)
    el.parentElement.nextElementSibling.style.left = (el.parentElement.getBoundingClientRect().left - el.parentElement.parentElement.getBoundingClientRect().left) + "px";
    el.parentElement.nextElementSibling.style.top = (el.parentElement.getBoundingClientRect().top - el.parentElement.parentElement.getBoundingClientRect().top) + "px";
    el.style.visibility = "hidden";
    el.nextElementSibling.style.visibility = "visible";
    el.nextElementSibling.nextElementSibling.style.visibility = "visible";
    el.parentElement.nextElementSibling.style.visibility = "visible";
    el.nextElementSibling.animate(fallLeft, fallTF);
    el.nextElementSibling.nextElementSibling.animate(fallRight, fallTF);
    el.parentElement.animate(pull0Down, pullDownTF)
    setTimeout(() => { el.parentElement.nextElementSibling.remove(); el.parentElement.remove() }, 1500)
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
divMainContainer.addEventListener("mousemove", (event) => {
    xOfMouse = event.clientX;
    yOfMouse = event.clientY;
    if (isMouseDown) {
        swipeEf()

        if (event.target.className == "fruitImg") {
            slice(event.target, xOfMouse, yOfMouse);

        }
    }


}
);


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
        let num = Math.ceil(Math.random() * 4);
        fruitmage.setAttribute("src", `/images/Fruit${num}.png`)
        fruitmage.setAttribute("fruit", num)
        righthf.setAttribute("src", `/images/Right${num}.png`)
        lfthf.setAttribute("src", `/images/Left${num}.png`)
        splat.setAttribute("src", `/images/Splat${num}.png`)
        conDiv.classList.add("slice");
        fruitmage.classList.add("fruitImg");
        righthf.classList.add("half");
        lfthf.classList.add("half");

        splat.classList.add("splat");
        conDiv.appendChild(fruitmage);
        conDiv.appendChild(lfthf);
        conDiv.appendChild(righthf);

        righthf.style.right = "0px"
        lfthf.style.bottom = "0px"

        divMainContainer.append(conDiv);
        divMainContainer.append(splat);

        push(conDiv)
    }
}

setInterval(creatEle, 5000, "fruit");

