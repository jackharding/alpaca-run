import { ActorRefFrom } from 'xstate';
import gameMachine from './machines/game.machine';
import routingMachine, { ROUTES } from './machines/routing.machine';

export type RouteProps = {
	// activeRoute: ROUTES;
	routingService: ActorRefFrom<typeof routingMachine>;
	gameService: ActorRefFrom<typeof gameMachine>;
};
