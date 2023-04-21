const ethFunctionName = ['eth_accounts', 'eth_coinbase', 'net_version', 'eth_chainId', 'eth_sign', 'personal_sign', 'personal_ecRecover', 'eth_signTypedData_v3', 'eth_signTypedData_v4', 'eth_signTypedData', 'eth_sendTransaction', 'eth_requestAccounts', 'wallet_watchAsset', 'wallet_addEthereumChain', 'wallet_switchEthereumChain', 'eth_getBalance', 'eth_gasPrice', 'eth_blockNumber'] as const

const aptosFunctionName = ['getLedgerInfo', 'getChainId', 'connect', 'getAccount', 'getAccountResources', 'getAccountTransactions', 'getTransactions', 'getNetworks', 'getTransaction', 'changeNetwork', 'addNetwork', 'createToken', 'createCollection', 'createCollection', 'generateSignAndSubmitTransaction', 'signGenericTransaction', 'generateTransaction', 'signAndSubmitTransaction', 'signTransaction', 'submitTransaction', 'signMessage'] as const

const suiFunctionName = ['signAndExecuteTransactionBlock', 'verifySignedMessage', 'balance'] as const

const misesFunctionName = ['isUnlocked', 'enable', 'misesAccount', 'hasWalletAccount', 'openWallet', 'disconnect', 'userFollow', 'userUnFollow', 'setUserInfo', 'staking', 'signAmino'] as const

export type ethEnum = typeof ethFunctionName
export type aptosEnum = typeof aptosFunctionName
export type suiEnum = typeof suiFunctionName
export type misesEnum = typeof misesFunctionName
export interface request {
  method: ethEnum[number] | aptosEnum[number] | suiEnum[number] | misesEnum[number],
  params: any[] | ((account: string) => any[]),
  type?: 'account'
}
export interface walletFunctionName {
  label: string,
  type: 'eth' | 'sui' | 'aptos' | 'mises',
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
    params: []
  }, {
    method: 'staking',
    params: []
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
}]