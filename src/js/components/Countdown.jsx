function App({ count, theme }) {

	theme = ( theme ) ? theme : 'light';

	return (
		<div className={ theme + ' wpwax-vm-countdown wpwax-vm-text-center'}>
			<h3 className="wpwax-vm-countdown-heading">{ count }</h3>
			<h4 className="wpwax-vm-countdown-text">
				Get Ready
			</h4>
		</div>
	);
}

export default App;