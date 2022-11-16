import ChatScreen from 'Apps/chatbox/components/chat-screen/Index.jsx';
import { useEffect } from 'react';
import useFormAPI from 'API/useFormAPI';
import { useState } from 'react';

import { loadTemplateSuccess } from './store/chatboxTemplate/actionCreator';
import { handleChangeLayoutDirection } from './store/layoutModes/actionCreator.js';
import { ThemeProvider } from "styled-components";
import screenTypes from './store/chatbox/screenTypes';
import { changeChatScreen } from './store/chatbox/actionCreator';

import { useDispatch, useSelector } from 'react-redux';


function App( { id } ) {
	const { dir } = useSelector( state => {
        return {
			dir: state.changeLayout.dir,
        };
    });

	const theme = {
		direction: dir
	}
 	const dispatch = useDispatch();

	const { getItem: getFormItem, } = useFormAPI();

	const [ isLoadingInitData, setIsLoadingInitData ] = useState( true );
	const [ failedLoadingForm, setFailedLoadingForm ] = useState( true );

	// @Init
	useEffect( () => {
		loadInitialData();
	}, [] );

	async function loadInitialData() {
		setIsLoadingInitData( true );

		// Setup RTL
		setupRTL();

		// Load Form
		await loadForm();

		setIsLoadingInitData( false );
	}

	function setupRTL() {
		if ( document.documentElement.getAttribute('dir') === 'rtl'){
			dispatch( handleChangeLayoutDirection('rtl') );
		} else {
			dispatch( handleChangeLayoutDirection('ltr') );
		}
	}


	async function loadForm() {
		const response = await getFormItem( id );

		if ( response.success ) {
			setFailedLoadingForm( false );
			dispatch( loadTemplateSuccess( [ response.data ] ) );
			return;
		}

		setFailedLoadingForm( true );
	}

	if ( isLoadingInitData ) {
		return (
			<div className="wpwax-vm-text-center">
				<h2>Please wait...</h2>
			</div>
		);
	}

	if ( failedLoadingForm ) {
		return (
			<div className="wpwax-vm-text-center">
				<h2>Could not load the form, please try again</h2>
			</div>
		);
	}

	return <ThemeProvider theme={theme}><ChatScreen show={true} staticContainer={true} /></ThemeProvider>;
}

export default App;