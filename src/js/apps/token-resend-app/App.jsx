import { useState } from "react";
import useAuthenticationAPI from "API/useAuthenticationAPI";

function App( { tokenEmail } ) {

	const { createToken } = useAuthenticationAPI();

	const stages = {
		INIT: 'init',
		LOADING: 'loading',
		SUCCESS: 'success',
		ERROR: 'error',
	};

	const [ currentStage, setCurrentStage ] = useState( stages.INIT );
	const [ isCreatingToken, setIsCreatingToken ] = useState( false );
	const [ errorMessage, setErrorMessage ] = useState( '' );


	async function submitCreateToken( e ) {
		e.preventDefault();

		if ( isCreatingToken ) {
			return;
		}

		setIsCreatingToken( true );
		setCurrentStage( stages.LOADING );

		const response = await createToken( { email: tokenEmail } );

		setIsCreatingToken( false );

		if ( ! response.success ) {
			const message = ( response.message ) ? response.message : 'Something went wrong, please try again.';
			setErrorMessage( message );
			setCurrentStage( stages.ERROR );
			return;
		}

		setCurrentStage( stages.SUCCESS );
	}

	function onTryAgain( e ) {
		e.preventDefault();

		submitCreateToken( e );
	}

	if ( stages.INIT === currentStage ) {
		return (
			<p className='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center wpwax-vm-justify-content-center'>
				The token has been expaired, please <a href="#" onClick={submitCreateToken} className="wpwax-vm-link wpwax-vm-p-5">click</a> here to create a new one.
			</p>
		);
	} else if ( stages.LOADING === currentStage ) {
		return (
			<p className='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center wpwax-vm-justify-content-center'>
				Generating the token, please wait...
			</p>
		);
	} else if ( stages.SUCCESS === currentStage ) {
		return (
			<p className='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center wpwax-vm-justify-content-center'>
				The token has been generated successfuly, please check your email.
			</p>
		);
	}
	else if ( stages.ERROR === currentStage ) {
		return (
			<div className='wpwax-vm-notice wpwax-vm-notice-warning wpwax-vm-text-center wpwax-vm-justify-content-center'>
				{errorMessage}

				<a href="#" onClick={onTryAgain} className="wpwax-vm-link wpwax-vm-p-5">Try again</a>
			</div>
		);
	} else {
		return '';
	}
}

export default App;