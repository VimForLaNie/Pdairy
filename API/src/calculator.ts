class Calculator {
    private cowID: number = 0;
    private rawData: RawData[] = [];

    setCowID(cowID: number) {
        this.cowID = cowID;
    }

    add(data: RawData) {
        this.rawData.push(data);
    }

    calculate(): number {

        return 0;
    }
}

export default Calculator;