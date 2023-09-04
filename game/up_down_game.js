//랜덤번호 지정
//유저가 번호 입력 -> go 버튼누름
//유저가 번호 맞추면 맞췄습니다
//랜덤 번호 < 유저번호 down
//랜덤 번호 > 유저번호 up
//리셋 버튼
//5번의 기회 다쓰면 게임 끝 버튼 (disable)
//유저가 1~100 범위 밖 입력하면 알려주고 기회는 그대로
//유저가 입력했던 값을 입력하면 알려주고 기회는 그대로

let computerNum = 0;
let goButton = document.getElementById("go-button");
let userInput = document.getElementById("user-input");
let gameHelper = document.getElementById("game-helper");
let resetButton = document.getElementById("reset-button");
let chance = 5;
let chanceHelp = document.getElementById("chance-helper");
let gameOver = false;
let history=[]

let image = document.querySelector(".main-image");
function randomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum)
}

goButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
userInput.addEventListener("focus", focusInput);


function play(){
    let userNum = userInput.value
    
    if(userNum<1 ||userNum >100){
        gameHelper.textContent="범위를 벗어납니다."
        return;
       }
       if(history.includes(userNum)){
        gameHelper.textContent ="이미 입력한 숫자 입니다."
        return;
       }

    chance --;
    chanceHelp.textContent= `( 남은기회는 ${chance}번 )`

    if(userNum < computerNum){
        image.src="./gameimage/끌어올려.png"
        gameHelper.textContent="UP!"
    }else if(userNum > computerNum){
        image.src="./gameimage/다운.png";
        gameHelper.textContent="Down!"
    }else{
       image.src="./gameimage/tenor.gif";
        gameHelper.textContent="정답입니다!"
    }

    history.push(userNum)
    console.log(history)
    
    if(chance < 1){
        gameOver =true;
    }

    if(gameOver == true){
        goButton.disabled = true; 
    }
 
}

function reset(){
    randomNum()
    userInput.value = ""
    gameHelper.textContent="게임을 다시 시작합니다"
    gameOver = false;
    goButton.disabled = false;
    chance = 5;
    chanceHelp.textContent= `남은기회: ${chance}번`
    history = [];
    image.src="./gameimage/게임.png"
}

function focusInput() {
    userInput.value = "";
  }

randomNum()
