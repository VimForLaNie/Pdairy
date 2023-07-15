class stateMachine {
    _state:State = 0;
    latestNumber = 0;
    _zeroThreshold = 300.00;
    _increasingAmount = 200.00;
    _movingAvg:number[] = [];
    _bucket = 0.00;
    result = 0.00;
    _movingAvgSize = 10;
    constructor() {
    }

    addNumber(number: number) {
        switch (this._state) {
            case 0:
                if(number > this._zeroThreshold) {
                    this._state = 1;
                    this._bucket = number;
                    console.debug(`found bucket . . . ${number}`);
                    break;
                }
                this.latestNumber = number;
                console.debug(`getting zeros. . . ${number}`);
                return -1;
            case 1:
                if(number < this.latestNumber + this._increasingAmount) {
                    this._state = 2;
                    console.debug(`slowing down. . . ${number}`);
                }
                else{
                    console.debug(`filling up. . . ${number}`);
                }
                this.latestNumber = number;
                return -1;
            case 2:
                if(number < this.latestNumber + this._increasingAmount) {
                    console.debug(`stablizing . . . ${number}`);
                    this._movingAvg.push(number);
                    if(this._movingAvg.length > this._movingAvgSize) {
                        this._movingAvg.shift();
                    }
                    this.result = this._movingAvg.reduce((a, b) => a + b, 0) / this._movingAvg.length;
                    return -1;
                }
                else if (number < this._zeroThreshold) {
                    console.debug(`get back to zero . . . ${number}`);
                    this._state = 0;
                    return this.getResult();
                }
                else if (number < this._bucket && number > this._zeroThreshold){
                    console.debug(`new bucket . . . ${number}`);
                    this._state = 1;
                    this._bucket = number;
                    return -1;
                }
                else if (number > this.latestNumber + this._increasingAmount) {
                    console.debug(`filling up(again?). . . ${number}`);
                    this._state = 1;
                    return -1;
                }
                break;
        }
    }
    getResult() {
        return this.result - this._bucket;
    }
}

export default stateMachine;