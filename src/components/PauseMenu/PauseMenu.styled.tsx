import { rem } from 'polished';
import styled from 'styled-components';

export const Wrapper = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const Title = styled.h1`
	margin-bottom: ${rem(22)};
`;

export const Nav = styled.nav`
	display: flex;
	flex-direction: column;
`;
