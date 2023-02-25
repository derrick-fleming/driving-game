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
  describe('NodeList of Racecards', () => {

    it('Nodelist should contain four elements of Racecars', () => {
      let $hiddenCar = document.querySelectorAll('.racecar.hidden');
      expect($hiddenCar.length).equal(4);
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
        expect($hiddenCar[changed].className).equal('racecar');
        expect($hiddenCar[changed + 1].className).equal('racecar hidden');
      }) }
  })

})
