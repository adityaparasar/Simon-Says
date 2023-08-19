let gameseq=[];
let userseq=[];
let btns = ["red", "yellow", "green", "purple"];
let body=document.querySelector("body");
let highest= document.querySelector(".highest");

let started = false;
let lvl =0;
let h2 = document.querySelector("h2");
let high=0;


document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game started");
        started= true;

        levelup();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup(){
    lvl++;
    h2.innerText= `Level ${lvl}`;
    userseq=[];
    
    let rdmIdx= Math.floor(Math.random()*3);
    let rdmColor = btns[rdmIdx];
    let rdmbtn= document.querySelector(`.${rdmColor}`);
    // console.log(rdmIdx);
    // console.log(rdmColor);
    // console.log(rdmbtn);
    gameseq.push(rdmColor);
    console.log(gameseq);


    gameFlash(rdmbtn);
}

function CheckAns(idx){
    if(userseq[idx]==gameseq[idx]){
        if(userseq.length==gameseq.length){
            setTimeout(levelup, 1000);
        }
    }else{
        h2.innerHTML= `Game over!! Your score was <b>${lvl*5}</b> <br> Press any key to restart.`;
        body.style.backgroundColor="red";
        setTimeout(function(){
            body.style.backgroundColor="white";
        },150);
        highestScore();
        reset();
    
    }
}

function btnPress(){
    userFlash(this);

    userColor= this.getAttribute("id");
    userseq.push(userColor);

    CheckAns(userseq.length-1);

}

let allBtns= document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function reset(){
    userseq=[];
    gameseq=[];
    started=false;
    lvl=0;
}

function highestScore(){
    if(lvl*5>high){
        high= lvl*5;
        highest.innerHTML=`Highest score till now is ${lvl*5}`;
    }
}