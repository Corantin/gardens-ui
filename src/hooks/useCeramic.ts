import { DID } from 'dids'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'
import Ceramic from '@ceramicnetwork/http-client'
import { ThreeIdConnect, EthereumAuthProvider } from '@3id/connect'
import { IDX } from '@ceramicstudio/idx'
import { getEthersNetwork } from '@/networks'
import { providers } from 'ethers'
import { useWallet } from 'use-wallet'

export const threeID = new ThreeIdConnect()

const endpoint = 'https://ceramic-clay.3boxlabs.com'

export const connectCeramic = () => {
  const ceramic = new Ceramic(endpoint)
  const idx = new IDX({ ceramic })

  return {
    ceramic,
    idx,
  }
}

const useIdx = () => {
  const { idx } = connectCeramic()

  const read = async (account: string) => {
    return await idx.get('basicProfile', `${account}@eip155:1`)
  }

  const write = async (newData: any) => {
    return await idx.set('basicProfile', newData)
  }

  return {
    read,
    write,
  }
}

const useCeramic = () => {
  const { account, ethereum, chainId } = useWallet()
  const { read, write } = useIdx()

  const connectProfile = async () => {
    console.log(`connectProfile`)

    if (!account) return console.log(`No account!`)

    try {
      const data = await read(account)

      return data
    } catch (error) {
      createProfile()
    }

    return null
  }

  const createProfile = async () => {
    console.log(`createProfile`)

    if (!account) return console.log(`No account!`)

    const { ceramic } = connectCeramic()

    const provider = new providers.Web3Provider(
      ethereum,
      getEthersNetwork(chainId)
    )

    const threeIdConnect = new ThreeIdConnect(endpoint)
    await threeIdConnect.connect(new EthereumAuthProvider(provider, account))

    const did = new DID({
      provider: threeIdConnect.getDidProvider(),
      resolver: {
        ...ThreeIdResolver.getResolver(ceramic),
      },
    })

    console.log(`did`, did)

    await ceramic.setDID(did)
    await ceramic?.did?.authenticate()

    await write({
      name: account,
    })
  }

  return {
    connectProfile,
    createProfile,
  }
}

export default useCeramic
