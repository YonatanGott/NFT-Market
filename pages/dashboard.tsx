import type { NextPage } from "next";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { marketplaceAddress } from "../config";

import NFTMarketplace from "../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json";

const Dashboard: NextPage = () => {
	const [nfts, setNfts] = useState<any[]>([]);
	const [loadingState, setLoadingState] = useState<boolean>(false);

	const loadNfts = async () => {
		const web3Modal = new Web3Modal({
			network: "mainnet",
			cacheProvider: true,
		});
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const signer = provider.getSigner();

		const contract = new ethers.Contract(
			marketplaceAddress,
			NFTMarketplace.abi,
			signer
		);
		const data = await contract.fetchItemsListed();

		const items = await Promise.all(
			data.map(async (i:any) => {
				const tokenUri = await contract.tokenURI(i.tokenId);
				const meta = await axios.get(tokenUri);
				let price = ethers.utils.formatUnits(i.price.toString(), "ether");
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.data.image,
				};
				return item;
			})
		);
		setNfts(items);
		setLoadingState(true);
	};

	useEffect(() => {
		loadNfts();
	}, []);

	if (!nfts.length && loadingState)
		return <h1 className="py-10 px-20 text-3xl">No NFTs listed</h1>;
	return (
		<div>
			<div className="p-4">
				<h2 className="text-2xl py-2">Items Listed</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
					{nfts.map((nft, i) => (
						<div key={i} className="border shadow rounded-xl overflow-hidden">
							<img src={nft.image} className="rounded" />
							<div className="p-4 bg-black">
								<p className="text-2xl font-bold text-white">
									Price - {nft.price} Eth
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
