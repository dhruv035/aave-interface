/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, utils } from "ethers";
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "asset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "onBehalfOf",
                type: "address",
            },
            {
                internalType: "uint16",
                name: "referralCode",
                type: "uint16",
            },
        ],
        name: "depositToAave",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "lPAddress",
                type: "address",
            },
        ],
        name: "setLendingPoolAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "forwarder",
                type: "address",
            },
        ],
        name: "setTrustedForwarder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "asset",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
        ],
        name: "withdrawFromAave",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
export class IAaveBiconomyForwarder__factory {
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
IAaveBiconomyForwarder__factory.abi = _abi;
//# sourceMappingURL=IAaveBiconomyForwarder__factory.js.map