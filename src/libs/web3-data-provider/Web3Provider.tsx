import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { Biconomy } from '@biconomy/mexa';
import { hexToAscii } from 'src/utils/utils';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';

import { Web3Context } from '../hooks/useWeb3Context';
import { getWallet, WalletType } from './WalletOptions';
import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  JsonRpcProvider,
  TransactionResponse,
  // Web3Provider,
} from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { BigNumber, providers } from 'ethers';
import { SignatureLike } from '@ethersproject/bytes';
import { API_ETH_MOCK_ADDRESS, transactionType } from '@aave/contract-helpers';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { TorusConnector } from '@web3-react/torus-connector';

export type ERC20TokenType = {
  address: string;
  symbol: string;
  decimals: number;
  image?: string;
  aToken?: boolean;
};

export type Web3Data = {
  connectWallet: (wallet: WalletType) => Promise<void>;
  disconnectWallet: () => void;
  currentAccount: string;
  connected: boolean;
  loading: boolean;
  provider: JsonRpcProvider | undefined;
  chainId: number;
  switchNetwork: (chainId: number) => Promise<void>;
  getTxError: (txHash: string) => Promise<string>;
  sendTx: (txData: transactionType) => Promise<TransactionResponse>;
  sendBiconomyTx: (txData: transactionType) => Promise<TransactionResponse>;
  addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signTxData: (unsignedData: string) => Promise<SignatureLike>;
  error: Error | undefined;
  switchNetworkError: Error | undefined;
  setSwitchNetworkError: (err: Error | undefined) => void;
};

export const Web3ContextProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const {
    account,
    chainId,
    library: provider,
    activate,
    active,
    error,
    deactivate,
    setError,
  } = useWeb3React<providers.Web3Provider>();

  // const [provider, setProvider] = useState<JsonRpcProvider>();
  const [mockAddress, setMockAddress] = useState<string>();
  const [connector, setConnector] = useState<AbstractConnector>();
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [triedSafe, setTriedSafe] = useState(false);
  const [switchNetworkError, setSwitchNetworkError] = useState<Error>();
  const [triedCoinbase, setTriedCoinbase] = useState(false);

  // for now we use network changed as it returns the chain string instead of hex
  // const handleChainChanged = (chainId: number) => {
  //   console.log('chainChanged', chainId);
  //   if (selectedWallet) {
  //     connectWallet(selectedWallet);
  //   }
  // };

  // Wallet connection and disconnection
  // clean local storage
  const cleanConnectorStorage = useCallback((): void => {
    if (connector instanceof WalletConnectConnector) {
      localStorage.removeItem('walletconnect');
    } else if (connector instanceof WalletLinkConnector) {
      localStorage.removeItem('-walletlink:https://www.walletlink.org:version');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:id');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:secret');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:session:linked');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:AppVersion');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:Addresses');
      localStorage.removeItem('-walletlink:https://www.walletlink.org:walletUsername');
    } else if (connector instanceof TorusConnector) {
      localStorage.removeItem('loglevel:torus.js');
      localStorage.removeItem('loglevel:torus-embed');
      localStorage.removeItem('loglevel:http-helpers');
    }
  }, [connector]);

  const disconnectWallet = useCallback(async () => {
    cleanConnectorStorage();
    localStorage.removeItem('walletProvider');
    deactivate();
    // @ts-expect-error close can be returned by wallet
    if (connector && connector.close) {
      // @ts-expect-error close can be returned by wallet
      // close will remove wallet from DOM if provided by wallet
      await connector.close();
    }

    setLoading(false);
    setDeactivated(true);
    setSwitchNetworkError(undefined);
    if (mockAddress) {
      setMockAddress(undefined);
      localStorage.removeItem('mockWalletAddress');
    }
  }, [provider, connector]);

  // connect to the wallet specified by wallet type
  const connectWallet = useCallback(
    async (wallet: WalletType) => {
      setLoading(true);
      try {
        const connector: AbstractConnector = getWallet(wallet, chainId);

        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined;
        }

        await activate(connector, undefined, true);
        setConnector(connector);
        setSwitchNetworkError(undefined);
        localStorage.setItem('walletProvider', wallet.toString());
        setDeactivated(false);
        setLoading(false);
      } catch (e) {
        console.log('error on activation', e);
        setError(e);
        // disconnectWallet();
        setLoading(false);
      }
    },
    [disconnectWallet]
  );

  const activateInjectedProvider = (providerName: string | 'MetaMask' | 'CoinBase') => {
    //@ts-expect-error ethereum doesnt necessarly exist
    const { ethereum } = window;

    if (!ethereum?.providers) {
      return true;
    }

    let provider;
    switch (providerName) {
      case 'CoinBase':
        provider = ethereum.providers.find(
          //@ts-expect-error no type
          ({ isCoinbaseWallet, isCoinbaseBrowser }) => isCoinbaseWallet || isCoinbaseBrowser
        );
        break;
      case 'MetaMask':
        //@ts-expect-error no type
        provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
        break;
      default:
        return false;
    }

    if (provider) {
      ethereum.setSelectedProvider(provider);
      return true;
    }

    return false;
  };

  // second, try connecting to coinbase
  useEffect(() => {
    if (!triedCoinbase) {
      // do check if condition applies to try and connect directly to coinbase
      if (triedSafe) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const injectedProvider = (window as any)?.ethereum;
        if (injectedProvider?.isCoinbaseBrowser) {
          const canConnectToCoinbase = activateInjectedProvider('CoinBase');
          if (canConnectToCoinbase) {
            connectWallet(WalletType.INJECTED)
              .then(() => {
                setTriedCoinbase(true);
              })
              .catch(() => {
                setTriedCoinbase(true);
              });
          } else {
            // @ts-expect-error ethereum might not be in window
            const { ethereum } = window;

            if (ethereum) {
              activateInjectedProvider('CoinBase');
              ethereum.request({ method: 'eth_requestAccounts' });
            }

            setTriedCoinbase(true);
          }
        } else {
          setTriedCoinbase(true);
        }
      }
    }
  }, [connectWallet, triedSafe, setTriedCoinbase, triedCoinbase]);

  // first, try connecting to a gnosis safe
  useEffect(() => {
    if (!triedSafe) {
      const gnosisConnector = getWallet(WalletType.GNOSIS);
      // @ts-expect-error isSafeApp not in abstract connector type
      gnosisConnector.isSafeApp().then((loadedInSafe) => {
        if (loadedInSafe) {
          connectWallet(WalletType.GNOSIS)
            .then(() => {
              setTriedSafe(true);
            })
            .catch(() => {
              setTriedSafe(true);
            });
        } else {
          setTriedSafe(true);
        }
      });
    }
  }, [connectWallet, setTriedSafe, triedSafe]);

  // handle logic to eagerly connect to the injected ethereum provider,
  // if it exists and has granted access already
  useEffect(() => {
    const lastWalletProvider = localStorage.getItem('walletProvider');
    if (!active && !deactivated && triedSafe && triedCoinbase) {
      if (!!lastWalletProvider) {
        connectWallet(lastWalletProvider as WalletType).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
        // For now we will not eagerly connect to injected provider
        // const injected = getWallet(WalletType.INJECTED);
        // // @ts-expect-error isAuthorized not in AbstractConnector type. But method is there for
        // // injected provider
        // injected.isAuthorized().then((isAuthorized: boolean) => {
        //   if (isAuthorized) {
        //     connectWallet(WalletType.INJECTED).catch(() => {
        //       setTried(true);
        //     });
        //   } else {
        //     setTried(true);
        //   }
        // });
      }
    }
  }, [activate, setTried, active, connectWallet, deactivated, triedSafe, triedCoinbase]);

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active]);

  // Tx methods

  // TODO: we use from instead of currentAccount because of the mock wallet.
  // If we used current account then the tx could get executed
  const sendTx = async (txData: transactionType): Promise<TransactionResponse> => {
    if (provider) {
      console.log('here');
      const { from, ...data } = txData;
      const signer = provider.getSigner(from);
      const txResponse: TransactionResponse = await signer.sendTransaction({
        ...data,
        value: data.value ? BigNumber.from(data.value) : undefined,
      });
      console.log('txResponse :>> ', txResponse);
      return txResponse;
    }
    throw new Error('Error sending transaction. Provider not found');
  };

  //send Tx using biconomy provider
  const sendBiconomyTx = async (txData: transactionType): Promise<TransactionResponse> => {
    if (provider) {
      txData.signatureType = 'EIP712_SIGN';
      console.log('txData :>> ', txData);
      const api = 'I8c1XB-l6.ed819000-f9a-43d0-8c76-583b9b77bb98';
      console.log('api :>> ', api);
      const biconomy = new Biconomy(provider.provider, {
        apiKey: api,
        debug: true,
      });
      //return a promise that resolves to transaction response
      const a = new Promise<TransactionResponse>((resolve, reject) => {
        biconomy
          .onEvent(biconomy.READY, async () => {
            const bProvider = biconomy.getEthersProvider();

            //send Tx with biconomy provider wrapper, it handles collection of signature from user
            let txResponse: string;
            try {
              txResponse = await bProvider.send('eth_sendTransaction', [txData]);
              const result = provider.getTransaction(txResponse);
              console.log('Transaction hash : ', result);
              resolve(result);
            } catch (error) {
              console.log('error :>> ', error);
              reject(new Error(error.message));
            }
            //Use the hash obtained from the biconomy provider to fetch full TransactionResponse
          })
          .onEvent(biconomy.ERROR, (error) => {
            console.log('HHerror :>> ', error);
            reject(new Error(error.message));
          });
      });
      return a;
    }
    throw new Error('Error sending transaction. Provider not found');
  };

  //Forward Biconomy Tx
  //TODO: Add token Address flow from modal to here
  //TODO: Add a flow for permit of gas tokens
  const sendBiconomyForwardTx = async (txData: transactionType): Promise<TransactionResponse> => {
    if (provider) {
      const tokenAddress = '0xDF1742fE5b0bFc12331D8EAec6b478DfDbD31464';
      let ercForwarderClient;
      let permitClient;
      console.log('aa', txData);
      const api = process.env.BICONOMY_API_KEY;
      const biconomy = new Biconomy(provider.provider, {
        apiKey: api,
        debug: true,
      });
      console.log('AbC');
      const a = new Promise<TransactionResponse>((resolve, reject) => {
        biconomy
          .onEvent(biconomy.READY, async () => {
            // Initialize your dapp here like getting user accounts etc
            ercForwarderClient = biconomy.erc20ForwarderClient;
            permitClient = biconomy.permitClient;
            console.log('ercForwarderClient :>> ', ercForwarderClient);
            console.log('permitClient :>> ', permitClient);
            const builtTx = await ercForwarderClient.buildTx({
              to: txData.to,
              token: tokenAddress,
              txGas: txData.gasLimit,
              data: txData.data,
            });
            const tx = builtTx.request;
            //Show the fee to your users!!!
            const fee = builtTx.cost;
            // number of ERC20 tokens user will pay on behalf of gas for this transaction
            console.log(fee);

            // returns a json object with txHash (if transaction is successful), log, message, code and flag
            const txResponse = await ercForwarderClient.sendTxEIP712Sign({ req: tx });
            //const bprovider = biconomy.getEthersProvider();
            //const txResponse: string = await bprovider.send('eth_sendTransaction', [txData]);
            //const result = provider.getTransaction(txResponse);
            console.log('Transaction hash : ', txResponse);
            resolve(txResponse);
          })
          .onEvent(biconomy.ERROR, (error: string) => {
            reject(new Error(error));
          });
      });
      return a;
    }
    throw new Error('Error sending transaction. Provider not found');
  };

  // TODO: recheck that it works on all wallets
  const signTxData = async (unsignedData: string): Promise<SignatureLike> => {
    if (provider && account) {
      const signature: SignatureLike = await provider.send('eth_signTypedData_v4', [
        account,
        unsignedData,
      ]);

      return signature;
    }
    throw new Error('Error initializing permit signature');
  };

  const switchNetwork = async (newChainId: number) => {
    if (provider) {
      try {
        await provider.send('wallet_switchEthereumChain', [
          { chainId: `0x${newChainId.toString(16)}` },
        ]);
        setSwitchNetworkError(undefined);
      } catch (switchError) {
        const networkInfo = getNetworkConfig(newChainId);
        if (switchError.code === 4902) {
          try {
            try {
              await provider.send('wallet_addEthereumChain', [
                {
                  chainId: `0x${newChainId.toString(16)}`,
                  chainName: networkInfo.name,
                  nativeCurrency: {
                    symbol: networkInfo.baseAssetSymbol,
                    decimals: networkInfo.baseAssetDecimals,
                  },
                  rpcUrls: [...networkInfo.publicJsonRPCUrl, networkInfo.publicJsonRPCWSUrl],
                  blockExplorerUrls: [networkInfo.explorerLink],
                },
              ]);
            } catch (error) {
              if (error.code !== 4001) {
                throw error;
              }
            }
            setSwitchNetworkError(undefined);
          } catch (addError) {
            setSwitchNetworkError(addError);
          }
        } else if (switchError.code === 4001) {
          setSwitchNetworkError(undefined);
        } else {
          setSwitchNetworkError(switchError);
        }
      }
    }
  };

  const getTxError = async (txHash: string): Promise<string> => {
    if (provider) {
      const tx = await provider.getTransaction(txHash);
      // @ts-expect-error TODO: need think about "tx" type
      const code = await provider.call(tx, tx.blockNumber);
      const error = hexToAscii(code.substr(138));
      return error;
    }
    throw new Error('Error getting transaction. Provider not found');
  };

  const addERC20Token = async ({
    address,
    symbol,
    decimals,
    image,
  }: ERC20TokenType): Promise<boolean> => {
    // using window.ethereum as looks like its only supported for metamask
    // and didn't manage to make the call with ethersjs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const injectedProvider = (window as any).ethereum;
    if (provider && account && window && injectedProvider) {
      if (address.toLowerCase() !== API_ETH_MOCK_ADDRESS.toLowerCase()) {
        await injectedProvider.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address,
              symbol,
              decimals,
              image,
            },
          },
        });

        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    setMockAddress(localStorage.getItem('mockWalletAddress')?.toLowerCase());
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3ProviderData: {
          connectWallet,
          disconnectWallet,
          provider,
          connected: active,
          loading,
          chainId: chainId || 1,
          switchNetwork,
          getTxError,
          sendTx,
          sendBiconomyTx,
          signTxData,
          currentAccount: mockAddress || account?.toLowerCase() || '',
          addERC20Token,
          error,
          switchNetworkError,
          setSwitchNetworkError,
        },
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
