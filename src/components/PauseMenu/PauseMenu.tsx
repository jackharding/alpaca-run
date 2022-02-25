import React, { useContext } from 'react';
import { GameContext } from '../../context/game.context';
import MenuButton from '../MenuButton';
import * as Styled from './PauseMenu.styled';

type PauseMenuProps = {
	onRestart: () => void;
};

const PauseMenu: React.FC<PauseMenuProps> = ({ onRestart }) => {
	const { onTogglePaused } = useContext(GameContext);

	return (
		<Styled.Wrapper>
			<Styled.Title>Paused</Styled.Title>

			<Styled.Nav>
				<MenuButton onClick={onTogglePaused}>Resume</MenuButton>
				<MenuButton onClick={onRestart}>Restart</MenuButton>
				<MenuButton>Exit</MenuButton>
			</Styled.Nav>
		</Styled.Wrapper>
	);
};

export default PauseMenu;
