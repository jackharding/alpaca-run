import { rem } from 'polished';
import styled from 'styled-components';

export const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
	width: 100%;
	max-width: 500px;
	padding-block: ${rem(45)};
	padding-inline: ${({ theme }) => theme.spacing.gutter};
	background: ${({ theme }) => theme.colors.overlay};
`;

export const Title = styled.h1`
	margin-bottom: 1.25rem;
	font-size: ${rem(62)};
	font-weight: 400;
`;

export const TitleButton = styled.button`
	width: min-content;
	border-bottom: ${rem(5)} solid transparent;
	font-size: ${rem(36)};
	transition: 0.3s border-color;

	&:not(:last-child) {
		margin-bottom: ${rem(12)};
	}

	&:hover {
		border-color: ${({ theme }) => theme.colors.primary};
	}
`;

export const Menu = styled.nav`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const CONTROL_SIZE = rem(64);

export const Wrapper = styled.div`
	display: grid;
	place-items: center;
	grid-template-columns: ${CONTROL_SIZE} 1fr ${CONTROL_SIZE};
	gap: ${({ theme }) => theme.spacing.gutter};
	width: 100%;
	min-height: 100vh;
	padding-block: ${({ theme }) => theme.spacing.topSpacing};
	padding-inline: ${({ theme }) => theme.spacing.gutter};
	/* background: #bada55; */
`;
