import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function UseFormInput({ defaultValue, type, placeholder, id, select_options }) {
	const [value, setValue] = useState(defaultValue || '');
	
	let input = (
		<Form.Control
			value={value || ''}
			placeholder={placeholder}
			onChange={(e) => setValue(e.target.value)}
			type={type}
			id={id}
		/>
	);
	if(type=="select")
		 input = (
			<Form.Control
				as="select"
				value={value}
				onChange={e => {
					console.log("e.target.value", e.target.value);
					setValue(e.target.value);
				}}
				>
				{
					select_options.map((option)=>(
						<option value={option.value}>{option.text}</option>
					))
				}
			</Form.Control>
		)
	
	return [value, input, setValue];
}
