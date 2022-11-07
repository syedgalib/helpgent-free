import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useCoreData } from '../../helpers/hooks/useCoreData.jsx';
import MessageBox from './components/message-box/Index.jsx';
import Sidebar from './components/sidebar/Index.jsx';

import ChatDashboardWrap from './Style';

function App() {
    /* initialize Form Data */
    const { modalOverlay } = useSelector((state) => {
        return {
            modalOverlay: state.tags.modalOverlay,
        };
    });

    /* Initialize State */
    const [sessionState, setSessionState] = useState({
        sessionList: [],
        filteredSessions: [],
        asignedTerms: [],
        serverAssigned: [],
        unAsignedTerms: [],
        activeSessionId: '',
        deleteModalOpen: false,
        tagListModalOpen: false,
        successMessage: '',
        deleteTerm: '',
        rejectMessage: '',
        editableTermId: '',
        sessionFilterDropdown: false,
        tagFilterDropdownOpen: false,
        taglistWithSession: false,
        hasMore: true,
        loader: true,
		currentUser: useCoreData( 'current_user' ),
		isCurrentUserAdmin: useCoreData( 'current_user.is_admin' ) ? true : false
    });


    return (
        <ChatDashboardWrap>
            <div className='wpwax-vm-sidebar'>
                <Sidebar
                    sessionState={sessionState}
                    setSessionState={setSessionState}
                />
            </div>

            <div className='wpwax-vm-messagebox'>
                <MessageBox
                    sessionState={sessionState}
                    setSessionState={setSessionState}
                />
            </div>

            {/* <span className={modalOverlay ? "wpax-vm-overlay wpwax-vm-show" : "wpax-vm-overlay"}></span> */}
            <span className='wpax-vm-overlay'></span>
        </ChatDashboardWrap>
    );
}

export default App;
