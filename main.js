var $car = document.querySelector('.racecar');

var carModel = {
  direction: 'right'
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
}
