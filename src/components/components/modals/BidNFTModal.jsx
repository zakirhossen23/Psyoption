import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';
import { useCreateTokenForm } from '@/modules/Builder/hooks/useCreateTokenForm'
import { useCreateTokenStore } from '@/modules/Builder/stores/CreateTokenStore'
import { useWallet } from '@/stores/WalletService'
import { createBid,ReduceCategory } from '@/pages/Events/token'
import { Icon } from '@/components/common/Icon'
import { getCategoriesbyeventid,eventgetbyid} from '../../../pages/Events/event'

import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxResult,
	TxUnspecifiedError,
	useConnectedWallet,
	UserDenied,
	useWallet as useWalletTerra,
	WalletStatus as TerraWalletStatus 
  } from '@terra-money/wallet-provider';
  
  import { Fee, MsgSend } from '@terra-money/terra.js';
  
export default function BidNFTModal({
	show,
	onHide,
	ToAddress,
	tokenId,
	type,
	Highestbid,
	walletType,
	eventId,
}) {
	const [Alert, setAlert] = useState('');
	const [Amount, AmountInput] = UseFormInput({
		type: 'text',
		placeholder: 'Amount',
	});
	const wallet = useWallet()
	console.log(ToAddress);
	console.log(categories);
	const creatingTokenForm = useCreateTokenForm()

	//Terra Wallet
	const { connect, status ,availableConnections} = useWalletTerra()
	const connectedWallet = useConnectedWallet();
	const [txError, setTxError] = React.useState("");
	const [otherCategory,setOtherCategory] = useState(-1);

	function activateWarningModal() {
		var alertELM = document.getElementById("alert");
		alertELM.style = 'contents';
		setAlert(`Amount cannot be under ${Highestbid} ${walletType}`)
	}

	useEffect(async () => {
		const boolTrue = true;
		while (boolTrue) {
			try {
				const categories = await getCategoriesbyeventid(eventId);
				console.log("categories for event:");
				console.log(categories);
				let event = await eventgetbyid(eventId);
				var goal = event.Goal;
				console.log("goal:");
				console.log(goal);
				var sumofmain = 0;
				var categories_ = categories;
				for(var i=0;i<categories_.length;i++){
					sumofmain += categories_[i].price*categories_[i].amount;
				}
				
				setOtherCategory(goal-sumofmain);
				setCategories(categories_);
				break;
			}catch(error){
				continue;
			}
			
		}
		
    }, [categories]);
	async function bidNFT() {
		if (Number(Amount) < Number(Highestbid)) {
			activateWarningModal();
			return;
		}
		const creatingToken = useCreateTokenStore()
		creatingToken.changeData('decimals', Number(Amount) * 1000000000);
		creatingToken.changeData('ToAddress', ToAddress);
		var buttonProps = document.getElementsByClassName("btn btn-primary")[0];
		console.log(creatingToken.decimals);
		if (!wallet.account) {
			buttonProps.innerText = "Connect to wallet"
			await wallet.connect();
		}
		if (creatingToken.decimals != null) {

			await creatingToken.createToken();
		}
		
		await createBid(tokenId, wallet.account.address, Amount);
		for(var i=0;i<selectedCategory.length;i++){
			await ReduceCategory(selectedCategory[i]);
		}
		console.log(`given ${Amount} highest => ${Highestbid}`)

		window.location.reload();
		window.document.getElementsByClassName("btn-close")[0].click();
	}
	
	async function  bidNFTByTerra(){
		console.log(Number(Amount))
		console.log(Number(Highestbid))
		if (Number(Amount) < Number(Highestbid)) {
			activateWarningModal();
			return;
		}
		var buttonProps = document.getElementsByClassName("btn btn-primary")[0];
		if (!connectedWallet) {
			buttonProps.innerText = "Connect to wallet"
			await connect("EXTENSION");
			return;
		}
		
		console.log(connectedWallet.walletAddress);
	
		console.log(ToAddress);
		if(selectedTerra=="ust"){
			connectedWallet
			.post({
				fee: new Fee(1000000, '200000uusd'),
				msgs: [
					new MsgSend(connectedWallet.walletAddress, ToAddress, {
						uusd: 1000000 * Amount,
					}),
				],
			})
			.then(() => {
				console.log("test1");
				console.log(`given ${Amount} highest => ${Highestbid}`)
			}).then(async ()=>{
				await createBid(tokenId, connectedWallet.walletAddress.toString(), Amount);
			}).then(()=>{
				window.location.reload();
				window.document.getElementsByClassName("btn-close")[0].click();
			})
			.catch((error) => {
				console.log("error:");
				console.log(error);
				if (error instanceof UserDenied) {
				setTxError('User Denied');
				} else if (error instanceof CreateTxFailed) {
				setTxError('Create Tx Failed: ' + error.message);
				} else if (error instanceof TxFailed) {
				setTxError('Tx Failed: ' + error.message);
				} else if (error instanceof Timeout) {
				setTxError('Timeout');
				} else if (error instanceof TxUnspecifiedError) {
				setTxError('Unspecified Error: ' + error.message);
				} else {
				setTxError(
					'Unknown Error: ' +
					(error instanceof Error ? error.message : String(error)),
				);
				}
			});
		}else if(selectedTerra=="luna"){
			//Terra and Ever currency
            try { 
                var luna_currency = 0;
                var lunaCurrencyUrl = "https://api.coinmarketcap.com/data-api/v3/cryptocurrency/market-pairs/latest?slug=terra-luna&start=1&limit=1&category=spot&sort=cmc_rank_advanced";
                const currency_options = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json, text/plain, */*'
                    },
                };
                await fetch(lunaCurrencyUrl, currency_options).then(res => res.json())
                .then(json => luna_currency = json)
                .catch(err => console.error('error:' + err));
                luna_currency = luna_currency.data.marketPairs[0].price;
            } catch (ex) {
                var luna_currency = 0;
                var everPrice = 0;
             }
			const lunaprice =   (Amount / luna_currency).toFixed(6);
			console.log("lunaprice");
			console.log(lunaprice);
			connectedWallet
			.post({
				fee: new Fee(1000000, '200000uusd'),
				msgs: [
					new MsgSend(connectedWallet.walletAddress, ToAddress, {
						uluna: 1000000 * lunaprice,
					}),
				],
			})
			.then(() => {
				console.log("test1");
				

				console.log(`given ${Amount} highest => ${Highestbid}`)

				
			}).then(async ()=>{
				await createBid(tokenId, connectedWallet.walletAddress, Amount);
				

			}).then(()=>{
				window.location.reload();
				window.document.getElementsByClassName("btn-close")[0].click();
			})
			.catch((error) => {
				console.log("error:");
				console.log(error);
				if (error instanceof UserDenied) {
				setTxError('User Denied');
				} else if (error instanceof CreateTxFailed) {
				setTxError('Create Tx Failed: ' + error.message);
				} else if (error instanceof TxFailed) {
				setTxError('Tx Failed: ' + error.message);
				} else if (error instanceof Timeout) {
				setTxError('Timeout');
				} else if (error instanceof TxUnspecifiedError) {
				setTxError('Unspecified Error: ' + error.message);
				} else {
				setTxError(
					'Unknown Error: ' +
					(error instanceof Error ? error.message : String(error)),
				);
				}
			});
		}
		
	}
	const [categories, setCategories] = useState([]);
	const [selectCoinTypeModal, setSelectCoinTypeModal] = useState(false);
	const [selectedTerra, setSelectedTerra] = useState("UST/LUNA");


	const confirmBidNFTByTerra = () => {
		setSelectCoinTypeModal(false);
		bidNFTByTerra();
	}

	const [allSelected, setAllSelected] = useState(false);
	const [otherSelected, setOtherSelected] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState([]);

	const selectCategory = (category_id) =>{
		console.log("category_id");
		console.log(category_id);
		var temp_arr = [];
		for(var i=0; i<selectedCategory.length;i++){
			temp_arr.push(selectedCategory[i]);
		}
		temp_arr.push(category_id);
		console.log(temp_arr);

		setSelectedCategory(temp_arr);
	}
	const unselectCategory = (category_id) =>{
		var temp_arr = [];
		for(var i=0; i<selectedCategory.length;i++){
			if(selectedCategory[i]!=category_id)
				temp_arr.push(selectedCategory[i]);
		}
		console.log(temp_arr);
		setSelectedCategory(temp_arr);
	}

	const selectAllCategory = () =>{
		if(allSelected){	
			setAllSelected(false);
			setSelectedCategory([]);
		}else{

			setAllSelected(true);
			var temp_arr = [];
			for(var i=0;i<categories.length;i++){
				temp_arr.push(categories[i].id)
			}
			temp_arr.push(-1);
			setSelectedCategory(temp_arr);
		}
			
	}
	const otherSelect=()=>{
		if(otherSelected){
			setOtherSelected(false);
			var temp_arr = [];
			for(var i=0;i<selectedCategory.length;i++){
				if(selectedCategory[i] != -1)
					temp_arr.push(selectedCategory[i])
			}
			setSelectedCategory(temp_arr);
		}else{
			setOtherSelected(true);
			var temp_arr = [];
			for(var i=0;i<selectedCategory.length;i++){
				temp_arr.push(selectedCategory[i])
			}
			temp_arr.push(-1);
			setSelectedCategory(temp_arr);
		}	
	}
	return (
		<>
		<Modal
			show={show}
			onHide={()=>{setSelectedTerra("UST/LUNA"); onHide();}}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				{(type == "Cryptopunk") ? (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid Cryptopunk
					</Modal.Title>) : (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid NFT
					</Modal.Title>
				)}
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<div id='alert' style={{ display: 'none' }} className="alert alert-danger" role="alert">
						{Alert}
					</div>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Bid Amount in {(walletType=="UST")?((selectedTerra=="UST/LUNA")?"UST/LUNA":(selectedTerra=="ust")? "UST":"LUNA"):walletType}</Form.Label>
						{AmountInput}
					</Form.Group>
					<div className='selectCategoryAll'>
						<h4 style={{marginBottom:"10px"}}>Choose where you want to give support</h4>
						<div style={{width:"100%",padding:"5px",display:"flex", justifyContent:"center", alignItems:"center",position:"relative",background:"bisque", height:"40px",borderRadius:"5px",marginBottom:"10px"}} onClick={()=>{
									
									selectAllCategory();
								}}>
							<h4 style={{alignSelf:"center",color:"black"}}>Support in general </h4>
							{allSelected?
								<div style={{position:"absolute",right:"10px",top:"-7px"}} >
									<div style={{
										marginTop:"10px",
										display:"flex",
										width:"32px",
										height:"32px",
										justifyContent:"center",
										flexDirection:"column",
										alignItems:"center",
										borderRadius:"16px",
										background:"#EEF1F4"
									}}><Icon icon="heartSelected" /></div>
								</div>:
								<div style={{position:"absolute",right:"10px",top:"-7px"}} >
									<div style={{
										marginTop:"10px",
										display:"flex",
										width:"32px",
										height:"32px",
										justifyContent:"center",
										flexDirection:"column",
										alignItems:"center",
										borderRadius:"16px",
										background:"#EEF1F4"
									}}><Icon icon="heartUnselected" /></div>
								</div>}
						</div>
					</div>
					<div className='selectCategory' style={{marginLeft:"-10px", marginRight:"-10px", display:"flex", flexDirection:"row",flexWrap:"wrap"}}>
						{
							categories.map((category)=>(
								(selectedCategory.indexOf(category.id) !== -1)?
								(<div style={{width:"33%",padding:"0 10px", marginBottom:"10px"}} key={category.id} onClick={()=>unselectCategory(category.id)}>
									<div style={{background:"white", padding: "8px 15px",border:"1px solid transparent", borderRadius:"5px",alignItems:"center",}}>
										<h4 style={{marginBottom:"10px", color:"#151F28", textAlign:"center"}}>{category.title}</h4>
										<img src={category.image} style={{width:"100%", borderRadius:"5px", height:"94px"}}/>
										<h5 style={{ color:"#151F28",textAlign:"center",marginTop:"10px", lineHeight:"14px"}}>{category.amount * category.price} USD</h5>
										<h5 style={{ color:"#151F28",textAlign:"center",lineHeight:"14px"}}>({category.amount} pieces)</h5>
										
											
											
												<div style={{display:"flex", justifyContent:"flex-end"}}  >
													<div style={{
														marginTop:"10px",
														display:"flex",
														width:"32px",
														height:"32px",
														justifyContent:"center",
														flexDirection:"column",
														alignItems:"center",
														borderRadius:"16px",
														background:"#EEF1F4"
														
													}}><Icon icon="heartSelected" /></div>
												</div>
												
											
											
											
										
										
									</div>
								</div>)
								:
								(<div style={{width:"33%",padding:"0 10px", marginBottom:"10px"}} key={category.id} onClick={()=>selectCategory(category.id)}>
									<div style={{background:"white", padding: "8px 15px",border:"1px solid transparent", borderRadius:"5px",alignItems:"center",}}>
										<h4 style={{marginBottom:"10px", color:"#151F28", textAlign:"center"}}>{category.title}</h4>
										<img src={category.image} style={{width:"100%", borderRadius:"5px", height:"94px"}}/>
										<h5 style={{ color:"#151F28",textAlign:"center",marginTop:"10px", lineHeight:"14px"}}>{category.amount * category.price} USD</h5>
										<h5 style={{ color:"#151F28",textAlign:"center",lineHeight:"14px"}}>({category.amount} pieces)</h5>
										
											
												<div style={{display:"flex", justifyContent:"flex-end"}} >
													<div style={{
														marginTop:"10px",
														display:"flex",
														width:"32px",
														height:"32px",
														justifyContent:"center",
														flexDirection:"column",
														alignItems:"center",
														borderRadius:"16px",
														background:"#EEF1F4"
													}}><Icon icon="heartUnselected" /></div>
												</div>
											
										
										
									</div>
								</div>)

							))
						}
						<div style={{width:"33%",padding:"0 10px",display:"flex",flexDirection:"column"}} onClick={()=>otherSelect()}>
							{
								(categories.length>0)?
								(<div style={{background:"white", padding: "10px",border:"1px solid transparent", borderRadius:"5px",alignItems:"center", marginBottom:"15px"}}>
									<h4 style={{marginBottom:"10px", color:"#151F28", textAlign:"center"}}>Other support</h4>
									<h5 style={{ color:"#151F28",textAlign:"center",marginTop:"10px", lineHeight:"14px"}}>{
										otherCategory
									} USD</h5>
									{
									(selectedCategory.indexOf(-1)!==-1)?(
									<div style={{display:"flex", justifyContent:"flex-end"}} >
										<div style={{
											marginTop:"10px",
											display:"flex",
											width:"32px",
											height:"32px",
											justifyContent:"center",
											flexDirection:"column",
											alignItems:"center",
											borderRadius:"16px",
											background:"#EEF1F4"
											
										}}><Icon icon="heartSelected" /></div>
									</div>):(
									<div style={{display:"flex", justifyContent:"flex-end"}} >
										<div style={{
											marginTop:"10px",
											display:"flex",
											width:"32px",
											height:"32px",
											justifyContent:"center",
											flexDirection:"column",
											alignItems:"center",
											borderRadius:"16px",
											background:"#EEF1F4"
											
										}}><Icon icon="heartUnselected" /></div>
									</div>
									)
								}
								</div>):null
							}
							
						</div>
					</div>
					<div className="d-grid">

						{(type == "Cryptopunk") ? (
							(walletType=="EVER")? (
								<Button variant="primary" onClick={bidNFT}>
									Bid Cryptopunk
								</Button>
								):
								(<Button variant="primary" onClick={()=>{
									if(selectedTerra=="UST/LUNA")
										setSelectCoinTypeModal(true);
									else
										bidNFTByTerra();
									}}>
								Bid Cryptopunk
								</Button>) )
								: ( 
								(walletType=="EVER")? (
									<Button variant="primary" onClick={bidNFT}>
										Bid NFT
									</Button>
								):
								(
									<Button variant="primary" onClick={()=>{
										if(selectedTerra=="UST/LUNA")
											setSelectCoinTypeModal(true);
										else
											bidNFTByTerra();
										}}>
									Bid NFT
									</Button>
								)
						)}
					</div>
				</Form>
			</Modal.Body>

		</Modal>
		<Modal show={selectCoinTypeModal}
			onHide={()=>setSelectCoinTypeModal(false)}
			size='md'
			centered style={{padding:"20px"}}>
			<Modal.Header closeButton>
				Select coin you want to bid with.
			</Modal.Header>
			<div style={{margin:"20px", display:"flex", justifyContent:"space-around"}}>
				<div onClick={()=>{setSelectedTerra("ust");  confirmBidNFTByTerra();}}>
					<img src='https://s2.coinmarketcap.com/static/img/coins/200x200/7129.png' style={{width:"150px", height:"150px"}}/>
				</div>
				<div onClick={()=>{setSelectedTerra("luna");  confirmBidNFTByTerra();}}>
				
					<img src='https://assets.coingecko.com/coins/images/8284/large/luna1557227471663.png?1567147072' style={{width:"150px", height:"150px"}}/>
				</div>
			</div>					
		</Modal>
		</>
	);
}
