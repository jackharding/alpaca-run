import React from 'react';
import styled from 'styled-components';

const TitleScreen: React.FC = () => {
	const handlePlayClick = () => {}
	const handleSettingsClick = () => {}

	return (
		<Container>
			<h1>Alpaca Run</h1>
			<TitleButton onClick={handlePlayClick}>Play</TitleButton>
			<TitleButton onClick={handleSettingsClick}>Settings</TitleButton>
		</Container>
	);
};

const TitleButton = styled.button``;

const Container = styled.div`
	display: grid;
	place-content: center;
	min-height: 100vh;
	background: #bada55;
`;

export default TitleScreen;
