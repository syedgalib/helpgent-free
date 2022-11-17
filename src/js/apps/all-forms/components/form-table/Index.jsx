import React, { useEffect, useState } from 'react';
import useFormAPI from 'API/useFormAPI.js';
import PageHeader from '../pageheader/Index.jsx';
import Table from './components/Table.jsx';
import CreateFormModal from '../CreateFormModal.jsx';

function FormTable() {
	const {
        getItems: getAllForms
    } = useFormAPI();

	/* Initialize State */
    const [state, setState] = useState({
        data: [],
        titleInput: '',
        message: '',
        responseType: '',
        deleteId: '',
        modalStatus: 'close',
        createFormModalStatus: 'close',
        loader: true,
    });

	/* useEffect Hook used for render data when component was mounted  */
    useEffect(() => {
        getAllForms({ status: 'draft,publish' })
            .then((response) => {
                setState({
                    ...state,
                    data: response.data,
                    loader: false,
                });
            })
            .catch((error) => {
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                    loader: false,
                });
            });
    }, []);

	return (
		<>
			<PageHeader formState={state} setFormState={setState} />

			<Table formState={state} setFormState={setState} />
			
			<CreateFormModal formState={state} setFormState={setState} />
		</>
	);
}

export default FormTable;