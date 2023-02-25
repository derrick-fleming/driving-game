const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const { JSDOM } = require('jsdom');
chai.use(require('chai-dom'));
require('jsdom-global')();

const ids = ['car', 'ship', 'plane'];
const keyBoardEvents = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

describe('index.html', () => {
  beforeEach((done) => {
    JSDOM.fromFile('index.html')
      .then((dom) => {
        global.document = dom.window.document
      })
      .then(done, done);
  });

  describe('Body class', () => {
    const eventIds = [ 'plane', 'ship', 'dinghy'];
    const locations = ['sky', 'space', 'ocean'];
    for (let i = 0; i < eventIds.length; i++) {
      it(`Should update the body className if dataset is ${eventIds[i]}`, () => {
        let index;
        const $body = document.querySelector('body');
        const event = {
          target: { dataset: { id: eventIds[i] } }
        };
        if (event.target.dataset.id === eventIds[i]) {
          $body.className = locations[i];
          index = i;
        }
        expect($body.className).to.equal(locations[index])
      })
    }
  })

  describe('NodeList of Racecards', () => {

    it('Nodelist should contain four elements of Racecars', () => {
      let $hiddenCar = document.querySelectorAll('.racecar.hidden');
      expect($hiddenCar.length).to.deep.equal(4);
    })

    for (let i = 0; i < ids.length; i++) {
      it(`Should change className of selectedNode: ${ids[i]} to racecar and keep other classNames same`, () => {
        const event = {
          target: { dataset: { id: ids[i] } } };
        let changed;
        let $hiddenCar = document.querySelectorAll('.racecar.hidden');
        $hiddenCar.forEach((element, index) => {
          if (event.target.dataset.id === element.dataset.id) {
            changed = index;
            element.className = 'racecar';
          }
        })
        expect($hiddenCar[changed].className).to.equal('racecar');
        expect($hiddenCar[changed + 1].className).to.equal('racecar hidden');
      }) }

  })

  describe('CarModel', () => {
    for (let i = 0; i < keyBoardEvents.length; i++) {

      it(`should updatecarmodel when cardirection is ${keyBoardEvents[i]}`, () => {
        const carModel = {
          direction: 'right',
          location: {
            xCoordinate: 0,
            yCoordinate: 0
          },
          carMoving: false
        };

        const event = { code: keyBoardEvents[i] };
        if (event.code === 'ArrowLeft') {
          carModel.direction = 'left';
        }
        if (event.code === 'ArrowRight') {
          carModel.direction = 'right';
        }
        if (event.code === 'ArrowDown') {
          carModel.direction = 'down';
        }
        if (event.code === 'ArrowUp') {
          carModel.direction = 'up';
        }
        const direction = keyBoardEvents[i].split('Arrow');
        expect(carModel.direction).to.equal(direction[1].toLowerCase());
      })
    }

  })
})
