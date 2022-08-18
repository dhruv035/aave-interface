"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AaveBiconomyForwarderService = void 0;
const tslib_1 = require("tslib");
const BaseService_1 = (0, tslib_1.__importDefault)(require("../commons/BaseService"));
const types_1 = require("../commons/types");
const utils_1 = require("../commons/utils");
const paramValidators_1 = require("../commons/validators/paramValidators");
const erc20_contract_1 = require("../erc20-contract");
const synthetix_contract_1 = require("../synthetix-contract");
const IAaveBiconomyForwarder__factory_1 = require("./typechain/IAaveBiconomyForwarder__factory");
class AaveBiconomyForwarderService extends BaseService_1.default {
    constructor(provider, AaveBiconomyAddress) {
        super(provider, IAaveBiconomyForwarder__factory_1.IAaveBiconomyForwarder__factory);
        this.AaveBiconomyAddress = AaveBiconomyAddress;
        this.erc20Service = new erc20_contract_1.ERC20Service(provider);
        this.synthetixService = new synthetix_contract_1.SynthetixService(provider);
    }
    async depositToAave({ user, asset, amount, onBehalfOf, referralCode }) {
        const { isApproved, approve, decimalsOf } = this.erc20Service;
        const txs = [];
        const reserveDecimals = await decimalsOf(asset);
        const convertedAmount = (0, utils_1.valueToWei)(amount, reserveDecimals);
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
                amount: utils_1.DEFAULT_APPROVE_AMOUNT,
            });
            txs.push(approveTx);
        }
        console.log("WORKSs");
        const BiconomyForwarderContract = this.getContractInstance(this.AaveBiconomyAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => BiconomyForwarderContract.populateTransaction.depositToAave(asset, convertedAmount, onBehalfOf !== null && onBehalfOf !== void 0 ? onBehalfOf : user, referralCode !== null && referralCode !== void 0 ? referralCode : '0'),
            from: user,
        });
        txs.push({
            tx: txCallback,
            txType: types_1.eEthereumTxType.DLP_ACTION,
            gas: this.generateTxPriceEstimation(txs, txCallback, types_1.ProtocolAction.supply),
        });
        return txs;
    }
    async withdrawFromAave({ user, asset, amount, to }) {
        const { decimalsOf } = this.erc20Service;
        const reserveDecimals = await decimalsOf(asset);
        const convertedAmount = (0, utils_1.valueToWei)(amount, reserveDecimals);
        const BiconomyForwarderContract = this.getContractInstance(this.AaveBiconomyAddress);
        const txCallback = this.generateTxCallback({
            rawTxMethod: async () => BiconomyForwarderContract.populateTransaction.withdrawFromAave(asset, convertedAmount, to !== null && to !== void 0 ? to : user),
            from: user,
        });
        return [
            {
                tx: txCallback,
                txType: types_1.eEthereumTxType.DLP_ACTION,
                gas: this.generateTxPriceEstimation([], txCallback, types_1.ProtocolAction.withdraw),
            },
        ];
    }
}
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('user')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('asset')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('onBehalfOf')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AaveBiconomyForwarderService.prototype, "depositToAave", null);
(0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('user')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('asset')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isPositiveAmount)('amount')),
    (0, tslib_1.__param)(0, (0, paramValidators_1.isEthAddress)('to')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AaveBiconomyForwarderService.prototype, "withdrawFromAave", null);
exports.AaveBiconomyForwarderService = AaveBiconomyForwarderService;
//# sourceMappingURL=index.js.map