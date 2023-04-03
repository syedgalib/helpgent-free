import React, {useState, useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactSVG from 'react-inlinesvg';
import { useDebounce } from 'Helper/hooks';
import apiService from 'apiService/Service.js';
import useTermAPI from 'API/useTermAPI.js';
import useConversationAPI from 'API/useConversationAPI.js';
import Checkbox from "Components/form-fields/Checkbox.jsx";
import magnifier from 'Assets/svg/icons/magnifier.svg';
import loaders from 'Assets/svg/icons/loader.svg';
import { TagFilterDropdown } from './Style';
import { getTimezoneString } from 'Helper/utils.js';

const TagFilter = props =>{
    const { getItems: getTerms } = useTermAPI();
    const { getItems: getConversations } = useConversationAPI();
    const ref = useRef(null);
    const [state, setState] = useState({
        checkedForFilter: [],
        hasMore: false
	});
    const [tagsPageNumber, setTagsPageNumber] = useState(2);
    const { outerState, setOuterState, tagState, setTagState, tagFilterDropdownOpen, setTagFilterDropdownOpen, setPageNumber } = props;
    const { sessionFilterDropdown } = outerState;
    const { allTags, filteredTagList, tagLoader } = tagState;
    const { checkedForFilter, hasMore } = state;
    const [searchTag, setSearchTag] = useState("");

	const filterTextFieldRef = useRef(null);

    const debouncedSearchTerm = useDebounce(searchTag, 300);

    // Effect for API call
    useEffect(() => {
        const tagArg = {
            name: debouncedSearchTerm,
        };
        if(tagFilterDropdownOpen){
            const fetchSearchNameMail = async () => {

                const searchByNameMailResponse = await getTerms(tagArg);
                return searchByNameMailResponse;
            };
    
            fetchSearchNameMail()
                .then((searchByNameMailResponse) => {
    
                    setTagState({
                        ...tagState,
                        tagLoader: false,
                        allTags: searchByNameMailResponse.data,
                    });
    
                    setState({
                        ...state,
                        hasMore: false,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
    },[debouncedSearchTerm]);

    useEffect(() => {
        
        if(allTags.length ===0){
            setTagState({
                ...tagState,
                tagLoader: true
            });
        }
        
        const fetchTags =  async () =>{

            const tagsResponse = await getTerms({limit:5});
            return tagsResponse;
        }
        fetchTags()
            .then((tagsResponse) => {
                if(tagsResponse.data.length !==0){
                    setState({
                        ...state,
                        hasMore: true,
                    });
                }else{
                    setState({
                        ...state,
                        hasMore: false,
                    });
                }

                setTagState({
                    ...tagState,
                    tagLoader: false,
                    allTags: tagsResponse.data,
                });
            })
            .catch((error) => {
                setTagState({
                    ...tagState,
                    tagLoader: false,
                });
                console.log(error);
            });
        
	}, [tagFilterDropdownOpen]);

    const hadnleTagFilterApply = event =>{
        event.preventDefault();
        setOuterState({
            ...outerState,
            loader: true
        });
        const termArgs = {
            terms: checkedForFilter.join(',')
        }
        const fetchSessionByTerm = async ()=>{
			const sessionByTermsResponse = await getConversations(termArgs)
			return sessionByTermsResponse;
		}
        fetchSessionByTerm()
			.then( sessionByTermsResponse => {
				setOuterState({
                    ...outerState,
                    sessionList: sessionByTermsResponse.data,
                    sessionFilterDropdown: false,
                    hasMore: false,
                    loader: false
                });
                setTagFilterDropdownOpen(false);
			})
			.catch((error) => {
				console.log(error);
			})

    }

    const handleTagSelection = (e) =>{

        if(e.target.checked){
            setState({
                ...state,
                checkedForFilter: [
                    ...state.checkedForFilter,
                    e.target.id.replace('wpwax-vm-term-','')
                ],
            });
        }else{
            let temporaryArray = [...checkedForFilter];
            temporaryArray.splice(temporaryArray.indexOf(e.target.id.replace('wpwax-vm-term-','')),1);
            setState({
                ...state,
                checkedForFilter: temporaryArray
            })
        }
    }

    const handleClearChecked = event =>{
        event.preventDefault();
        setState({
            ...state,
            checkedForFilter: []
        });

		filterTextFieldRef.current.value = '';

        const pageLimit = {
            limit: '15',
            page: 1,
            timezone: getTimezoneString(),
        };

        const fetchUpdatedSessions =  async () =>{

            const updatedSessionResponse = await getConversations(pageLimit);
            return updatedSessionResponse;
        }
        fetchUpdatedSessions()
            .then(updatedSessionResponse =>{
                setOuterState({
                    ...outerState,
                    hasMore: true,
                    sessionList: updatedSessionResponse.data
                });
                setPageNumber(2);
            })
    }

    const fetchMoreTags = ()=>{
        const pageArg = {
            limit: '5',
            page: tagsPageNumber,
        };
        setTagsPageNumber(tagsPageNumber + 1);

        const fetchNextTags = async () => {
            const nextTagResponse = await getTerms(pageArg);
            return nextTagResponse;
        };
        setTimeout(() => {
            fetchNextTags()
                .then((nextTagResponse) => {
                    if (nextTagResponse.data.length === 0) {
                        setState({
                            ...state,
                            hasMore: false,
                        });
                        setTagsPageNumber(2);
                    } else {
                        setTagState({
                            ...tagState,
                            allTags: allTags.concat(nextTagResponse.data)
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }

    return(
        <TagFilterDropdown className={tagFilterDropdownOpen ? "wpwax-vm-tagfilter-show": null} ref={ref}>
            <div className="wpwax-vm-tag-search">
                <div className="wpwax-vm-input-icon"><ReactSVG src={magnifier} /></div>
				<input type="text" className="wpwax-vm-form__element" ref={filterTextFieldRef} placeholder="Search tags" onChange={(e) => setSearchTag(e.target.value)}/>
            </div>
            <div className={tagLoader ? "wpwax-vm-tag-filter-list-wrap wpwax-vm-loder-active": "wpwax-vm-tag-filter-list-wrap"}>
                <h4 className="wpwax-vm-all-tag-title">All Tags</h4>
                {
                    tagLoader ?
                    <span className="wpwax-vm-loading-spin">
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                    </span>
                    :
                    <div className="wpwax-vm-tag-filter-list" id="wpwax-vm-scrollable-filter">
                        <InfiniteScroll
                            dataLength={allTags.length}
                            next={fetchMoreTags}
                            hasMore={hasMore}
                            scrollableTarget='wpwax-vm-scrollable-filter'
                            loader={
                                <span className='wpwax-vm-more-loader'>
                                    <ReactSVG src={loaders} />
                                </span>
                            }
                        >
                            {
                                allTags.length !== 0 ?
                                    allTags.map((item,index)=>{

                                        return(
                                            <div className="wpwax-vm-tag-filter__check" key={index}>
                                                <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} checked={checkedForFilter.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleTagSelection(e)}/>
                                            </div>
                                        )
                                    })
                                    : <span className='wpwax-vm-empty'>No Tag Found</span>
                            }
                        </InfiniteScroll>
                    </div>
                }
            </div>


            <div className="wpwax-vm-tag-filter-action">
                <a href="#" className="wpwax-vm-tag-filter-action__clear" onClick={handleClearChecked}>Clear all</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={hadnleTagFilterApply}>Apply</a>
            </div>
        </TagFilterDropdown>
    )
}

export default TagFilter;