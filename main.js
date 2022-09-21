var $car = document.querySelector('.racecar');

var carModel = {
  direction: 'right',
  location: {
    xCoordinate: 0,
    yCoordinate: 0
  }
};

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
    setInterval(moveCar, 16);

  }
}

function moveCar() {
  carModel.location.xCoordinate = carModel.location.xCoordinate + 10;
  var x = carModel.location.xCoordinate;
  $car.setAttribute('style', 'left:' + x + 'px');
}
