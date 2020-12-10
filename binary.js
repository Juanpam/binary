let columns = 8;
let canvas = document.getElementById("binary");
let ctx = canvas.getContext("2d");
let dpi = window.devicePixelRatio;
let scale = 1;
let time = 40;
let width = window.innerWidth * scale;
let height = window.innerHeight * scale;
let maxRed = 255, maxGreen = 255, maxBlue = 255;
let minRed = 10, minGreen = 10, minBlue = 10;
let red, green, blue;
let changeThreshold = 25;
function arrayOfBits(number,arraySize=0) {
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

function draw(number) {
    numberOfBits = arrayOfBits(number-1, 1).length;
    let realWidthUnit = width/ numberOfBits;
    let realHeightUnit = height/ number;
    let widthUnit =  parseInt(realWidthUnit) || realWidthUnit;
    let heightUnit =  parseInt(realHeightUnit) || realHeightUnit;
    let shouldDraw = true || widthUnit > 1 && heightUnit>1; 
    if(shouldDraw) {
        canvas.width = widthUnit * numberOfBits;
        canvas.height = heightUnit * number;
        for (let n = 0; n < number; n++) {
            let bits = arrayOfBits(n,numberOfBits);
            let initialY = n * heightUnit;
            // console.log(bits);
            bits.forEach((bit,index) => {
                let initialX = index * widthUnit; 
                // ctx.fillStyle = bit ? 'white' : `black`;
                ctx.fillStyle = bit ? 'white' : getColorString(index/bits.length, (n/number) * (index/bits.length), n/number);
                ctx.fillRect(initialX, initialY, widthUnit, heightUnit);
            });
        }
    }

    return shouldDraw;
};

function mixColors() {
    let oldRed = red;
    let oldGreen = green;
    let oldBlue = blue;
    

    while(isNaN(red) || isNaN(green) || isNaN(blue) || Math.min(Math.abs(red - oldRed), Math.abs(green-oldGreen), Math.abs(blue - oldBlue)) < changeThreshold) {
        red = Math.max(maxRed * Math.random(), minRed);
        green = Math.max(maxGreen * Math.random(), minGreen);
        blue = Math.max(maxBlue * Math.random(), minBlue);
        minRed = maxRed * Math.random();
        minGreen = maxGreen * Math.random();
        minBlue = maxBlue * Math.random();
        console.log(red, green, blue);
    }
    console.log(red, green, blue);
}

function getColorString(redPercentage, greenPercentage, bluePercentage) {
    return `rgb(${red*redPercentage},${green*greenPercentage},${blue*bluePercentage})`;
}


function drawRecursively(currentColumns=0, reverse=false, initialTime) {
    function callback() {
        // console.log(currentColumns, reverse);
        if(currentColumns > -1 && currentColumns < columns + 1) {
            draw(2**currentColumns);
        }
        if(currentColumns === columns+1 || currentColumns === -1) {
            // console.log('reversing');
            
            reverse = !reverse;
        }
        currentColumns = reverse ? currentColumns - 1 : currentColumns + 1;
        // console.log("after callback", currentColumns, reverse);
    }

    if(currentColumns === 0 && !reverse) {
        // console.log('initial callback');
        mixColors();
        callback();
    }

    if(currentColumns > -1 && currentColumns < columns + 1) {
        let newTime;
        if((currentColumns === 1 && !reverse)) {
            newTime = initialTime * 15;
        } else if ((currentColumns === columns -1 && reverse)) {
            newTime = initialTime * 50;
        } else {
            newTime = initialTime;
        }
        setTimeout(() => {
            callback();
            drawRecursively(currentColumns, reverse, initialTime);
        },newTime);    
    } else {
        // No wait since no draw
        // console.log('No wait callback');
        callback();
        drawRecursively(currentColumns, reverse, initialTime);
    }
}

drawRecursively(undefined,undefined,time);
