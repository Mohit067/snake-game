document.addEventListener('DOMContentLoaded', function() {
    const gameArena = document.getElementById('game-arena');
    const ArenaSize = 600;
    const cellSize = 20;
    let score = 0; // let because socre is updatable
    let startGame = false; //flag --> game status
    let food = { r: 300, c: 200 }; // { r = 15*20, c = 10*20} because convert cell coordinate into pirels
    let snake = [{r: 160, c: 200}, {r: 140, c: 200}, {r: 120, c: 200}]; // {head, body,body,tail}

    let dx = cellSize;
    let dy = 0;

    function updateSnake(){
        const newHead = {r: snake[0].r + dx, c: snake[0].c + dy};
        snake.unshift(newHead);

        //check collision with food
        if(newHead.r === food.r && newHead.c === food.c){
            score += 10;
        }
        else {
            snake.pop();//remove tail 
        }
    }

    function changeDirection(e){
        console.log("key pressed", e)
        const isGoingDown = dy === cellSize;
        const isGoingup = dy === -cellSize;
        const isGoingRight = dy === cellSize;
        const isGoingLeft = dy === -cellSize;
        if(e.key ==='Arrowup' && !isGoingDown){
            dx = 0;
            dy = -cellSize;
        }
        else if(e.key ==='ArrowDown' && !isGoingup){
            dx = 0;
            dy = cellSize;
        }
        else if(e.key ==='ArrowLeft' && !isGoingRight){
            dx = -cellSize;
            dy = 0;
        }
        else if(e.key ==='ArrowRight' && !isGoingLeft){
            dx = 0;
            dy = cellSize;
        }
    }
    
    function drawDiv(r, c, className){
        const divElement = document.createElement('div');
        divElement.classList.add(className);
        divElement.style.top = `${c}px`;
        divElement.style.left = `${r}px`;
        return divElement;

    }

    function drawFoodAndSnake(){
        gameArena.innerHTML = ''; //clear the game arena
       
        snake.forEach((snakeCell) => {
            const snakeElement = drawDiv(snakeCell.r, snakeCell.c, 'snake');
            gameArena.appendChild(snakeElement);
        });

        const foodElement = drawDiv(food.r, food.c ,'food');
        gameArena.appendChild(foodElement);
    }

    function gameLoop(){
        setInterval(() => {
            updateSnake();
            drawFoodAndSnake();
        },200)
    }

    function runGame(){
        if(!startGame){// game is not start yet
            startGame = true;// game is started
            document.addEventListener('keydown', changeDirection)
            gameLoop();
        }
    }


    function initiateGame(){
        const scoreBoard = document.createElement('div');
        scoreBoard.id = 'score-board';
        document.body.insertBefore(scoreBoard, gameArena);// we add our scoreboard before gameArena so we use[insertBefore]


        const startButton = document.createElement('button');
        startButton.textContent = 'Start Game';
        startButton.classList.add = 'start-button';

        startButton.addEventListener('click', function startGame(){
            startButton.style.display = 'none'; //hide start button

            runGame();
        });

        document.body.appendChild(startButton);//append start button to the body
    }

    initiateGame();
});