import { useActor } from '@xstate/react';
import { rem } from 'polished';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ActorRefFrom, StateValue } from 'xstate';
import { ROUTES } from '../../machines/routing.machine';
import { RouteProps } from '../../types';
import Settings from './components/Settings/Settings';
import PageLayout, { GRID_AREAS } from './layouts/PageLayout';
import * as Styled from './TitleScreen.styled';

type TitleScreenProps = RouteProps & {};

const TitleScreen: React.FC<TitleScreenProps> = ({
	gameService,
	routingService,
}) => {
	const [gameState, gameSend] = useActor(gameService);
	const [routingState, routingSend] = useActor(routingService);

	const {
		context: { route },
	} = gameState;

	// TODO: cleverer way of doing this
	const isSettings = routingState.matches({ [ROUTES.TITLE]: ROUTES.SETTINGS });

	const isActiveRoute = routingState.matches(ROUTES.TITLE);

	const goToGame = () => routingSend({ type: 'NAVIGATE_GAME' });
	const goToSettings = () => routingSend({ type: 'NAVIGATE_SETTINGS' });
	const goToTitle = () => routingSend({ type: 'NAVIGATE_TITLE' });

	return (
		<PageLayout state={isActiveRoute ? 'active' : 'inactive'}>
			<div />
			{isSettings ? (
				<Settings onBack={goToTitle} />
			) : (
				<Styled.Main>
					<Styled.Title>Alpaca Run</Styled.Title>
					<Styled.Menu>
						<Styled.TitleButton onClick={goToGame}>Play</Styled.TitleButton>
						<Styled.TitleButton onClick={goToSettings}>
							Settings
						</Styled.TitleButton>
					</Styled.Menu>
				</Styled.Main>
			)}
		</PageLayout>
	);
};

export default TitleScreen;
