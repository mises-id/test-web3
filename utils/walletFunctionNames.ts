const ethFunctionName = ['eth_accounts', 'eth_coinbase', 'net_version', 'eth_chainId', 'eth_sign', 'personal_sign', 'personal_ecRecover', 'eth_signTypedData_v3', 'eth_signTypedData_v4', 'eth_signTypedData', 'eth_sendTransaction', 'eth_requestAccounts', 'wallet_watchAsset', 'wallet_addEthereumChain', 'wallet_switchEthereumChain', 'eth_getBalance', 'eth_gasPrice', 'eth_blockNumber'] as const

const aptosFunctionName = ['getLedgerInfo', 'getChainId', 'connect', 'getAccount', 'getAccountResources', 'getAccountTransactions', 'getTransactions', 'getNetworks', 'getTransaction', 'changeNetwork', 'addNetwork', 'createToken', 'createCollection', 'createCollection', 'generateSignAndSubmitTransaction', 'signGenericTransaction', 'generateTransaction', 'signAndSubmitTransaction', 'signTransaction', 'submitTransaction', 'signMessage'] as const

const suiFunctionName = ['signAndExecuteTransactionBlock', 'verifySignedMessage', 'balance'] as const

const misesFunctionName = ['isUnlocked', 'enable', 'misesAccount', 'hasWalletAccount', 'openWallet', 'disconnect', 'userFollow', 'userUnFollow', 'setUserInfo', 'staking', 'signAmino', 'signArbitrary'] as const

const keplrFunctionName = ['getKey', 'getOfflineSigner', 'getAccounts', 'signAmino', 'signDirect', 'sendTx', 'signArbitrary', 'verifyArbitrary', 'signEthereum', 'experimentalSuggestChain'] as const

export type enumArr = typeof ethFunctionName | typeof aptosFunctionName | typeof suiFunctionName | typeof misesFunctionName | typeof keplrFunctionName
export interface request {
  method: enumArr[number],
  params: any[] | ((account: string) => any[]),
  type?: 'account'
}
export interface walletFunctionName {
  label: string,
  type: 'eth' | 'sui' | 'aptos' | 'mises' | 'keplr',
  list: request[]
}
export const walletFunctionNames: walletFunctionName[] = [{
  label: 'ETH',
  type: 'eth',
  list: [{
    method: 'wallet_addEthereumChain',
    params: [{
      "chainId": "0x13a",
      "chainName": "Filecoin - Mainnet",
      "rpcUrls": ["https://rpc.ankr.com/filecoin"],
      "nativeCurrency": {
        "name": "filecoin",
        "symbol": "FIL",
        "decimals": 18
      },
      "blockExplorerUrls": ["https://filfox.info/en"]
    }]
  }, {
    method: 'wallet_switchEthereumChain',
    params: [{
      chainId: '0x5'
    }]
  }, {
    method: 'eth_requestAccounts',
    params: []
  }, {
    method: 'eth_accounts',
    params: []
  }, {
    method: 'eth_signTypedData_v4',
    params: (account: string) => {
      const typedData = JSON.stringify({
        domain: {
          chainId: '0x5',
          name: "Example App",
          verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
          version: "1",
        },

        message: {
          prompt: "Welcome! In order to authenticate to this website, sign this request and your public address will be sent to the server in a verifiable way.",
          createdAt: `${Date.now()}`,
        },
        primaryType: 'AuthRequest',
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          AuthRequest: [
            { name: 'prompt', type: 'string' },
            { name: 'createdAt', type: 'uint256' },
          ],
        },
      });
      return [account, typedData]
    }
  }, {
    method: 'personal_sign',
    params: (account: string) => {
      const exampleMessage = 'Example `personal_sign` message.';
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
      const from = account;
      console.log([msg, from, 'Example password'])
      return [msg, from, 'Example password']
    }
  }, {
    method: 'eth_getBalance',
    params: (account: string) => [account, 'latest']
  }, {
    method: 'eth_gasPrice',
    params: []
  }, {
    method: 'eth_blockNumber',
    params: []
  }]
}, {
  label: 'Aptos',
  type: 'aptos',
  list: [{
    method: 'getLedgerInfo',
    params: []
  }, {
    method: 'getChainId',
    params: []
  }, {
    method: 'getAccount',
    params: (account: string) => [account],
    type: 'account'
  }, {
    method: 'getAccountResources',
    params: (account: string) => [account],
    type: 'account'
  }, {
    method: 'getAccountTransactions',
    params: (account: string) => [account],
    type: 'account'
  }, {
    method: 'getTransactions',
    type: 'account',
    params: (account: string) => [account],
  }, {
    method: 'changeNetwork',
    params: ["https://fullnode.mainnet.aptoslabs.com"]
  }, {
    method: 'addNetwork',
    params: ["https://fullnode.mainnet.aptoslabs.com", 'dummy']
  }, {
    method: 'connect',
    params: []
  }]
}, {
  label: 'Mises',
  type: 'mises',
  list: [{
    method: 'isUnlocked',
    params: []
  }, {
    method: 'enable',
    params: ['mainnet']
  }, {
    method: 'misesAccount',
    params: []
  }, {
    method: 'openWallet',
    params: []
  }, {
    method: 'hasWalletAccount',
    params: []
  }, {
    method: 'setUserInfo',
    params: [{
      avatarUrl: "https://cdn.mises.site/s3://mises-storage/upload/2022/12/01/1669910304739108.png?sign=jsajeFsfq3xNP5WoVppHw0FrQ_ZeeMaxl3KIHH7cO0k&version=2.0",
      emails: ['323111@qq.com'],
      gender: "other",
      homePageUrl: "",
      intro: "21323131\n",
      name: "Kikikiki",
      telephones: ['21335913'],
    }]
  }, {
    method: 'userFollow',
    params: ["did:mises:mises17242kxp235mxjf02a87l6q4yx2xjz7qgec2hxm"]
  }, {
    method: 'userUnFollow',
    params: ["did:mises:mises17242kxp235mxjf02a87l6q4yx2xjz7qgec2hxm"]
  }, {
    method: 'signAmino',
    params: ['mainnet', 'misesAccount', {"chain_id":"mainnet","account_number":"22","sequence":"1036","fee":{"gas":"260046","amount":[{"denom":"umis","amount":"27"}]},"msgs":[{"type":"cosmos-sdk/MsgUndelegate","value":{"delegator_address":"misesAccount","validator_address":"misesvaloper1jr7w3n9y2xnmsg22lxmjypgff055mawa497773","amount":{"denom":"umis","amount":"1115"}}}],"memo":""}]
  }, {
    method: 'staking',
    params: [{"msgs":[{"typeUrl":"/cosmos.staking.v1beta1.MsgUndelegate","value":{"amount":{"amount":"1115","denom":"umis"},"delegatorAddress":"misesAccount","validatorAddress":"misesvaloper1jr7w3n9y2xnmsg22lxmjypgff055mawa497773"}}],"gasLimit":260046,"gasFee":[{"amount":"27","denom":"umis"}]}]
  }, {
    method: 'signArbitrary',
    params: ['mainnet', 'misesAccount', 'sign content']
  }]
}, {
  label: 'Sui',
  type: 'sui',
  list: [{
    method: 'signAndExecuteTransactionBlock',
    params: []
  }, {
    method: 'verifySignedMessage',
    params: []
  }, {
    method: 'balance',
    params: []
  }]
}, {
  label: 'Keplr',
  type: 'keplr',
  list: [{
    method: 'getKey',
    params: ['cosmoshub-4']
  }, {
    method: 'enable',
    params: ['cosmoshub-4']
  }, {
    method: 'getOfflineSigner',
    params: []
  }, {
    method: 'signEthereum',
    params: []
  }, {
    method: 'experimentalSuggestChain',
    params: [{
      chainId: "mychain-1",
      chainName: "my new chain",
      rpc: "http://123.456.789.012:26657",
      rest: "http://123.456.789.012:1317",
      bip44: {
        coinType: 118,
      },
      bech32Config: {
        bech32PrefixAccAddr: "cosmos",
        bech32PrefixAccPub: "cosmos" + "pub",
        bech32PrefixValAddr: "cosmos" + "valoper",
        bech32PrefixValPub: "cosmos" + "valoperpub",
        bech32PrefixConsAddr: "cosmos" + "valcons",
        bech32PrefixConsPub: "cosmos" + "valconspub",
      },
      currencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
        },
      ],
      feeCurrencies: [
        {
          coinDenom: "ATOM",
          coinMinimalDenom: "uatom",
          coinDecimals: 6,
          coinGeckoId: "cosmos",
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.04,
          },
        },
      ],
      stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
      },
    }]
  }]
}]