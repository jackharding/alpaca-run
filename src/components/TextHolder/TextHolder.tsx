import { rem } from 'polished';
import styled from 'styled-components';

type TextHolderProps = {
	charOffset: number;
	isInvalid: boolean;
	isRtl?: boolean;
	isFinished: boolean;
};

const TextHolder = styled.div<TextHolderProps>`
	position: relative;
	display: flex;
	align-items: center;
	align-self: center;
	width: 100%;
	height: 100%;
	font-size: ${rem(42)};
	letter-spacing: 0.25ch;
	transition: opacity 0.8s;
	opacity: ${({ isFinished }) => (isFinished ? 0 : 1)};

	p {
		position: absolute;
		${({ isRtl }) => `${isRtl ? 'right' : 'left'}`}: 10px;
		transform: ${({ charOffset = 0, isRtl }) =>
			`translateX(${isRtl ? charOffset : `-${charOffset + 0.25}`}ch)`};
		white-space: nowrap;
		font-family: monospace;
	}

	&:before {
		position: absolute;
		${({ isRtl }) => `${isRtl ? 'right' : 'left'}: 7px`};
		top: 50%;
		transform: translateY(-50%);
		content: '';
		width: 1.1ch;
		height: 1.5ch;
		border: 2px solid ${({ isInvalid }) => (isInvalid ? 'red' : 'green')};
	}
`;

export default TextHolder;
