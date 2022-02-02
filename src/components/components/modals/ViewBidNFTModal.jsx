
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { bidsgetbytokenid } from '@/pages/Events/token'

export default function ViewmodalShow({
	show,
	onHide,
	id,
	title
}) {
	const [list, setList] = useState([]);

	function addZero(num) {
		return num < 10 ? `0${num}` : num;
	}
	function AmPM(num) {
		return num < 12 ? 'AM' : 'PM';
	}
	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});


	async function fetchContractData() {
		try {
			if (id) {

				const arr = [];

				const totalBids = await bidsgetbytokenid(id);
				for (let i = 0; i < totalBids.length; i++) {
					const object = await totalBids[i];
					const Datetime = new Date(object.Date);

					let currentdate = `${addZero(Datetime.getDate())}/${addZero(Datetime.getMonth() + 1)}/${addZero(Datetime.getFullYear())} ${addZero(Datetime.getHours())}:${addZero(Datetime.getMinutes())}:${addZero(Datetime.getSeconds())} ${AmPM(Datetime.getHours())}`

					if (object.UserName) {
						arr.push({
							Date: currentdate,
							UserName: object.UserName,
							bidpriceusd: formatter.format(object.Bidprice * 0.371936),
							Bidprice: object.Bidprice
						});

					}
				}

				console.log(arr);
				setList(arr);
				if (document.getElementById("LoadingView"))
					document.getElementById("LoadingView").style = "display:none";
				if (document.getElementById("Loadingtable")) {
					var element = document.getElementById("Loadingtable");
					element.style = "display:block";
					(element).setAttribute("id", "");
				}

			}
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchContractData();

	}, []);

	return (
		<Modal
			show={show}
			onHide={onHide}
			onShow={fetchContractData}
			aria-labelledby="contained-modal-title-vcenter"
			size="xl"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					View Bid - {title}
				</Modal.Title>

			</Modal.Header>
			<Modal.Body className="show-grid">
				<div id='LoadingView' className="LoadingArea">
					<h1>Loading...</h1>
				</div>
				<div id='Loadingtable' style={{ display: 'none' }} className="">
					<div className='tableHeader'>
						<div className='tableHeaderContainer'>
							<div className='tableheaderDateContainer' >
								<h4 className="header">Date</h4>
							</div>
							<div className="tableheaderUserContainer" >
								<h4 className="header">User Name</h4>
							</div>
							<div className="tableheaderBidContainer" >
								<h4 className="header">Bid</h4>
							</div>
						</div>

					</div> {list.map((listItem) => (
						<div key={listItem.Id} className='tableFullRowContainer'>
							<div className='tableRowContainer'>
								<div className='tableRowCellContainer'>
									<div className='tableRowCellDateContainer'>
										<h5 className="cell">{listItem.Date}</h5>
									</div>
									<div className='tableRowCellUserContainer'>
										<h5 className="cell">{listItem.UserName}</h5>
									</div>
									<div className="tableRowCellBidContainer">
										<h5 className="cell">${listItem.bidpriceusd} ({listItem.Bidprice} EVER)</h5>
									</div>
								</div>
							</div>
						</div>))}
				</div>


			</Modal.Body>
		</Modal>
	);
}
