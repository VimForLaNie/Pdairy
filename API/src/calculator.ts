import startRedisClient from './Redis/redisClient';

function safeGet(arr: number[], index: number) {
    if (Array.isArray(arr) && index >= 0 && index < arr.length) {
        return arr[index];
    } else {
        return Infinity;
    }
}

function indexOfMax(arr:number[]) {
  if (arr.length === 0) {
    return -1; // Return -1 if the array is empty.
  }

  let max = arr[0]; // Initialize max to the first element of the array.
  let maxIndex = 0; // Initialize maxIndex to 0.

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i]; // Update max if a larger element is found.
      maxIndex = i; // Update maxIndex to the index of the larger element.
    }
  }

  return maxIndex; // Return the index of the maximum element.
}

function longestIncreasingSubarray(arr: number[], increasingRange: number) {
    const dp = new Array(arr.length).fill(1)
    // console.log(`ir ${increasingRange}`);
    for (let i = 0; i < arr.length; i++) {
        let isIncreasing = false;
        let maxLength = 0;
        
        for (let j = 1; j <= increasingRange; j++) {
            // console.log(`i: ${i}, j: ${j} => ${arr[i - j]} ${arr[i]}`);
            if (safeGet(arr, i - j) > arr[i]) { continue; }
            isIncreasing = true;
            maxLength = Math.max(maxLength, dp[i - j] + (j - 1));
        }
        if (isIncreasing) { dp[i] += maxLength; }
        // console.log(`i: ${i}, arr[i]: ${arr[i]}, dp[i]: ${dp[i]}`)
    }
    let idx = indexOfMax(dp);
    return [idx,dp[idx]];
}

class Calculator {
    private cowID: number;
    private array: number[] = [];
    private deviceError: number = 0;
    private bucketError: number = 0;
    private resultError: number = 0;
    private increasingRange: number = 3;
    constructor() {
        this.cowID = -9;
        const redisClient = startRedisClient();
        this.array = [];
        redisClient.get("deviceError").then(res => this.deviceError = parseFloat(res ?? "1"))
        redisClient.get("bucketError").then(res => this.bucketError = parseFloat(res ?? "2"))
        redisClient.get("resultError").then(res => this.resultError = parseFloat(res ?? "3"))
        // redisClient.get("increasingRange").then(res => this.increasingRange = parseFloat(res ?? ""))
        this.increasingRange = 3;
        redisClient.quit();
    }

    setCowID(id: number) { this.cowID = id; }

    getCowID() { return this.cowID === -9 ? null : this.cowID }

    add(weight: number) { this.array.push(weight); }

    calculate() {
        const [index, val] = longestIncreasingSubarray(this.array, this.increasingRange);
        const start = index - val + 1;
        const end = index;
        let bucket = 0;
        for(let i = start; i <= end; i++) {
            bucket += this.array[i];
        }
        bucket /= val;
        let stablizing = 0;
        for(let i = end + 1; i < this.array.length; i++) {
            stablizing += this.array[i];
        }
        stablizing /= this.array.length - end - 1;
        const result = bucket - stablizing;
        return result;
    }
}

export default Calculator;