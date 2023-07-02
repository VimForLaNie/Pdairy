import Calculator from "./calculator";

let noise = 100;
let zero = 200;
let emptyBucket = 5000;
let peak = 21000;
let pollingIntervalMs = 1000;
let zeroDurationMs = 60000;
let emptyBucketDurationMs = 10000;
let increasingDurationMs = 240000;
let peakDurationMs = 1000;

let calculator = new Calculator(noise, 50000, emptyBucket, 1000);

for (let i = 0; i < zeroDurationMs/pollingIntervalMs; i++) {
    calculator.addNumber(zero + Math.random() * noise);
}

let sumBucketValue = 0;
let randomBucket = 0;
for (let i = 0; i < emptyBucketDurationMs/pollingIntervalMs; i++) {
    randomBucket = emptyBucket + Math.random() * noise;
    sumBucketValue += randomBucket;
    calculator.addNumber(randomBucket);
}
let avgBucketValue = sumBucketValue / (emptyBucketDurationMs/pollingIntervalMs);

let increasingData = new Array(increasingDurationMs/pollingIntervalMs);
for (let i = 0; i < increasingDurationMs/pollingIntervalMs; i++){
    increasingData[i] = Math.random() * (peak - emptyBucket) + emptyBucket - noise;
}
increasingData.sort();
for (let i = 0; i < increasingDurationMs/pollingIntervalMs; i++){
    calculator.addNumber(increasingData[i]);
}

let sumMaxElement = 0;
let randomPeak = 0;
for (let i = 0; i < peakDurationMs/pollingIntervalMs; i++) {
    randomPeak = peak + Math.random() * noise
    sumMaxElement += randomPeak;
    calculator.addNumber(randomPeak);
}
let avgMaxElement = sumMaxElement / (peakDurationMs/pollingIntervalMs);
console.log(`avgMaxElement: ${avgMaxElement}`);

calculator.showFrequency();
let result = calculator.calc();
console.log(`avgBucketValue: ${avgBucketValue}`);
console.log(`avgMaxElement: ${avgMaxElement}`);
console.info(`result: ${result} deviation : ${Math.abs(result - (peak - emptyBucket))}`);