import LoadingSpinDot from 'Components/LoadingSpinDot.jsx';

function App( { containerStyle } ) {

	const defaultContainerStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		minHeight: '400px'
	};

	const getContainerStyle = () => {

		let style = defaultContainerStyle;

		if ( typeof containerStyle === 'object' ) {
			style = { ...defaultContainerStyle, containerStyle };
		}

		return style;

	}

	return (
		<div style={ getContainerStyle() }>
			<LoadingSpinDot/>
		</div>
	);
}

export default App;