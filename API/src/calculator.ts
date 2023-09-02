import startRedisClient from './Redis/redisClient';

function safeGet(arr: number[], index: number) {
    if (Array.isArray(arr) && index >= 0 && index < arr.length) {
        return arr[index];
    } else {
        return Infinity;
    }
}

function longestIncreasingSubarray(arr: number[], increasingRange: number) {
    const dp = new Array(arr.length).fill(1)
    // console.log(`ir ${increasingRange}`);
    for (let i = 0; i < arr.length; i++) {
        let isIncreasing = false;
        let maxLength = 0;
        
        for (let j = 1; j <= increasingRange; j++) {
            // console.log(`i: ${i}, j: ${j} => ${arr[i - j]} ${arr[i]}`);
            if (safeGet(arr, i - j) <= arr[i]) {
                isIncreasing = true;
                maxLength = Math.max(maxLength, dp[i - j] + (j - 1));
            }
        }
        if (isIncreasing) { 
            // console.log(`increasing ! ! !`)
            dp[i] += maxLength;
        }
        // console.log(`i: ${i}, arr[i]: ${arr[i]}, dp[i]: ${dp[i]}`)
    }
    return dp;
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
        redisClient.get("deviceError").then(res => this.deviceError = parseFloat(res ?? ""))
        redisClient.get("bucketError").then(res => this.bucketError = parseFloat(res ?? ""))
        redisClient.get("resultError").then(res => this.resultError = parseFloat(res ?? ""))
        // redisClient.get("increasingRange").then(res => this.increasingRange = parseFloat(res ?? ""))
        this.increasingRange = 3;
        redisClient.quit();
    }

    setCowID(id: number) { this.cowID = id; }

    getCowID() { return this.cowID === -9 ? null : this.cowID }

    add(weight: number) { this.array.push(weight); }

    calculate() {
         //longest increasing subarray
         console.table(longestIncreasingSubarray(this.array, this.increasingRange));
    }
}

export default Calculator;