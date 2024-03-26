'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
const crypto_1 = __importDefault(require('crypto'));
class Block {
    constructor(prevHash, heigh, data) {
        this.prevHash = prevHash;
        this.heigh = heigh;
        this.data = data;
        this.hash = Block.calculateHash(prevHash, heigh, data);
    }
    static calculateHash(prevHash, heigh, data) {
        const toHash = `${prevHash}${heigh}${data}`;
        return crypto_1.default
            .createHash('sha256')
            .update(toHash)
            .digest('hex');
    }
}
class Blockchain {
    constructor() {
        this.blocks = [];
    }
    getPrevHash() {
        if (this.blocks.length === 0) return '';
        return this.blocks[this.blocks.length - 1].hash;
    }
    addBlock(data) {
        const newBlock = new Block(
            this.getPrevHash(),
            this.blocks.length + 1,
            data
        );
        this.blocks.push(newBlock);
    }
    getBlocks() {
        return [...this.blocks];
    }
}
const blockchain = new Blockchain();
blockchain.addBlock('First one');
blockchain.addBlock('Second one');
blockchain.addBlock('Third one');
blockchain.addBlock('Fourth one');
console.log(blockchain.getBlocks());
