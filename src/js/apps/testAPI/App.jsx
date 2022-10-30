import { useRef, useState } from 'react';
import { useEffect } from 'react';
import useAttachmentAPI from 'API/useAttachmentAPI';
import useFormBuilderAPI from 'API/useFormBuilderAPI';
import useMessangerAPI from 'API/useMessangerAPI';
import useSessionAPI from 'API/useSessionAPI';
import useTermAPI from 'API/useTermAPI';
import useUserAPI from 'API/useUserAPI';

function App() {
	// Attachment API
	const {
		getItems: getAttachmentItems,
		getItem: getAttachmentItem,
		createItem: createAttachmentItem,
		updateItem: updateAttachmentItem,
		deleteItem: deleteAttachmentItem,
	} = useAttachmentAPI();

	// Form Builder API
	const {
		getItems: getFormBuilderItems,
		getItem: getFormBuilderItem,
		createItem: createFormBuilderItem,
		updateItem: updateFormBuilderItem,
		deleteItem: deleteFormBuilderItem,

	} = useFormBuilderAPI();

	// Messanger API
	const {
		getItems: getMessangerItems,
		getItem: getMessangerItem,
		createItem: createMessangerItem,
		updateItem: updateMessangerItem,
		deleteItem: deleteMessangerItem,
		getSeenBy: getMessangerItemSeenBy,
		createSeenBy: createMessangerItemSeenBy,
		deleteSeenBy: deleteMessangerItemSeenBy,
	} = useMessangerAPI();

	// Session API
	const {
		getItems: getSessionItems,
		getItem: getSessionItem,
		createItem: createSessionItem,
		deleteItem: deleteSessionItem,
		markAsRead: markAsReadSessionItem,
		markAsUnread: markAsUnreadSessionItem,
		updateTerms: updateSessionTerms,
		addTerms: addSessionTerms,
		removeTerms: removeSessionTerms,
	} = useSessionAPI();

	// Use Term API
	const {
		getItems: getTermItems,
		getItem: getTermItem,
		createItem: createTermItem,
		updateItem: updateTermItem,
		deleteItem: deleteTermItem,
	} = useTermAPI();

	// Use User API
	const {
		getItems: getUserItems,
		getItem: getUserItem,
		createItem: createUserItem,
		updateItem: updateUserItem,
		deleteItem: deleteUserItem,
		authenticate: authenticateUser,
	} = useUserAPI();

	// Local States
	const [selectedFile, setSelectedFile] = useState(null);

	// Refs
	const fileRef = useRef();

	// @Init
	useEffect( () => {
		// testAttachmentAPI();
	}, []);

	// testUserAPI
	async function testUserAPI() {
		const itemID = 0;

		// const response = await getUserItems();
		// const response = await getUserItem( itemID );
		// const response = await updateUserItem( itemID, { name: 'Updated User Name' } );
		// const response = await deleteUserItem( itemID, { force: true } );
		// const response = await authenticateUser( { email: 'user@email.com', password: '12345' } );

		// console.log( { response } );
	}

	// testTermAPI
	async function testTermAPI() {
		// const itemID = 0;

		// const response = await getTermItems();
		// const response = await getTermItem( itemID );
		// const response = await updateTermItem( itemID, { name: 'Test 2 Updated' } );
		// const response = await deleteTermItem( itemID );

		// console.log( { response } );
	}

	// testSessionAPI
	async function testSessionAPI() {
		// const itemID = '';

		// const response = await getSessionItems();
		// const response = await getSessionItem( itemID );
		// const response = await deleteSessionItem( itemID );
		// const response = await markAsReadSessionItem( itemID );
		// const response = await markAsUnreadSessionItem( itemID );

		// const response = await updateSessionTerms( itemID, {
		// 	add_term_ids: '1,2,3',
		// 	remove_term_ids: '4,5,6'
		// });

		// const response = await addSessionTerms( itemID, {
		// 	session_id: itemID,
		// 	term_id: '1,2,3'
		// });

		// const response = await removeSessionTerms( itemID, {
		// 	session_id: itemID,
		// 	term_id: '1,2,3'
		// });

		// console.log( { response } );
	}

	// testMessangerAPI
	async function testMessangerAPI() {
		// const itemID = 0;

		// const response = await getMessangerItems();
		// const response = await getMessangerItem( itemID );
		// const response = await updateMessangerItem( itemID, { note: 'Test 123' } );
		// const response = await deleteMessangerItem( itemID );
		// const response = await getMessangerItemSeenBy( itemID );
		// const response = await createMessangerItemSeenBy( itemID );
		// const response = await deleteMessangerItemSeenBy( itemID );

		// console.log( { response } );
	}

	// testFormBuilderAPI
	async function testFormBuilderAPI() {
		// const itemID = 0;

		// const response = await getFormBuilderItems();
		// const response = await getFormBuilderItem( itemID );
		// const response = await updateFormBuilderItem( itemID, { name: 'Test 04' } );
		// const response = await deleteFormBuilderItem( itemID );

		// console.log( { response } );
	}

	// testAttachmentAPI
	async function testAttachmentAPI() {
		// const itemID = 0;

		// const response = await getAttachmentItems();
		// const response = await getAttachmentItem( itemID );
		// const response = await updateAttachmentItem( itemID, { created_at: '2030-01-01 00:00:00' } );
		// const response = await deleteAttachmentItem( itemID );

		// console.log( { response } );
	}

	function prepareFile( event ) {
		event.preventDefault();

		const file = event.target.files.length ? event.target.files[0] : null;

        setSelectedFile(file);

        if (!file) {
            return;
        }

	}

	async function handleSubmit( event ) {
		event.preventDefault();

		const file = selectedFile;
		const response = await createAttachmentItem( { file } );

		console.log( { response } );
	}


	return ( <div className="">
		<h1>Test API App</h1>

		{/* <form action="#" onSubmit={handleSubmit}>
			<input ref={fileRef} type="file" name="test-file" onChange={prepareFile} />

			<button type='submit'>Upload</button>
		</form> */}
	</div> );
}

export default App;