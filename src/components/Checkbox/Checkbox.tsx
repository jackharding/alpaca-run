import { hideVisually, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

type CheckboxProps = {
	label: string;
	onChange: (checked: boolean) => void;
	checked: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, label, onChange }) => (
	<Label>
		<input
			type="checkbox"
			checked={checked}
			onChange={() => onChange(!checked)}
		/>

		<span>
			<span>{label}</span>
		</span>
	</Label>
);

const BOX_SIZE = rem(24);

const Label = styled.label`
	font-size: ${rem(18)};
	> span {
		display: flex;
		flex-direction: row;

		&:before {
			content: '';
			width: ${BOX_SIZE};
			height: ${BOX_SIZE};
			margin-right: ${rem(12)};
			border: 1px solid black;
		}

		> span {
			flex: 1;
		}
	}

	input {
		${hideVisually}

		&:checked +span:before {
			background: black;
		}
	}
`;

export default Checkbox;
