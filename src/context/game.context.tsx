import { useActor } from '@xstate/react';
import React, { useContext } from 'react';
import { ActorRefFrom } from 'xstate';
import gameMachine, {
	GameContext as GameMachineContext,
} from '../machines/game.machine';

type GameData =
	| (GameMachineContext['settings'] & {
			isPaused: boolean;
			onTogglePaused: () => void;
			onToggleCustomText: () => void;
			onUpdateCustomText: (text: string) => void;
	  })
	| undefined;

export const GameContext = React.createContext<GameData>(undefined);

type GameProviderProps = {
	gameService: ActorRefFrom<typeof gameMachine>;
};

const GameProvider: React.FC<GameProviderProps> = ({
	children,
	gameService,
}) => {
	const [gameState, gameSend] = useActor(gameService);

	const {
		context: { settings, isPaused },
	} = gameState;

	const onToggleCustomText = () => gameSend({ type: 'TOGGLE_CUSTOM_TEXT' });
	const onUpdateCustomText = (text: string) =>
		gameSend({ type: 'UPDATE_CUSTOM_TEXT', text });

	const onTogglePaused = () => gameSend({ type: 'TOGGLE_PAUSED' });

	return (
		<GameContext.Provider
			value={{
				isPaused,
				onTogglePaused,
				onToggleCustomText,
				onUpdateCustomText,
				...settings,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export const useGameContext = () => {
	const context = useContext(GameContext);
	if (!context) {
		throw new Error('No GameContext.Provider found when calling useContext.');
	}

	return context;
};

export default GameProvider;
