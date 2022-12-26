console.log("Game is ON!");

//make an object for deciding direction



// Constants and variables for the game 

let velocity = { x: 0, y: 0 };
const foodSound = new Audio('../food.mp3');
const gameOver = new Audio('../gameover.mp3');
const moveSound = new Audio('../move.mp3');
const music = new Audio("../music.mp3");
let speed = 3;
let lastPaintTime = 0;
// snake is an array as it is made of many div
// here , x and y are position of head of snake.
let snakearr = [{ x: 13, y: 15 }];
// but food is a simple object
let food = { x: 6, y: 4 };
let score=0;
let  hiscore_val=0;
// let hiscore = localStorage.getItem("hiscore");
// if(hiscore===NULL){
   
//     localStorage.setItem("hiscore" , JSON.stringify(hiscore_val));
// }
// else {
//     hiscore_val=JSON.parse(hiscore);
//     hiscore.innerHTML = "Hi Score :" + hiscore;
// }








// Game functions to be called
// ctime = current time


// game loop

function main(ctime) {
    window.requestAnimationFrame(main);
   // console.log(ctime);

    // to control FPS , if the diff b/w current timea nd last time the screen was painted is smaller than required , then wait
    // else run the further functions.

    if ((ctime - lastPaintTime) / 1000 < (1 / speed)) { return; }
    lastPaintTime = ctime;

    gameEngine();


}


// snakearr is the array of snake where snakearr[0]=head


 
function isCollide(snake){
    
    // if snake bumps into its own body
    for(let j=1;j<snakearr.length;j++){
        if(snake[j].x===snake[0].x && snake[j].y === snake[0].y){
            return true;
        }
    }

    // if you bump into wall if head.x<=0 || x>=grid.x
    if(snake[0].x <=0 || snake[0].x>=18) return true;
    if(snake[0].y <=0 || snake[0].y>=18) return true;

    return false;
}






function gameEngine() {

    // PART 1
    // to update the snake array AND food
   

    if(isCollide(snakearr)){

        music.pause();
        gameOver.play();
        velocity={x:0 , y:0};
        window.alert("Game Over ! Press any key to play again");
        //reset the snake array.
        snakearr = [{ x: 13, y: 15 }];
        music.play();
        score=0;
        document.getElementById("score").innerHTML="Score :" + score;
        speed=3;
    }

// snakearr is an array of objects that why it is written as snakearr= [{c,n}];
  // snake will eat the food when head and foos coord match
  if(snakearr[0].x===food.x && snakearr[0].y==food.y){
    foodSound.play();
    score+=10;
     speed+=1;
    // if(score > hiscore_val){
    //     hiscore_val=score;
    //     localStorage.setItem("hiscore" , JSON.stringify(hiscore_val));

    //     hiscore.innerHTML = "Hi Score :" + hiscore_val;
    
    // }
   document.getElementById("score").innerHTML="Score :" + score;
    // append another block of element to snakearr using unshift method of array in the same direction.
    snakearr.unshift({x:snakearr[0].x + velocity.x  , y: snakearr[0].y + velocity.y  });
    let a= 2;
    let b= 16;
    // to generate a random number (integer) between a and b
    // to change  location of food after it is eaten
    food = {x: Math.round(a+(b-a)*Math.random()) , y  : Math.round(a+(b-a)*Math.random())}
  }


// Moving the snake LOGIC -  keep every element of snake array at the position of its next snake array element 
// and update the head according to direction givn.
for(let j=(snakearr.length-2);j>=0;j--){
     
    // as snakearr is an object , so create a new object where you will place this snake using {... }
    snakearr[j+1]={...snakearr[j]};



}

snakearr[0].x +=velocity.x;
snakearr[0].y+=velocity.y;








    //PART 2
    //to decide snake and food position
    // as the snake eats , it length becomes longer

    board.innerHTML = "";

    // for displaying snake
    snakearr.forEach((e, ind) => {
        let snakelement = document.createElement('div');

        // js to usee for changing css prop
        snakelement.style.gridRowStart = e.y;
        snakelement.style.gridColumnStart = e.x;


        // for head of snake
        if (ind === 0) {
            snakelement.classList.add('head');
        }
        else {
            snakelement.classList.add('snake');
        }
        // row is actally the y coordinate of the newly created element by tag
        board.appendChild(snakelement);
    });


    // for displaying food

    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);



}











// Game logic

//requestAnimationFrame recursively calls a function to do what the callback function tells it to do(the argument)
// before screen is repainted for next animation to start

window.requestAnimationFrame(main);
// add Event listener for user inputs
// keydown -  when a key is pressed.

//e is an arrow function for function to work
window.addEventListener('keydown', e => {

    // starts the game

    // the velocity object of snake in itself is another array and its members value are the final value towards which they should move
   
    moveSound.play();
  // origin in JS is at top left corner

    // to detect which button is pressed 
    switch (e.key) {
        case "ArrowUp":
            music.play();
            velocity.x=0;
            velocity.y=-1;
            console.log("ArrowUp");
            break;


        case "ArrowDown":
            music.play();
            velocity.x=0;
            velocity.y=1;
            console.log("ArrowDown");
            break;

        case "ArrowLeft":
            music.play();
            velocity.x=-1;
            velocity.y=0;
            console.log("ArrowLeft");
            break;

  // x and y are actually change in x and change in y
        case "ArrowRight":
            music.play();
            velocity.x=1;
            velocity.y=0;
            console.log("ArrowRight");
            break;


        default:
            break;
    }


});