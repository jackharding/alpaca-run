import { assign, createMachine } from 'xstate';

export enum ROUTES {
	TITLE = 'TITLE',
	SETTINGS = 'SETTINGS',
	GAME = 'GAME',
}

type NavigateEvents = { type: `NAVIGATE_${ROUTES}` };

type RoutingEvent = NavigateEvents;

export type RoutingContext = {
	route: ROUTES;
	settings: {
		useCustomText: boolean;
		customText: string;
	};
};

const routingMachine = createMachine<RoutingContext, RoutingEvent>({
	initial: ROUTES.TITLE,
	on: {
		NAVIGATE_TITLE: ROUTES.TITLE,
		NAVIGATE_GAME: ROUTES.GAME,
	},
	states: {
		[ROUTES.TITLE]: {
			initial: ROUTES.TITLE,
			states: {
				[ROUTES.TITLE]: {
					on: {
						NAVIGATE_SETTINGS: {
							target: ROUTES.SETTINGS,
							actions: () => console.log('YEEE'),
						},
					},
				},
				[ROUTES.SETTINGS]: {},
			},
		},
		[ROUTES.GAME]: {},
	},
});

export default routingMachine;
