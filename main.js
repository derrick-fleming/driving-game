const $chooseContainer = document.querySelector('.choose-container');
const $hiddenCar = document.querySelectorAll('.racecar.hidden');
const $carContainer = document.querySelector('.carbox.hidden');
const $body = document.querySelector('body');
let $car;
let timer;
const carModel = {
    direction: 'right',
    location: {
        xCoordinate: 0,
        yCoordinate: 0
    },
    carMoving: false
};
$chooseContainer.addEventListener('click', selectCar);
function selectCar(event) {
    if (event.target.tagName !== 'IMG')
        return;
    const $closest = event.target.closest('IMG');
    for (let i = 0; i < $hiddenCar.length; i++) {
        if ($closest.dataset.id === $hiddenCar[i].dataset.id) {
            $hiddenCar[i].className = 'racecar';
            $car = $hiddenCar[i];
        }
    }
    $chooseContainer.className = 'hidden';
    $carContainer.className = 'carbox';
    if ($closest.dataset.id === 'plane') {
        $body.className = 'sky';
    }
    if ($closest.dataset.id === 'ship') {
        $body.className = 'space';
    }
    if ($closest.dataset.id === 'dinghy') {
        $body.className = 'ocean';
    }
}
$body.addEventListener('click', changeScreen);
function changeScreen(event) {
    if (event.target.tagName !== 'BUTTON') {
        return;
    }
    $hiddenCar.forEach(element => {
        element.setAttribute('style', 'left: 0px;' + 'top: 0px;');
        element.className = 'racecar hidden';
    });
    carModel.location.xCoordinate = 0;
    carModel.location.yCoordinate = 0;
    carModel.carMoving = false;
    carModel.direction = 'right';
    $chooseContainer.className = 'choose-container';
    $carContainer.className = 'carbox hidden';
    $body.className = '';
}
window.addEventListener('keydown', changeDirection);
function changeDirection(event) {
    if (event.code === 'ArrowLeft') {
        carModel.direction = 'left';
    }
    if (event.code === 'ArrowRight') {
        carModel.direction = 'right';
    }
    if (event.code === 'ArrowUp') {
        carModel.direction = 'up';
    }
    if (event.code === 'ArrowDown') {
        carModel.direction = 'down';
    }
    $car.className = 'racecar ' + carModel.direction;
    if (event.code === 'Space') {
        if (carModel.carMoving === false) {
            timer = setInterval(moveCar, 16);
            carModel.carMoving = true;
        }
        else {
            clearInterval(timer);
            carModel.carMoving = false;
        }
    }
}
function moveCar() {
    const maxWidth = window.innerWidth - 120;
    const maxHeight = window.innerHeight - 120;
    const x = carModel.location.xCoordinate;
    const y = carModel.location.yCoordinate;
    if (carModel.direction === 'right' && carModel.location.xCoordinate <= maxWidth) {
        carModel.location.xCoordinate = carModel.location.xCoordinate + 10;
    }
    if (carModel.direction === 'left') {
        carModel.location.xCoordinate = carModel.location.xCoordinate - 10;
    }
    if (carModel.direction === 'up') {
        carModel.location.yCoordinate = carModel.location.yCoordinate - 10;
    }
    if (carModel.direction === 'down' && carModel.location.yCoordinate <= maxHeight) {
        carModel.location.yCoordinate = carModel.location.yCoordinate + 10;
    }
    if (y >= maxHeight) {
        carModel.location.yCoordinate = maxHeight - 10;
    }
    if (x >= maxWidth) {
        carModel.location.xCoordinate = maxWidth - 10;
    }
    if (carModel.location.yCoordinate <= 0) {
        carModel.location.yCoordinate = 0;
    }
    if (carModel.location.xCoordinate <= 0) {
        carModel.location.xCoordinate = 0;
    }
    $car.setAttribute('style', 'left:' + x + 'px;' + 'top:' + y + 'px;');
}
