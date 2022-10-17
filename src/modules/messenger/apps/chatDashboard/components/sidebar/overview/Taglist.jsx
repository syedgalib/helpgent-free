import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { ReactSVG } from 'react-svg';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactSVG from 'react-inlinesvg';
import apiService from 'apiService/Service.js';
import { TaglistWrap } from './Style';
import userImg from 'Assets/img/chatdashboard/user.png';
import userIcon from 'Assets/svg/icons/users.svg';
import Dropdown from 'Components/formFields/Dropdown.jsx';
import ellipsisH from 'Assets/svg/icons/ellipsis-h.svg';
import loaders from 'Assets/svg/icons/loader.svg';

/* Dropdown Array Item Declaration */
const moreDropdown = [
    {
        name: 'term-edit',
        text: 'Edit',
    },
    {
        name: 'term-delete',
        text: 'Delete',
    },
];

const Taglist = (props) => {
    const overlay = document.querySelector('.wpax-vm-overlay');
    const [state, setState] = useState({
        tagsPageNumber: 2,
        hasMore: true
	});
    const { sessionState, setSessionState, tagState, setTagState } = props;
    const {
        editableTerm,
        assignedTags,
        allTags,
        filteredTagList,
        addTagModalOpen,
        tagLoader,
    } = tagState;
    const {
        sessionList,
        activeSessionId,
        tagListModalOpen,
        taglistWithSession,
        loader,
    } = sessionState;

    const { tagsPageNumber, hasMore } = state;
    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    /* initialize Form Data */
    const { sessions } = useSelector((state) => {
        return {
            sessions: state.sessions.sessions,
        };
    });

    const currentSession = sessions.filter(
        (singleSession) => singleSession.session_id === activeSessionId
    );

    useEffect(() => {
        if(tagListModalOpen){
            // if(filteredTagList.length === 0){
                setTagState({
                    ...tagState,
                    tagLoader: true
                });
                const fetchTags = async () =>{
                    const tagsResponse = await apiService.getAllByArg('/messages/terms',{limit:8});
                    return tagsResponse;
                }
                fetchTags()
                    .then((tagsResponse) => {
                        setState({
                            ...state,
                            hasMore: true,
                        });
                        setTagState({
                            ...tagState,
                            tagLoader: false,
                            allTags: tagsResponse.data.data,
                            filteredTagList: tagsResponse.data.data,
                        });
                    })
                    .catch((error) => {
                        setTagState({
                            ...tagState,
                            tagLoader: false,
                        });
                        console.log(error);
                    });
            // }
        }

	}, [tagListModalOpen]);

    /* Handle Add Tag */
    const handleAddTagModal = (event) => {
        event.preventDefault();
        setSessionState({
            ...sessionState,
            editableTermId: '',
            tagListModalOpen: false,
            addTagModalOpen: true,
            taglistWithSession: true,
        });
    }

    const handleCloseAllTagModal = (event) => {
        event.preventDefault();
        overlay.classList.remove('wpwax-vm-show');
        setSessionState({
            ...sessionState,
            tagListModalOpen: false,
            addTagModalOpen: false,
        });
    };

    const handleTagFilter = (event) => {
        let keyword = event.target.value.trim().toLowerCase();
        const filteredTags = taglistWithSession
            ? assignedTags.filter(tag => tag.name.toLowerCase().includes(keyword))
            : allTags.filter(tag => tag.name.toLowerCase().includes(keyword));

        setTagState({
            ...tagState,
            filteredTagList: filteredTags,
        });
    };

    const currentUser = wpWaxCustomerSupportApp_CoreScriptData.current_user;
    let users = [];
    if (currentSession.length !== 0) {
        users = currentSession[0].users.filter(
            (p) => currentUser && p.id !== parseInt(currentUser.ID)
        );
    }
    let images = [];
    let titleString = [];
    let multiImg = false;
    if (currentSession.length !== 0) {
        if (currentSession[0].users.length === 1) {
            images.push(currentSession[0].users[0].avater);
            titleString.push(currentSession[0].users[0].name);
        } else {
            for (let i = 0; i < users.length; i++) {
                images.push(users[i].avater);
                titleString.push(users[i].name);
            }
        }
    }

    if (images.length > 1) {
        multiImg = true;
    }

    const fetchMoreTags = ()=>{
        const pageArg = {
            limit: '8',
            page: tagsPageNumber,
        };
        setState({
            ...state,
            tagsPageNumber: tagsPageNumber+1
        });
        // setTagsPageNumber(tagsPageNumber + 1);

        const fetchNextTags = async () => {
            const nextTagResponse = await apiService.getAllByArg('/messages/terms',pageArg);
            return nextTagResponse;
        };
        setTimeout(() => {
            fetchNextTags()
                .then((nextTagResponse) => {
                    if (nextTagResponse.data.data.length === 0) {
                        setState({
                            ...state,
                            hasMore: false,
                        });
                    } else {
                        setState({
                            ...state,
                            hasMore: false,
                        });
                        setTagState({
                            ...tagState,
                            filteredTagList: filteredTagList.concat(nextTagResponse.data.data)
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }

    return (
        <TaglistWrap
            className={
                tagListModalOpen
                    ? 'wpwax-vm-modal wpwax-vm-show'
                    : 'wpwax-vm-modal'
            }
        >
            <div className='wpwax-vm-modal__header'>
                <div className='wpwax-vm-taglist-author'>
                    {taglistWithSession ? (
                        <div className='wpwax-vm-taglist-author__img'>
                            {images.map((src, index) => {
                                if (index === 0) {
                                    if (src !== '') {
                                        return (
                                            <img src={src} alt='' key={index} />
                                        );
                                    } else {
                                        return (
                                            <img
                                                src={userImg}
                                                alt=''
                                                key={index}
                                            />
                                        );
                                    }
                                }
                            })}
                            {multiImg ? (
                                <div className='wpwax-vm-more-img'>
                                    <ReactSVG src={userIcon} />
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    <span className='wpwax-vm-taglist-author__name'>
                        {' '}
                        {taglistWithSession
                            ? `Tags of ${titleString}`
                            : 'All Tags'}{' '}
                    </span>
                </div>
                <a
                    href='#'
                    className='wpwax-vm-modal__close'
                    onClick={handleCloseAllTagModal}
                >
                    <span className='dashicons dashicons-no-alt'></span>
                </a>
            </div>

            <div className='wpwax-vm-modal__body'>
                <div className='wpawax-vm-taglist-search'>
                    <span className='dashicons dashicons-search'></span>
                    <input
                        type='text'
                        placeholder='Search'
                        id='wpwax-vm-filter-taglist'
                        onChange={handleTagFilter}
                    />
                </div>
                <div className='wpawax-vm-taglist-inner'>
                    {tagLoader ? (
                        <span className='wpwax-vm-loading-spin'>
                            <span className='wpwax-vm-spin-dot'></span>
                            <span className='wpwax-vm-spin-dot'></span>
                            <span className='wpwax-vm-spin-dot'></span>
                            <span className='wpwax-vm-spin-dot'></span>
                        </span>
                    ) : filteredTagList.length > 0 ? (
                        <ul id="wpwax-vm-scrollable-taglist">
                            <InfiniteScroll
                                dataLength={filteredTagList.length}
                                next={fetchMoreTags}
                                hasMore={hasMore}
                                scrollableTarget='wpwax-vm-scrollable-taglist'
                                loader={
                                    <span className='wpwax-vm-more-loader'>
                                        <ReactSVG src={loaders} />
                                    </span>
                                }
                            >
                            {filteredTagList.map((term, index) => {
                                return (
                                    <li key={index}>
                                        <span className='wpwax-vm-taglist-label'>
                                            {term.name}
                                        </span>
                                        <Dropdown
                                            dropdownText={false}
                                            dropdownIconOpen={ellipsisH}
                                            dropdownIconClose={ellipsisH}
                                            dropdownList={moreDropdown}
                                            outerState={sessionState}
                                            setOuterState={
                                                setSessionState
                                            }
                                            termState={tagState}
                                            setTermState={setTagState}
                                            sessionId={activeSessionId}
                                            termId={term.term_id}
                                        />
                                    </li>
                                );
                            })}
                            </InfiniteScroll>
                        </ul>
                    ) : (
                        <div className='wpwax-vm-empty'>
                            {taglistWithSession ? (
                                <p>Sorry!! No Assigned Tags Found</p>
                            ) : (
                                <p>Sorry!! No Tags Found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {taglistWithSession ? (
                <div className='wpwax-vm-modal__footer'>
                    <a
                        href='#'
                        className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-white'
                        onClick={handleAddTagModal}
                    >
                        <span className='wpwax-vm-btn-icon dashicons dashicons-plus'></span>
                        <span className='wpwax-vm-btn-text'>New Tag</span>
                    </a>
                    <a
                        href='#'
                        className='wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary'
                        onClick={handleCloseAllTagModal}
                    >
                        Done
                    </a>
                </div>
            ) : null}
        </TaglistWrap>
    );
};

export default Taglist;
