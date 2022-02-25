import { hideVisually, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

type WrapperProps = {
	hideLabel?: boolean;
};

type NativeAttributes = Omit<React.HTMLProps<HTMLTextAreaElement>, 'onChange'>;

type TextAreaProps = WrapperProps &
	NativeAttributes & {
		label: string;
		value: string;
		onChange: (value: string) => void;
	};

const TextArea: React.FC<TextAreaProps> = ({
	label,
	value,
	hideLabel,
	onChange,
	...rest
}) => {
	const id = rest.id || 'textarea';

	return (
		<Wrapper hideLabel={hideLabel}>
			<label htmlFor={id}>{label}</label>
			<textarea
				{...rest}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				id={id}
			/>
		</Wrapper>
	);
};

const Wrapper = styled.div<WrapperProps>`
	display: flex;

	label {
		${({ hideLabel }) => hideLabel && hideVisually}
	}

	textarea {
		flex: 1;
		height: 140px;
		padding: ${rem(12)};
		border: 1px solid black;
		background: none;

		&[disabled] {
			opacity: 0.5;
		}
	}
`;

export default TextArea;
