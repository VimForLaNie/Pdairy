class Calculator {
    rangeAroundMax = 1;
    // numbers: number[] = [];
    dataInterval = new Array(0);
    
    bucketDefect = 0;
    noise = 0;
    emptyBucket = 0;

    constructor(noise: number,maxLoad : number, emptyBucket: number, bucketDefect: number) {
        this.emptyBucket = emptyBucket;
        this.bucketDefect = bucketDefect;
        this.noise = noise;
        this.dataInterval = new Array(Math.ceil(maxLoad / noise)).fill(0);
    }

    addNumber(number: number) {
        this.dataInterval[Math.floor(number / this.noise)] += 1;
    }

    showFrequency() {
        let dataTable = new Array(this.dataInterval.length);
        for (let i = 0; i < this.dataInterval.length; i++) {
            dataTable[i] = new Array(2);
            dataTable[i][1] = this.dataInterval[i];
            dataTable[i][0] = `${i * this.noise} - ${(i + 1) * this.noise}`;
        }
        console.table(dataTable);
    }

    calc(){
        let avgBucketValue = 0;
        let sumBucketValue = 0;
        let freqBucketValue = 0;
        let startBucketIndex = Math.floor((this.emptyBucket - this.bucketDefect) / this.noise);
        let endBucketIndex = Math.ceil((this.emptyBucket + this.bucketDefect) / this.noise);
        for (let i = startBucketIndex; i < endBucketIndex; i++) {
            sumBucketValue += this.noise*(i + 0.5)*this.dataInterval[i];
            freqBucketValue += this.dataInterval[i];
        }
        avgBucketValue = sumBucketValue / freqBucketValue;
        // console.debug(`avgBucketValue: ${avgBucketValue}`);

        let maxElementIndex = 0;
        for(let i = this.dataInterval.length; i >= 0; i--) {
            if(this.dataInterval[i] > 0) {
                maxElementIndex = i;
                break;
            }
        }
        // console.debug(`maxElementIndex: ${maxElementIndex}`)
        let maxElementFrequency = 0;
        let sumMaxElement = 0;
        for(let i = maxElementIndex; i >= maxElementIndex - this.rangeAroundMax; i--) {
            maxElementFrequency += this.dataInterval[i];
            sumMaxElement += this.noise*(i + 0.5)*this.dataInterval[i];
        }
        // console.debug(`maxElementFrequency: ${maxElementFrequency}`);
        // console.debug(`sumMaxElement: ${sumMaxElement}`);
        let avgMaxElement = sumMaxElement / maxElementFrequency; 
        let result = avgMaxElement - avgBucketValue;

        return result;
    }
}

export default Calculator;