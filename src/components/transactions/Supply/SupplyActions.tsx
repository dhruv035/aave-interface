import { Pool, AaveBiconomyForwarderService } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { BoxProps, Box, Button } from '@mui/material';
import { utils } from 'ethers';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { permitByChainAndToken } from 'src/ui-config/permitConfig';
import { optimizedPath } from 'src/utils/utils';
import { useState } from 'react';
import { useTransactionHandler } from '../../../helpers/useTransactionHandler';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface SupplyActionProps extends BoxProps {
  amountToSupply: string;
  poolReserve: ComputedReserveData;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  poolAddress: string;
  symbol: string;
  blocked: boolean;
}

export const SupplyActions = ({
  amountToSupply,
  poolAddress,
  isWrongNetwork,
  sx,
  symbol,
  blocked,
  ...props
}: SupplyActionProps) => {
  const [biconomy, setBiconomy] = useState<boolean>(false);
  const [isForward, setIsForward] = useState<boolean>(false);
  const { lendingPool, BiconomyProxy } = useTxBuilderContext();
  const { currentChainId: chainId, currentMarketData } = useProtocolDataContext();
  const { currentAccount } = useWeb3Context();

  const { approval, action, requiresApproval, loadingTxns, approvalTxState, mainTxState } =
    useTransactionHandler({
      useBiconomy: biconomy,
      isForward: isForward,
      tryPermit:
        currentMarketData.v3 && permitByChainAndToken[chainId]?.[utils.getAddress(poolAddress)],
      handleGetTxns: async () => {
        //Use biconomy relayer contract for transaction
        if (biconomy) {
          console.log('biconomy :>> ', biconomy);
          const proxy: AaveBiconomyForwarderService = BiconomyProxy as AaveBiconomyForwarderService;
          return proxy.depositToAave({
            user: currentAccount,
            asset: poolAddress,
            amount: amountToSupply,
            onBehalfOf: currentAccount,
            referralCode: '0',
          });
        } else if (currentMarketData.v3) {
          // TO-DO: No need for this cast once a single Pool type is used in use-tx-builder-context
          const newPool: Pool = lendingPool as Pool;
          return newPool.supply({
            user: currentAccount,
            reserve: poolAddress,
            amount: amountToSupply,
            useOptimizedPath: optimizedPath(chainId),
          });
        } else {
          return lendingPool.deposit({
            user: currentAccount,
            reserve: poolAddress,
            amount: amountToSupply,
          });
        }
      },
      handleGetPermitTxns: async (signature, deadline) => {
        const newPool: Pool = lendingPool as Pool;
        return newPool.supplyWithPermit({
          user: currentAccount,
          reserve: poolAddress,
          amount: amountToSupply,
          signature,
          useOptimizedPath: optimizedPath(chainId),
          deadline,
        });
      },
      skip: !amountToSupply || parseFloat(amountToSupply) === 0,
      deps: [amountToSupply, poolAddress, biconomy, isForward],
    });

  return (
    <Box>
      <Button
        disabled={currentMarketData.addresses.BICONOMY_PROXY ? false : true}
        onClick={() => {
          setBiconomy(true);
        }}
      >
        Biconomy Transaction
      </Button>
      <Button
        onClick={() => {
          setBiconomy(false);
        }}
      >
        Normal Transaction
      </Button>
      {biconomy && (
        <>
          <Button
            onClick={() => {
              setIsForward(true);
            }}
          >
            Use Forward
          </Button>
          <Button
            onClick={() => {
              setIsForward(false);
            }}
          >
            Use without Gas
          </Button>
        </>
      )}
      <TxActionsWrapper
        blocked={blocked}
        mainTxState={mainTxState}
        approvalTxState={approvalTxState}
        isWrongNetwork={isWrongNetwork}
        requiresAmount
        amount={amountToSupply}
        preparingTransactions={loadingTxns}
        actionText={<Trans>Supply {symbol}</Trans>}
        actionInProgressText={<Trans>Supplying {symbol}</Trans>}
        handleApproval={() => approval(amountToSupply, poolAddress)}
        handleAction={action}
        requiresApproval={requiresApproval}
        sx={sx}
        {...props}
      />
    </Box>
  );
};
