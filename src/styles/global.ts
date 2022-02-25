import { rem } from 'polished';
import { createGlobalStyle } from 'styled-components';
import { reset } from './reset';

export const GlobalStyles = createGlobalStyle`
	${reset}

	html {
		font-size: 16px;
	}

	body {
		overflow-x: hidden;
		font-family: 'Caveat Brush', cursive;
		font-size: ${rem(18)};
	}

	p {
		margin: 0;
	}

	button {
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	iframe {
		pointer-events: none;
	}
`;
