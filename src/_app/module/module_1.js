import $ from 'jquery';

class Car {
    constructor(options) {
        this.model = $('dom').model;
        this.marka = options.marka;
    }

    drive(speed) {
        return console.log(`im driving withthe speed of ${speed}`);
    }

    honk() {
        const a = 1;
        if (a === 1) {
            let b = 2;
            b = b * 2;
            console.log(b);
        }

        for (let c = 0; c < 3; c++) {
            console.log('XX');
        }
    }

}

function randomFunc() {
    console.log('random function');
}

export { Car, randomFunc };
