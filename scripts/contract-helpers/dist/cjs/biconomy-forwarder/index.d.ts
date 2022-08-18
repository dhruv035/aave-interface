import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import { EthereumTransactionTypeExtended, tEthereumAddress } from '../commons/types';
import { IERC20ServiceInterface } from '../erc20-contract';
import { SynthetixInterface } from '../synthetix-contract';
import { IAaveBiconomyForwarder } from './typechain/IAaveBiconomyForwarder';
export interface IAaveBiconomyForwarderServiceInterface {
    depositToAave: (args: DepositType) => Promise<EthereumTransactionTypeExtended[]>;
    withdrawFromAave: (args: WithdrawType) => Promise<EthereumTransactionTypeExtended[]>;
}
export declare type DepositType = {
    user: tEthereumAddress;
    asset: tEthereumAddress;
    amount: string;
    onBehalfOf: tEthereumAddress;
    referralCode: string;
};
export declare type WithdrawType = {
    user: tEthereumAddress;
    asset: tEthereumAddress;
    amount: string;
    to: tEthereumAddress;
};
export declare class AaveBiconomyForwarderService extends BaseService<IAaveBiconomyForwarder> implements IAaveBiconomyForwarderServiceInterface {
    readonly AaveBiconomyAddress: string;
    readonly erc20Service: IERC20ServiceInterface;
    readonly synthetixService: SynthetixInterface;
    constructor(provider: providers.Provider, AaveBiconomyAddress: tEthereumAddress);
    depositToAave({ user, asset, amount, onBehalfOf, referralCode }: DepositType): Promise<EthereumTransactionTypeExtended[]>;
    withdrawFromAave({ user, asset, amount, to }: WithdrawType): Promise<EthereumTransactionTypeExtended[]>;
}
//# sourceMappingURL=index.d.ts.map