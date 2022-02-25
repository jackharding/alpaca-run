import { useInterpret, useSelector, useMachine } from '@xstate/react';
import { ThemeProvider } from 'styled-components';
import Scene from './components/Scene/Scene';
import GameProvider from './context/game.context';
import gameMachine from './machines/game.machine';
import routingMachine, { ROUTES } from './machines/routing.machine';
import GameScreen from './screens/GameScreen/GameScreen';
import TitleScreen from './screens/TitleScreen/TitleScreen';
import { GlobalStyles } from './styles/global';
import { theme } from './styles/theme';

const App = () => {
	const routingService = useInterpret(routingMachine);
	const gameService = useInterpret(gameMachine);
	// const route = useSelector(gameService, (state) => state.context.route);

	const routeProps = {
		gameService,
		routingService,
		// activeRoute,
	};

	// const renderRoutes = () => {
	// 	switch (route) {
	// 		case ROUTES.PLAYING:
	// 			return <GameScreen {...routeProps} />;
	// 		default:
	// 			return <TitleScreen {...routeProps} />;
	// 	}
	// };

	return (
		<GameProvider gameService={gameService}>
			<ThemeProvider theme={theme}>
				<GlobalStyles />
				<Scene>
					<TitleScreen {...routeProps} />
					<GameScreen {...routeProps} />
				</Scene>
			</ThemeProvider>
		</GameProvider>
	);
};

export default App;
