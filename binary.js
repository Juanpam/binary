let number = 256;
let canvas = document.getElementById("binary");
let ctx = canvas.getContext("2d");
let dpi = window.devicePixelRatio;

function arrayOfBits(number,arraySize=0) {
    console.log(number)
    let result = [];
    while(number > 0) {
        result.push(Number(number % 2 != 0));
        number = number >>> 1;
    }
    while(arraySize - (result.length || result.length) > 0) {
        result.push(0);
    }
    return result.reverse();
}

let width = window.innerWidth * 2/3;
let height = window.innerHeight * 2/3;

numberOfBits = arrayOfBits(number-1).length;
let widthUnit =  width/ numberOfBits;
let heightUnit =  height/ number;

console.log(window.innerWidth, window.innerHeight, canvas.width, canvas.height);
function draw() {
    canvas.width = widthUnit * numberOfBits;
    canvas.height = heightUnit * number;
    fix_dpi();
    for (let n = 0; n < number; n++) {
        let bits = arrayOfBits(n,numberOfBits);
        console.log(bits);
        let initialY = n * heightUnit;
        bits.forEach((bit,index) => {
            let initialX = index * widthUnit; 
            ctx.fillStyle = bit ? 'white' : 'black';
            ctx.fillRect(Math.round(initialX), Math.round(initialY), Math.round(widthUnit), Math.round(heightUnit));
        });
    }
};

draw();