const dice = document.getElementById('dice');
const rollButton = document.getElementById('rollButton');
let isDragging = false;
let isRolling = false;
let lastX = 0, lastY = 0;
let rotationX = 0, rotationY = 0, rotationZ = 0;
let momentumX = 0, momentumY = 0;
const momentumDecay = 0.95;

dice.addEventListener('mousedown', (event) => {
    if (!isRolling) {  // Only allow dragging if the dice is not rolling
        isDragging = true;
        lastX = event.clientX;
        lastY = event.clientY;
        dice.style.transition = 'none';  // Disable transition for smooth dragging
    }
});

document.addEventListener('mouseup', () => {
    if (!isRolling && isDragging) {
        isDragging = false;
        dice.style.transition = 'transform 0.1s ease-out';
        applyMomentum();  // Apply momentum after dragging
    }
});

dice.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        rotationX -= dy * 0.5;
        rotationY += dx * 0.5;

        dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        momentumX = dy * 0.5;
        momentumY = dx * 0.5;

        lastX = event.clientX;
        lastY = event.clientY;
    }
});

function applyMomentum() {
    if (!isDragging) {
        rotationX -= momentumX;
        rotationY -= momentumY;

        dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        momentumX *= momentumDecay;
        momentumY *= momentumDecay;

        if (Math.abs(momentumX) > 0.1 || Math.abs(momentumY) > 0.1) {
            requestAnimationFrame(applyMomentum);
        }
    }
}

rollButton.addEventListener('click', () => {
    if (!isRolling) {
        rollDiceWithEasing();
    }
});

function rollDiceWithEasing() {
    isRolling = true;  // Disable dragging during rolling

    const rollDuration = 3000; // Total roll duration (3 seconds)
    const startTime = performance.now();

    const maxRotationSpeed = 50;  // High speed at the start for faster rotation
    const decayRate = 0.90;       // Stronger decay for more slowness towards the end

    const animateRoll = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / rollDuration, 1); // Progress ranges from 0 to 1

        // Apply exponential decay to slow down the dice rotation significantly
        const currentSpeed = maxRotationSpeed * Math.pow(decayRate, progress * 20); // Stronger decay over time

        // Apply the current speed to the rotation angles
        rotationX += Math.random() * currentSpeed;
        rotationY += Math.random() * currentSpeed;
        rotationZ += Math.random() * currentSpeed;

        // Apply the rotation transformation
        dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`;

        if (progress < 1) {
            requestAnimationFrame(animateRoll); // Continue animating until time is up
        } else {
            // After the dice finishes rotating, show a specific side
            const randomSide = Math.floor(Math.random() * 6) + 1;
            displayDiceSide(randomSide);
            isRolling = false;  // Allow dragging again after rolling finishes
        }
    };

    requestAnimationFrame(animateRoll);
}

function displayDiceSide(side) {
    let rotationValues = {
        1: 'rotateX(0deg) rotateY(0deg)',      
        2: 'rotateX(0deg) rotateY(90deg)',     
        3: 'rotateX(-90deg) rotateY(0deg)',    
        4: 'rotateX(90deg) rotateY(0deg)',     
        5: 'rotateX(0deg) rotateY(-90deg)',    
        6: 'rotateX(180deg) rotateY(0deg)'     
    };

    dice.style.transition = 'transform 1.5s ease';
    dice.style.transform = rotationValues[side];
}




// const dice = document.getElementById('dice');
// const rollButton = document.getElementById('rollButton');
// let isDragging = false;
// let lastX = 0, lastY = 0;
// let rotationX = 0, rotationY = 0;
// let momentumX = 0, momentumY = 0;
// const momentumDecay = 0.95;

// dice.addEventListener('mousedown', (event) => {
//     isDragging = true;
//     lastX = event.clientX;
//     lastY = event.clientY;
//     dice.style.transition = 'none';
// });

// document.addEventListener('mouseup', () => {
//     isDragging = false;
//     dice.style.transition = 'transform 0.1s ease-out';
//     applyMomentum();
// });

// dice.addEventListener('mousemove', (event) => {
//     if (isDragging) {
//         const dx = event.clientX - lastX;
//         const dy = event.clientY - lastY;

//         rotationX -= dy * 0.5;
//         rotationY += dx * 0.5;

//         dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

//         momentumX = dy * 0.5;
//         momentumY = dx * 0.5;

//         lastX = event.clientX;
//         lastY = event.clientY;
//     }
// });

// function applyMomentum() {
//     if (!isDragging) {
//         rotationX -= momentumX; 
//         rotationY -= momentumY;

//         dice.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

//         momentumX *= momentumDecay;
//         momentumY *= momentumDecay;

//         if (Math.abs(momentumX) > 0.1 || Math.abs(momentumY) > 0.1) {
//             requestAnimationFrame(applyMomentum);
//         }
//     }
// }

// rollButton.addEventListener('click', () => {
//     rollDiceSlowly();
// });

// function rollDiceSlowly() {
//     const rollDuration = 2000; // Total roll duration in milliseconds (5 seconds)
//     const rollInterval =200; // Interval between rotations in milliseconds
//     const totalRolls = rollDuration / rollInterval;

//     let currentRoll = 0;
//     const rollTimer = setInterval(() => {
//         const rollRotationX = Math.random() * 720 + 360; 
//         const rollRotationY = Math.random() * 720 + 360;
//         const rollRotationZ = Math.random() * 720;       

//         dice.style.transition = 'transform 0.1s ease';
//         dice.style.transform = `rotateX(${rollRotationX}deg) rotateY(${rollRotationY}deg) rotateZ(${rollRotationZ}deg)`;

//         currentRoll++;
//         if (currentRoll >= totalRolls) {
//             clearInterval(rollTimer);
//             const randomSide = Math.floor(Math.random() * 6) + 1;
//             displayDiceSide(randomSide);
//         }
//     }, rollInterval);
// }

// function displayDiceSide(side) {
//     let rotationValues = {
//         1: 'rotateX(0deg) rotateY(0deg)',      
//         2: 'rotateX(0deg) rotateY(90deg)',     
//         3: 'rotateX(-90deg) rotateY(0deg)',    
//         4: 'rotateX(90deg) rotateY(0deg)',     
//         5: 'rotateX(0deg) rotateY(-90deg)',    
//         6: 'rotateX(180deg) rotateY(0deg)'     
//     };

//     dice.style.transition = 'transform 1s ease';
//     dice.style.transform = rotationValues[side];
// }
