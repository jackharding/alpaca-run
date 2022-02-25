import { ReactComponent as UnicyclerSvg} from '../svg/unicycler.svg';

type UnicyclerProps = {
	style?: {};
}

const Unicycler: React.FC<UnicyclerProps> = ({ style }) => {
	return(
		<UnicyclerSvg style={{ width: 75, ...style }} />
	)
}

export default Unicycler;