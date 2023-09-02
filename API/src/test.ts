// import stateMachine from "./calculator";

// let machine = new stateMachine();

// process.stdin.on('data', (data) => {
//     const input = data.toString().trim();
//     if(input === 'done'){
//         console.info('Final Result:', machine.getResult());
//         machine = new stateMachine();
//         return;
//     }
//     const num = parseFloat(input);
//     if (!isNaN(num)) {
//         machine.addNumber(num);
//     }
// });