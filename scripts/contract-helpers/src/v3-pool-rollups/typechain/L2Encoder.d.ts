/* Autogenerated file. Do not edit manually. */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from 'ethers';
import { BytesLike } from '@ethersproject/bytes';
import { Listener, Provider } from '@ethersproject/providers';
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi';
import type { TypedEventFilter, TypedEvent, TypedListener } from './common';

interface L2EncoderInterface extends ethers.utils.Interface {
  functions: {
    'POOL()': FunctionFragment;
    'encodeBorrowParams(address,uint256,uint256,uint16)': FunctionFragment;
    'encodeLiquidationCall(address,address,address,uint256,bool)': FunctionFragment;
    'encodeRebalanceStableBorrowRate(address,address)': FunctionFragment;
    'encodeRepayParams(address,uint256,uint256)': FunctionFragment;
    'encodeRepayWithATokensParams(address,uint256,uint256)': FunctionFragment;
    'encodeRepayWithPermitParams(address,uint256,uint256,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'encodeSetUserUseReserveAsCollateral(address,bool)': FunctionFragment;
    'encodeSupplyParams(address,uint256,uint16)': FunctionFragment;
    'encodeSupplyWithPermitParams(address,uint256,uint16,uint256,uint8,bytes32,bytes32)': FunctionFragment;
    'encodeSwapBorrowRateMode(address,uint256)': FunctionFragment;
    'encodeWithdrawParams(address,uint256)': FunctionFragment;
  };

  encodeFunctionData(functionFragment: 'POOL', values?: undefined): string;
  encodeFunctionData(
    functionFragment: 'encodeBorrowParams',
    values: [string, BigNumberish, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeLiquidationCall',
    values: [string, string, string, BigNumberish, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeRebalanceStableBorrowRate',
    values: [string, string],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeRepayParams',
    values: [string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeRepayWithATokensParams',
    values: [string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeRepayWithPermitParams',
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeSetUserUseReserveAsCollateral',
    values: [string, boolean],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeSupplyParams',
    values: [string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeSupplyWithPermitParams',
    values: [
      string,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BigNumberish,
      BytesLike,
      BytesLike,
    ],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeSwapBorrowRateMode',
    values: [string, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: 'encodeWithdrawParams',
    values: [string, BigNumberish],
  ): string;

  decodeFunctionResult(functionFragment: 'POOL', data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: 'encodeBorrowParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeLiquidationCall',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeRebalanceStableBorrowRate',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeRepayParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeRepayWithATokensParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeRepayWithPermitParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeSetUserUseReserveAsCollateral',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeSupplyParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeSupplyWithPermitParams',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeSwapBorrowRateMode',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'encodeWithdrawParams',
    data: BytesLike,
  ): Result;

  events: {};
}

export class L2Encoder extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>,
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: L2EncoderInterface;

  functions: {
    POOL(overrides?: CallOverrides): Promise<[string]>;

    encodeBorrowParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeLiquidationCall(
      collateralAsset: string,
      debtAsset: string,
      user: string,
      debtToCover: BigNumberish,
      receiveAToken: boolean,
      overrides?: CallOverrides,
    ): Promise<[string, string]>;

    encodeRebalanceStableBorrowRate(
      asset: string,
      user: string,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeRepayParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeRepayWithATokensParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeRepayWithPermitParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, string, string]>;

    encodeSetUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeSupplyParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeSupplyWithPermitParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, string, string]>;

    encodeSwapBorrowRateMode(
      asset: string,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;

    encodeWithdrawParams(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<[string]>;
  };

  POOL(overrides?: CallOverrides): Promise<string>;

  encodeBorrowParams(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    referralCode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeLiquidationCall(
    collateralAsset: string,
    debtAsset: string,
    user: string,
    debtToCover: BigNumberish,
    receiveAToken: boolean,
    overrides?: CallOverrides,
  ): Promise<[string, string]>;

  encodeRebalanceStableBorrowRate(
    asset: string,
    user: string,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeRepayParams(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeRepayWithATokensParams(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeRepayWithPermitParams(
    asset: string,
    amount: BigNumberish,
    interestRateMode: BigNumberish,
    deadline: BigNumberish,
    permitV: BigNumberish,
    permitR: BytesLike,
    permitS: BytesLike,
    overrides?: CallOverrides,
  ): Promise<[string, string, string]>;

  encodeSetUserUseReserveAsCollateral(
    asset: string,
    useAsCollateral: boolean,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeSupplyParams(
    asset: string,
    amount: BigNumberish,
    referralCode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeSupplyWithPermitParams(
    asset: string,
    amount: BigNumberish,
    referralCode: BigNumberish,
    deadline: BigNumberish,
    permitV: BigNumberish,
    permitR: BytesLike,
    permitS: BytesLike,
    overrides?: CallOverrides,
  ): Promise<[string, string, string]>;

  encodeSwapBorrowRateMode(
    asset: string,
    interestRateMode: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  encodeWithdrawParams(
    asset: string,
    amount: BigNumberish,
    overrides?: CallOverrides,
  ): Promise<string>;

  callStatic: {
    POOL(overrides?: CallOverrides): Promise<string>;

    encodeBorrowParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeLiquidationCall(
      collateralAsset: string,
      debtAsset: string,
      user: string,
      debtToCover: BigNumberish,
      receiveAToken: boolean,
      overrides?: CallOverrides,
    ): Promise<[string, string]>;

    encodeRebalanceStableBorrowRate(
      asset: string,
      user: string,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeRepayParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeRepayWithATokensParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeRepayWithPermitParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, string, string]>;

    encodeSetUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeSupplyParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeSupplyWithPermitParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<[string, string, string]>;

    encodeSwapBorrowRateMode(
      asset: string,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;

    encodeWithdrawParams(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<string>;
  };

  filters: {};

  estimateGas: {
    POOL(overrides?: CallOverrides): Promise<BigNumber>;

    encodeBorrowParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeLiquidationCall(
      collateralAsset: string,
      debtAsset: string,
      user: string,
      debtToCover: BigNumberish,
      receiveAToken: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeRebalanceStableBorrowRate(
      asset: string,
      user: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeRepayParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeRepayWithATokensParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeRepayWithPermitParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeSetUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeSupplyParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeSupplyWithPermitParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeSwapBorrowRateMode(
      asset: string,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    encodeWithdrawParams(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    POOL(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    encodeBorrowParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeLiquidationCall(
      collateralAsset: string,
      debtAsset: string,
      user: string,
      debtToCover: BigNumberish,
      receiveAToken: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeRebalanceStableBorrowRate(
      asset: string,
      user: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeRepayParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeRepayWithATokensParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeRepayWithPermitParams(
      asset: string,
      amount: BigNumberish,
      interestRateMode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeSetUserUseReserveAsCollateral(
      asset: string,
      useAsCollateral: boolean,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeSupplyParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeSupplyWithPermitParams(
      asset: string,
      amount: BigNumberish,
      referralCode: BigNumberish,
      deadline: BigNumberish,
      permitV: BigNumberish,
      permitR: BytesLike,
      permitS: BytesLike,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeSwapBorrowRateMode(
      asset: string,
      interestRateMode: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    encodeWithdrawParams(
      asset: string,
      amount: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;
  };
}
