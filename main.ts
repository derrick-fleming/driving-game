const $chooseContainer: HTMLDivElement = document.querySelector('.choose-container');
const $hiddenCar: NodeListOf<Element> = document.querySelectorAll('.racecar.hidden');
const $body = document.querySelector('body');
let $car = null;
let timer = null;
const carModel = {
  direction: 'right',
  location: {
    xCoordinate: 0,
    yCoordinate: 0
  },
  carMoving: false
};

$chooseContainer.addEventListener('click', selectCar);

type data = {
  'data-id': string;
}

function selectCar(event: MouseEvent) {
  const $closest: HTMLElement = (event.target as HTMLElement).closest('IMG');
  for (var i = 0; i < $hiddenCar.length; i++) {
    if ($closest.dataset.id === ($hiddenCar[i] as HTMLElement).dataset.id) {
      $hiddenCar[i].className = 'racecar';
      $car = $hiddenCar[i];
    }
  }
  $chooseContainer.className = 'hidden';
  if ($closest.dataset.id === 'plane') {
    $body.className = 'sky';
  }
  if ($closest.dataset.id === 'ship') {
    $body.className = 'space';
  }

  if ($closest.dataset.id === 'dinghy') {
    $body.className = 'ocean';
  }
  return $car;
}
window.addEventListener('keydown', changeDirection);

function changeDirection(event: KeyboardEvent) {
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
    } else {
      clearInterval(timer);
      carModel.carMoving = false;
    }
  }
}

function moveCar() {
  var x = carModel.location.xCoordinate;
  var y = carModel.location.yCoordinate;

  if (carModel.direction === 'right') {
    carModel.location.xCoordinate = carModel.location.xCoordinate + 10;
  }

  if (carModel.direction === 'left') {
    carModel.location.xCoordinate = carModel.location.xCoordinate - 10;
  }

  if (carModel.direction === 'up') {
    carModel.location.yCoordinate = carModel.location.yCoordinate - 10;
  }

  if (carModel.direction === 'down') {
    carModel.location.yCoordinate = carModel.location.yCoordinate + 10;
  }

  $car.setAttribute('style', 'left:' + x + 'px;' + 'top:' + y + 'px;');
}
