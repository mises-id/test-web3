const ethFunctionName = ['eth_accounts', 'eth_coinbase', 'net_version', 'eth_chainId', 'eth_sign', 'personal_sign', 'personal_ecRecover', 'eth_signTypedData_v3', 'eth_signTypedData_v4', 'eth_signTypedData', 'eth_sendTransaction', 'eth_requestAccounts', 'wallet_watchAsset', 'wallet_addEthereumChain', 'wallet_switchEthereumChain', 'eth_getBalance', 'eth_gasPrice', 'eth_blockNumber'] as const

const aptosFunctionName = ['getLedgerInfo', 'getChainId', 'connect', 'getAccount', 'getAccountResources', 'getAccountTransactions', 'getTransactions', 'getNetworks', 'getTransaction', 'changeNetwork', 'addNetwork', 'createToken', 'createCollection', 'createCollection', 'generateSignAndSubmitTransaction', 'signGenericTransaction', 'generateTransaction', 'signAndSubmitTransaction', 'signTransaction', 'submitTransaction', 'signMessage'] as const

const suiFunctionName = ['getAccounts', 'signAndExecuteTransactionBlock'] as const

export type ethEnum = typeof ethFunctionName
export type aptosEnum = typeof aptosFunctionName
export type suisEnum = typeof suiFunctionName
export interface request {
  method: ethEnum[number] | aptosEnum[number] | suisEnum[number],
  params: any[] | ((account: string)=>any[]),
  type?: 'account'
}
export interface walletFunctionName {
  label: string,
  type: 'eth' | 'sui' | 'aptos',
  list: request[]
}
export const walletFunctionNames: walletFunctionName[] = [{
  label: 'ETH Wallet',
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
    params: (account: string)=>{
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
    params: (account: string) => {
      return [account]
    },
    type: 'account'
  }, {
    method: 'getAccountResources',
    params: (account: string) => {
      return [account]
    },
    type: 'account'
  }, {
    method: 'getAccountTransactions',
    params: (account: string) => {
      return [account]
    },
    type: 'account'
  }, {
    method: 'getTransactions',
    type: 'account',
    params: (account: string) => {
      return [account]
    }
  }, {
    method: 'changeNetwork',
    params: ["https://fullnode.mainnet.aptoslabs.com"]
  }, {
    method: 'addNetwork',
    params: ["https://fullnode.mainnet.aptoslabs.com", 'dummy']
  }]
}]