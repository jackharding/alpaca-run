import { rem } from 'polished';

// some clever getter for getting desktop gutter or mobile gutter based on screen size?

export const theme = {
	colors: {
		primary: '#9FD356',
		text: '#311D16',
		overlay: 'rgba(255, 255, 255, 0.5)',
	},
	spacing: {
		topSpacing: rem(26),
		gutter: rem(16),
		// gutter: rem(16),
	},
};
