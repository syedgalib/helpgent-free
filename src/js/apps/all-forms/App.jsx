import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from "styled-components";
import FormTable from './components/form-table/Index.jsx';
import { handleChangeLayoutDirection } from './store/layoutModes/actionCreator.js';

const BuilderContainer = () => {
    return(
        <div className="wpwax-vm-page-inner">
            <FormTable />
        </div>
    )
}

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
                <BuilderContainer />
            </ThemeProvider>
        
	);
}

export default App;

