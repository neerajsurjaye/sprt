import fs from "fs";

class Writer {
    fileName: string;
    data: Array<string>;

    constructor(fileName: string) {
        this.fileName = fileName;
        this.data = [];
    }

    clearFile(): void {
        try {
            fs.writeFileSync(this.fileName, "");
        } catch (err) {
            console.error(err);
        }
    }

    append(str: string): void {
        this.data.push(str);
    }

    write(): void {
        let output: string = this.data.join("");

        try {
            fs.writeFileSync(this.fileName, output);
        } catch (err) {
            console.error(err);
        }
    }
}

export default Writer;
