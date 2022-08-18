import { __decorate, __metadata, __param } from "tslib";
import BaseService from '../commons/BaseService';
import { eEthereumTxType, ProtocolAction, } from '../commons/types';
import { valueToWei, DEFAULT_APPROVE_AMOUNT } from '../commons/utils';
import { isEthAddress, isPositiveAmount, } from '../commons/validators/paramValidators';
import { ERC20Service } from '../erc20-contract';
import { SynthetixService } from '../synthetix-contract';
import { IAaveBiconomyForwarder__factory } from './typechain/IAaveBiconomyForwarder__factory';
export class AaveBiconomyForwarderService extends BaseService {
    constructor(provider, AaveBiconomyAddress) {
        super(provider, IAaveBiconomyForwarder__factory);
        this.AaveBiconomyAddress = AaveBiconomyAddress;
        this.erc20Service = new ERC20Service(provider);
        this.synthetixService = new SynthetixService(provider);
    }
    async depositToAave({ user, asset, amount, onBehalfOf, referralCode }) {
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const txs = [];
        const reserveDecimals = await decimalsOf(asset);
        const convertedAmount = valueToWei(amount, reserveDecimals);
        const approved = await isApproved({
            token: asset,
            user,
            spender: this.AaveBiconomyAddress,
            amount,
        });
        if (!approved) {
            const approveTx = approve({
                user,
                token: asset,
                spender: this.AaveBiconomyAddress,
                amount: DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        const BiconomyForwarderContract = this.getContractInstance(this.AaveBiconomyAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => BiconomyForwarderContract.populateTransaction.depositToAave(asset, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.supply),
        });
        return txs;
    }
    async withdrawFromAave({ user, asset, amount, to }) {
        const { decimalsOf } = this.erc20Service;
        const reserveDecimals = await decimalsOf(asset);
        const convertedAmount = valueToWei(amount, reserveDecimals);
        const BiconomyForwarderContract = this.getContractInstance(this.AaveBiconomyAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => BiconomyForwarderContract.populateTransaction.withdrawFromAave(asset, convertedAmount, to !== null && to !== void 0 ? to : user),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, ProtocolAction.withdraw),
            },
        ];
    }
}
__decorate([
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('asset')),
    __param(0, isPositiveAmount('amount')),
    __param(0, isEthAddress('onBehalfOf')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AaveBiconomyForwarderService.prototype, "depositToAave", null);
__decorate([
    __param(0, isEthAddress('user')),
    __param(0, isEthAddress('asset')),
    __param(0, isPositiveAmount('amount')),
    __param(0, isEthAddress('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AaveBiconomyForwarderService.prototype, "withdrawFromAave", null);
//# sourceMappingURL=index.js.map