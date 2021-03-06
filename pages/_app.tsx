import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps) {
  return <div>
    <nav className="border-b p-6">
        <p className="text-4xl font-bold">Meta Marketplace</p>
        <div className="flex mt-4">
          <Link href="/">
            <a className="mr-4 text-fuchsia-500">
              Home
            </a>
          </Link>
          <Link href="/create-nft">
            <a className="mr-6 text-fuchsia-500">
              Sell NFT
            </a>
          </Link>
          <Link href="/my-nfts">
            <a className="mr-6 text-fuchsia-500">
              My NFTs
            </a>
          </Link>
          <Link href="/dashboard">
            <a className="mr-6 text-fuchsia-500">
              Dashboard
            </a>
          </Link>
        </div>
      </nav>
    <Component {...pageProps} />
    </div>
}

export default MyApp
