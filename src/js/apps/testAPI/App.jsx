import { useRef, useState } from 'react';
import { useEffect } from 'react';
import useAttachmentAPI from 'API/useAttachmentAPI';
import useFormAPI from 'API/useFormAPI';
import useMessangerAPI from 'API/useMessangerAPI';
import useConversationAPI from 'API/useConversationAPI';
import useTermAPI from 'API/useTermAPI';
import useUserAPI from 'API/useUserAPI';
import useSettingsAPI from 'API/useSettingsAPI';

function App() {
	// Attachment API
	const {
		getItems: geteSettingsItems,
		updateItem: updateSettingsItem,
		deleteItem: deleteSettingsItem,
	} = useSettingsAPI();

	// Attachment API
	const {
		getItems: getAttachmentItems,
		getItem: getAttachmentItem,
		createItem: createAttachmentItem,
		updateItem: updateAttachmentItem,
		deleteItem: deleteAttachmentItem,
	} = useAttachmentAPI();

	// Form API
	const {
		getItems: getFormItems,
		getItem: getFormItem,
		createItem: createFormItem,
		updateItem: updateFormItem,
		deleteItem: deleteFormItem,

	} = useFormAPI();

	// Messanger API
	const {
		getItems: getMessangerItems,
		getItem: getMessangerItem,
		createItem: createMessangerItem,
		updateItem: updateMessangerItem,
		deleteItem: deleteMessangerItem,
	} = useMessangerAPI();

	// Conversation API
	const {
		getItems: getConversationItems,
		getItem: getConversationItem,
		createItem: createConversationItem,
		deleteItem: deleteConversationItem,
		markAsRead: markAsReadConversationItem,
		markAsUnread: markAsUnreadConversationItem,
		updateTerms: updateConversationTerms,
		addTerms: addConversationTerms,
		removeTerms: removeConversationTerms,
	} = useConversationAPI();

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
		testSettingsAPI();
	}, []);

	// testSettingsAPI
	async function testSettingsAPI() {
		// const response = await getSettingsItems();
		// const response = await updateSettingsItem( { 
		// 	userDashboardPage: 3 
		// });
		// const response = await deleteSettingsItem( { userDashboardPage: '' } );

		// console.log( { response } );
	}
	
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

	// testConversationAPI
	async function testConversationAPI() {
		// const itemID = 0;

		// const response = await getConversationItems();
		// const response = await getConversationItem( itemID );
		// const response = await createConversationItem( { title: '' } );
		// const response = await deleteConversationItem( itemID );

		// const response = await markAsReadConversationItem( itemID );
		// const response = await markAsUnreadConversationItem( itemID );

		// const response = await updateConversationTerms( itemID, {
		// 	add_terms: '1,2',
		// 	remove_terms: '1,2'
		// });

		// const response = await addConversationTerms( itemID, { terms: '1,2' } );
		// const response = await removeConversationTerms( itemID, { terms: '1,2' } );

		// console.log( { response } );
	}

	// testMessangerAPI
	async function testMessangerAPI() {
		// const itemID = 1;

		// const response = await getMessangerItems();
		// const response = await getMessangerItem( itemID );
		// const response = await createMessangerItem( { conversation_id: 1,  message: 'New Test' } );
		// const response = await updateMessangerItem( itemID, { message: 'Test Updated' } );
		// const response = await deleteMessangerItem( itemID );

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