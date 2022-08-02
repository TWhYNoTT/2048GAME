let viewCubesContainer = document.querySelector("#viewCubesContainer");
let realCubesContainer = document.querySelector("#realCubesContainer");
let scoreBox = document.querySelector("#score");
let bestScoreBox = document.querySelector("#bestScore");
let go = document.getElementById("gameover");
let highScore = localStorage.getItem("highScore");
let score;
let action = false;
let wait0 = false;
let viewCube;
let aviM = [];
let arrOfP = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
let flags = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
bestScoreBox.innerHTML = highScore;


for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {

        viewCube = document.createElement("div");
        viewCube.classList.add("viewCube");
        viewCube.classList.add("row-" + i + "col-" + j);
        viewCubesContainer.appendChild(viewCube);

    }

}
initialize();
function initialize() {
    let arrOfPL = JSON.parse(localStorage.getItem("savedGame"));
    if (arrOfPL == null)
        newGame()
    else {
        arrOfP = arrOfPL;
        createGame();

    }
}

function newGame() {
    let x = document.querySelectorAll(".realCube");
    x.forEach((elem) => {
        elem.remove();
    })
    arrOfP = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    score = 0;
    localStorage.setItem("lastScore", score)
    scoreBox.innerHTML = score;
    localStorage.setItem("savedGame", "newgame")
    action = true;
    randomEle();
    action = true;
    randomEle();
    go.style.zIndex = "-1";
    go.style.transform = "scale(0.6,0.6)";

}



function createGame() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arrOfP[i][j]) {
                createElementInThisPos(i, j, arrOfP[i][j])

            }
        }
    }
    score = parseInt(localStorage.getItem("lastScore").toString());


    scoreBox.innerHTML = score;
}


function checkPoint() {
    localStorage.setItem("savedGame", JSON.stringify(arrOfP));
}





function randomEle() {
    let aviP = [];
    let randP;
    if (action) {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (!arrOfP[i][j])
                    aviP.push([i, j])
            }
        }
        if (aviP.length) {
            randP = aviP[Math.floor(Math.random() * aviP.length)];
            createElementInThisPos(randP[0], randP[1], 2);

            action = false;

        }
    }
}



function createElementInThisPos(r, c, val) {
    let x = document.querySelectorAll(".viewCube");
    let w = (x[0].getBoundingClientRect().width) + "px";
    let h = (x[0].getBoundingClientRect().height) + "px";
    let realCube = document.createElement("div");
    realCube.classList.add("realCube");
    realCube.innerHTML = val;
    realCube.style.width = w;
    realCube.style.height = h;
    arrOfP[r][c] = val;
    realCubesContainer.appendChild(realCube);
    realCube.style.left = getXP(r, c) + "px";
    realCube.style.top = getYP(r, c) + "px";
    coloringEle(realCube);
    realCube.style.transform = "scale(1,1)"
    checkPoint();

}
let isGameOver0 = false;
function moveUp(ty = "real") {
    if (ty == "check")
        isGameOver0 = false;
    let lagelMove = false;
    let lagelMerge = false;

    let newI;
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arrOfP[i][j] && isThisARealCube(getXR(i, j), getYR(i, j))) {
                for (let k = i - 1; k >= 0; k--) {
                    if (!arrOfP[k][j]) {
                        lagelMove = true;
                        newI = k;
                        isGameOver0 = false;
                    }
                    else if (arrOfP[k][j] == arrOfP[i][j]) {
                        if (flags[k][j] == 0) {
                            lagelMerge = true;
                            newI = k;
                            if (ty == "real")
                                flags[k][j] = 1;
                            lagelMove = false;
                            isGameOver0 = false;
                            break;
                        }
                        else
                            break;
                    }
                    else
                        break;
                }
            }

            if (lagelMove && ty == "real") {
                arrOfP[newI][j] = arrOfP[i][j];
                arrOfP[i][j] = 0;

                moveToThisPos(i, j, newI, j)
            }
            if (lagelMerge && ty == "real") {
                arrOfP[newI][j] += arrOfP[i][j];
                arrOfP[i][j] = 0;
                moveToThisPos(i, j, newI, j)
                setTimeout(deleteEle, 210, newI, j);
            }
            if (ty == "real") {
                lagelMove = false;
                lagelMerge = false;

            }
        }

    }
    if (ty == "real") {
        restFlags();
        randomEle();

    }
    if (ty == "check" && !lagelMove && !lagelMerge)
        isGameOver0 = true;


}






let isGameOver1 = false;

function moveDown(ty = "real") {
    if (ty == "check")
        isGameOver1 = false;
    let lagelMove = false;
    let lagelMerge = false;
    let newI;

    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (arrOfP[i][j] && isThisARealCube(getXR(i, j), getYR(i, j))) {
                for (let k = i + 1; k <= 3; k++) {
                    if (!arrOfP[k][j]) {
                        lagelMove = true;
                        isGameOver0 = false;
                        newI = k;
                    }
                    else if (arrOfP[k][j] == arrOfP[i][j]) {
                        if (flags[k][j] == 0) {
                            lagelMerge = true;
                            newI = k;
                            if (ty == "real")
                                flags[k][j] = 1;
                            lagelMove = false;
                            isGameOver0 = false;
                            break;
                        }
                        else
                            break;
                    }
                    else
                        break;
                }
            }

            if (lagelMove && ty == "real") {
                arrOfP[newI][j] = arrOfP[i][j];
                arrOfP[i][j] = 0;
                moveToThisPos(i, j, newI, j)
            }
            if (lagelMerge && ty == "real") {
                arrOfP[newI][j] += arrOfP[i][j];
                arrOfP[i][j] = 0;
                moveToThisPos(i, j, newI, j)

                setTimeout(deleteEle, 250, newI, j);
            }
            if (ty == "real") {
                lagelMove = false;
                lagelMerge = false;
            }

        }

    }

    if (ty == "real") {
        restFlags();
        randomEle();
    }

    if (ty == "check" && !lagelMove && !lagelMerge)
        isGameOver1 = true;
}

let isGameOver2 = false;
function moveRight(ty = "real") {
    if (ty == "check")
        isGameOver2 = false;
    let lagelMove = false;
    let lagelMerge = false;
    let newI;
    for (let i = 2; i >= 0; i--) {
        for (let j = 0; j < 4; j++) {
            if (arrOfP[j][i] && isThisARealCube(getXR(j, i), getYR(j, i))) {
                for (let k = i + 1; k <= 3; k++) {

                    if (!arrOfP[j][k]) {
                        lagelMove = true;
                        isGameOver2 = false;
                        newI = k;
                    }
                    else if (arrOfP[j][k] == arrOfP[j][i]) {
                        if (flags[j][k] == 0) {
                            lagelMerge = true;
                            newI = k;
                            isGameOver2 = false;
                            if (ty == "real")
                                flags[j][k] = 1;
                            lagelMove = false;
                            break;
                        }
                        else
                            break;
                    }
                    else
                        break;
                }
            }
            if (lagelMove && ty == "real") {
                arrOfP[j][newI] = arrOfP[j][i];
                arrOfP[j][i] = 0;
                moveToThisPos(j, i, j, newI)
            }
            if (lagelMerge && ty == "real") {
                arrOfP[j][newI] += arrOfP[j][i];
                arrOfP[j][i] = 0;
                moveToThisPos(j, i, j, newI)

                setTimeout(deleteEle, 250, j, newI);
            }
            if (ty == "real") {
                lagelMove = false;
                lagelMerge = false;
            }


        }


    }
    if (ty == "real") {
        restFlags();
        randomEle();
    }
    if (ty == "check" && !lagelMove && !lagelMerge)
        isGameOver2 = true;


}

let isGameOver3 = false;
function moveLeft(ty = "real") {
    if (ty == "check")
        isGameOver3 = false;

    let lagelMove = false;
    let lagelMerge = false;
    let newI;
    for (let i = 1; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arrOfP[j][i] && isThisARealCube(getXR(j, i), getYR(j, i))) {
                for (let k = i - 1; k >= 0; k--) {

                    if (!arrOfP[j][k]) {
                        lagelMove = true;
                        isGameOver3 = false;
                        newI = k;
                    }
                    else if (arrOfP[j][k] == arrOfP[j][i]) {
                        if (flags[j][k] == 0) {
                            lagelMerge = true;
                            newI = k;
                            isGameOver3 = false;
                            if (ty == "real")
                                flags[j][k] = 1;
                            lagelMove = false;
                            break;
                        }
                        else
                            break;

                    }
                    else
                        break;
                }
            }
            if (lagelMove && ty == "real") {
                arrOfP[j][newI] = arrOfP[j][i];
                arrOfP[j][i] = 0;
                moveToThisPos(j, i, j, newI)
            }
            if (lagelMerge && ty == "real") {
                arrOfP[j][newI] += arrOfP[j][i];
                arrOfP[j][i] = 0;
                moveToThisPos(j, i, j, newI)

                setTimeout(deleteEle, 250, j, newI);
            }
            if (ty == "real") {
                lagelMove = false;
                lagelMerge = false;
            }


        }


    }
    if (ty == "real") {
        restFlags();

        randomEle();
    }

    if (ty == "check" && !lagelMove && !lagelMerge)
        isGameOver3 = true;

}















setInterval(checkIfGameOver, 2000)


function checkIfGameOver() {
    aviM = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (!arrOfP[i][j])
                aviM.push([i, j])
        }
    }
    if (!aviM.length) {
        moveRight("check");
        moveUp("check");
        moveDown("check");
        moveLeft("check");
        if (isGameOver0 && isGameOver1 && isGameOver2 && isGameOver3) {
            go.style.zIndex = "1";
            go.style.transform = "scale(1,1)";
        }
    }
}










function moveToThisPos(oldR, oldC, newR, newC) {
    let mainEle = document.elementFromPoint(getXR(oldR, oldC), getYR(oldR, oldC));

    mainEle.style.left = getXP(newR, newC) + "px";
    mainEle.style.top = getYP(newR, newC) + "px";
    action = true;
}



function deleteEle(r, c) {
    let ele = document.elementFromPoint(getXR(r, c), getYR(r, c));
    if (ele.classList.contains("realCube")) {

        ele.remove();
        increaseValue(r, c);
    }
}

function increaseValue(r, c) {
    let ele = document.elementFromPoint(getXR(r, c), getYR(r, c));
    if (ele.classList.contains("realCube")) {
        ele.textContent = arrOfP[r][c];
        score += arrOfP[r][c];
        scoreBox.innerHTML = score;
        localStorage.setItem("lastScore", score);
        if (score > highScore) {
            highScore = score;
            bestScoreBox.innerHTML = highScore;
            localStorage.setItem("highScore", highScore);
        }
        coloringEle(ele)

        ele.style.transform = "scale(0.2,0.2)";
        setTimeout(() => { ele.style.transform = "scale(1,1)"; }, 50)


    }
}



function coloringEle(ele) {
    if (ele.textContent == 8)
        ele.style.backgroundColor = "rgb(242 177 121)";
    else if (ele.textContent == 16)
        ele.style.backgroundColor = "rgb(245 149 99)";
    else if (ele.textContent == 32)
        ele.style.backgroundColor = "rgb(246 124 96)";
    else if (ele.textContent == 64)
        ele.style.backgroundColor = "rgb(246 94 59)";
    else if (ele.textContent == 128)
        ele.style.backgroundColor = "rgb(237 207 115)";
    else if (ele.textContent == 256)
        ele.style.backgroundColor = "rgb(237 204 98)";

    if (ele.textContent >= 8)
        ele.style.color = "white";
}


function restFlags() {
    flags = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
}







function getXP(r, c) {
    return (document.querySelector(".row-" + r + "col-" + c).getBoundingClientRect().left - viewCubesContainer.getBoundingClientRect().left);
}

function getYP(r, c) {
    return (document.querySelector(".row-" + r + "col-" + c).getBoundingClientRect().top - viewCubesContainer.getBoundingClientRect().top);
}

function getXR(r, c) {

    return document.querySelector(".row-" + r + "col-" + c).getBoundingClientRect().left;
}

function getYR(r, c) {
    return document.querySelector(".row-" + r + "col-" + c).getBoundingClientRect().top;
}













document.addEventListener("keydown", (event) => {
    if (!wait0) {
        wait0 = true;
        setTimeout(() => {
            wait0 = false;
        }, 250)
        if (event.key == "ArrowLeft")
            moveLeft()

        else if (event.key == "ArrowRight")
            moveRight()
        else if (event.key == "ArrowUp")
            moveUp()
        else if (event.key == "ArrowDown")
            moveDown()

    }
})






























function assembler(r, valueOfinc) {
    let xOfM = getXR(r);
    let yOfM = getYR(r);
    let xOfS = getXR(r + (valueOfinc));
    let yOfS = getYR(r + (valueOfinc));

    if (isThisARealCube(xOfM, yOfM)) {
        if (isThisARealCube(xOfS, yOfS)) {

        }
        else if (isThisAViewlCube(xOfS, yOfS)) {
            moveToThisPos(xOfM, yOfM, r, valueOfinc);

        }
    }
}






function isThisARealCube(x, y) {
    return document.elementFromPoint(x, y).classList.contains("realCube");
}

function isThisAViewlCube(x, y) {
    return document.elementsFromPoint(x, y)[1].classList.contains("viewCube");
}



























































