function Sending() {
	return (
		<div className="wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center">

			<div className="wpwax-vm-record-send-progress__content">
				<div className="wpwax-vm-record-send-progress__bar">
					<span>Sending</span>
				</div>

				<div className="wpwax-vm-text-center">
					<p>We’re currently processing your response.</p>
					<p className="wpwax-vm-danger-text wpwax-vm-text-danger">Please don’t leave this page!</p>
				</div>
				
			</div>
		</div>
	);
}

export default Sending;
