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

    let intervalId;
    let gameSpeed = 200;
    function moveFood(){
        let newX, newY;

        do {
            newX = Math.floor(Math.random() * 30) * cellSize;
            newY = Math.floor(Math.random() * 30) * cellSize;
        } while(snake.some(snakeCell => snakeCell.r === newX && snakeCell.c === newY));
        
        food = {r: newX, c: newY};
    }

    function updateSnake(){
        const newHead = {r: snake[0].r + dx, c: snake[0].c + dy};
        snake.unshift(newHead);

        //check collision with food
        if(newHead.r === food.r && newHead.c === food.c){
            score += 10;
            moveFood();
            if(gameSpeed > 50){
                clearInterval(intervalId);
                gameSpeed -= 10;
                gameLoop();
            }
        }

        else {
            snake.pop();//remove tail 
        }
    }

    function changeDirection(e){
        console.log("key pressed", e)
        const isGoingDown = dy === cellSize;
        const isGoingup = dy === -cellSize;
        const isGoingRight = dx === cellSize;
        const isGoingLeft = dx === -cellSize;
        if(e.key ==='ArrowUp' && !isGoingDown){
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
            dx = cellSize;
            dy = 0;
            
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

    function isGameOver(){
        //snake collision
        for(let i=1; i<snake.length; i++){
            if(snake[0].r === snake[i].r && snake[0].c === snake[i].c){
                return true;
            }
        }
        // wall collision
        const hitLeftWall = snake[0].r < 0;
        const hitRightWall = snake[0].r > ArenaSize - cellSize;
        const hitTopWall = snake[0].c < 0;
        const hitDownWall = snake[0].c > ArenaSize - cellSize;
        return hitLeftWall || hitRightWall || hitTopWall || hitDownWall;
    }

    function gameLoop(){
            
        intervalId = setInterval(() => {
            if(isGameOver()){
                clearInterval(intervalId);
                startGame = false;
                alert('game Over' + '\n' + 'Your Score' + score);
                return;
            }
            updateSnake();
            drawFoodAndSnake();
            drawScoreBoard();
        },gameSpeed)
    }

    function runGame(){
        if(!startGame){// game is not start yet
            startGame = true;// game is started
            document.addEventListener('keydown', changeDirection)
            gameLoop();
        }
    }

    function drawScoreBoard(){
        const scoreBoard = document.getElementById('score-board');
        scoreBoard.textContent = `Score: ${score}`;
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