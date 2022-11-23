import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from "styled-components";
import ContactList from './Layouts/ContactList.jsx';
import { handleChangeLayoutDirection } from './store/layoutModes/actionCreator.js';

function App() {
	/* Dispasth is used for passing the actions to redux store  */
	const dispatch = useDispatch();
	const { dir } = useSelector(state => {
		return {
		  dir: state.changeLayout.dir,
		};
	});

	const theme = {
		direction: dir
	}

	useEffect(() => {
		if(document.documentElement.getAttribute('dir') === 'rtl'){
			dispatch(handleChangeLayoutDirection('rtl'));
		}else{
			dispatch(handleChangeLayoutDirection('ltr'));
		}
    }, []);

	return (
			<ThemeProvider theme={theme}>
				<ContactList />
			</ThemeProvider>
	);
}

export default App;
