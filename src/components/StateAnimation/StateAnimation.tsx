import React, { useEffect, useState } from 'react';

type StateAnimationProps = {
	component?: keyof JSX.IntrinsicElements;
	state: string;
	onComplete?: (state: string) => void;
};

const StateAnimation: React.FC<StateAnimationProps> = ({
	component = 'div',
	state: stateProp,
	onComplete = () => {},
	...props
}) => {
	const [state, setState] = useState(stateProp);
	const [prevState, setPrevState] = useState<string | null>(null);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		if (stateProp !== state) {
			setIsAnimating(true);
			setPrevState(state);
			setState(stateProp);
		}
	}, [stateProp, state]);

	const animationComplete = () => {
		setIsAnimating((animating) => {
			if (animating) {
				onComplete(state);
			}
			return false;
		});
	};

	const Component = component;
	return (
		<Component
			{...props}
			data-state={state}
			data-prev-state={prevState}
			onTransitionEnd={animationComplete}
			onAnimationEnd={animationComplete}
		/>
	);
};

export default StateAnimation;
