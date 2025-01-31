const whale = document.getElementById('whale');
const obstacle = document.getElementById('obstacle');

let isJumping = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let position = 0;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    whale.style.bottom = position + 'px';
                }

             }, 20);
        } else {
            position += 20;
            whale.style.bottom = position + 'px';
        }
    }, 20);
}

function checkCollision() {
    const whaleBottom = parseInt(window.getComputedStyle(whale).getPropertyValue('bottom'));
    const obstacleRight = parseInt(window.getComputedStyle(obstacle).getPropertyValue('right'));

    if (obstacleRight > 50 && obstacleRight < 100 && whaleBottom < 60) {
        alert('Game Over!');
        obstacle.style.animation = 'none';
        obstacle.offsetHeight; //trigger reflow
        obstacle.style.animation = null;
    }
}

setInterval(checkCollision, 10);