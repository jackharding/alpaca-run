import styled from 'styled-components';

type WrapperProps = {
	isPaused: boolean;
};
export const Wrapper = styled.div<WrapperProps>`
	position: relative;
	width: 100%;
	height: 100vh;
	display: grid;
	grid-template-rows: 1fr 100px;
	animation-name: enter;
	/* TODO: Find programatic way to sync this with background */
	animation-duration: 1.25s;
	animation-timing-function: linear;
	animation-delay: 1s;
	animation-fill-mode: forwards;
	animation-play-state: ${({ isPaused }) => (isPaused ? 'paused' : 'running')};
	transform: translateX(100vw);

	@keyframes enter {
		from {
			transform: translateX(100vw);
		}
		to {
			transform: translateX(0);
		}
	}
`;
