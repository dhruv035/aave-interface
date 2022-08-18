import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAaveBiconomyForwarder, IAaveBiconomyForwarderInterface } from "./IAaveBiconomyForwarder";
export declare class IAaveBiconomyForwarder__factory {
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IAaveBiconomyForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IAaveBiconomyForwarder;
}
//# sourceMappingURL=IAaveBiconomyForwarder__factory.d.ts.map