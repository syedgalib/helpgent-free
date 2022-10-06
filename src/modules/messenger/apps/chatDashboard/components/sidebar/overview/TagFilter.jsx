import React, {useState, useEffect, useRef} from 'react';
import SVG from 'react-inlinesvg';
import apiService from 'apiService/Service.js';
import Checkbox from "Components/formFields/Checkbox.jsx";
import magnifier from 'Assets/svg/icons/magnifier.svg';
import { TagFilterDropdown } from './Style';

const TagFilter = props =>{
    const ref = useRef(null);
    const [state, setState] = useState({
		searchFilterTags: [],
        checkedForFilter: []
	});
    const { outerState, setOuterState, tagState, setTagState } = props;
    const { sessionFilterDropdown, tagFilterDropdownOpen } = outerState;
    const { allTags, filteredTagList, tagLoader } = tagState;
    const { searchFilterTags, checkedForFilter } = state;

    useEffect(() => {
        setState({
            ...state,
            searchFilterTags: allTags,
        });
        const checkIfClickedOutside = e => {

            if (tagFilterDropdownOpen && ref.current && !ref.current.contains(e.target)) {

                setOuterState({
					...outerState,
                    tagFilterDropdownOpen: false
                });
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
	}, [tagFilterDropdownOpen]);

    const hadnleTagFilterApply = event =>{
        event.preventDefault();
        setOuterState({
            ...outerState,
            loader: true
            // addTagModalOpen: false
        });
        const termArgs = {
            term_ids: checkedForFilter.join(',')
        }
        const fetchSessionByTerm = async ()=>{
			const sessionByTermsResponse = await apiService.getAllByArg('/sessions', termArgs)
			return sessionByTermsResponse;
		}
        fetchSessionByTerm()
			.then( sessionByTermsResponse => {

				setOuterState({
                    ...outerState,
                    sessionList: sessionByTermsResponse.data.data,
                    tagFilterDropdownOpen: false,
                    sessionFilterDropdown: false,
                    hasMore: false,
                    loader: false
                    // addTagModalOpen: false
                });
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
            console.log(temporaryArray);
            setState({
                ...state,
                checkedForFilter: temporaryArray
            })
        }
    }
    const handleTagSearch = event =>{
        let keyword = event.target.value;
        const filtered = allTags.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
        setState({
            ...state,
            searchFilterTags: filtered
        });
    }

    const handleClearChecked = event =>{
        event.preventDefault();
        setState({
            ...state,
            checkedForFilter: []
        });
    }

    return(
        <TagFilterDropdown className={sessionFilterDropdown && tagFilterDropdownOpen ? "wpwax-vm-tagfilter-show": null} ref={ref}>
            <div className="wpwax-vm-tag-search">
                <span className="wpwax-vm-input-icon"><SVG title='Search icon' src={magnifier} /></span>
				<input type="text" className="wpwax-vm-form__element" id="wpwax-vm-filter-tag" placeholder="Search" onChange={handleTagSearch}/>
            </div>
            {
                tagLoader ?
                <span className="wpwax-vm-loading-spin">
                    <span className="wpwax-vm-spin-dot"></span>
                    <span className="wpwax-vm-spin-dot"></span>
                    <span className="wpwax-vm-spin-dot"></span>
                    <span className="wpwax-vm-spin-dot"></span>
                </span>
                :
                <div className="wpwax-vm-tag-filter-list">

                    {
                        searchFilterTags.length !== 0 ?
                            searchFilterTags.map((item,index)=>{

                                return(
                                    <div className="wpwax-vm-tag-filter__check" key={index}>
                                        <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={checkedForFilter.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleTagSelection(e)}/>
                                    </div>
                                )
                            })
                            : <span className='wpwax-vm-empty'>Sorry!! No Tag Found</span>
                    }
                </div>
            }

            <div className={searchFilterTags.length ===0 || checkedForFilter.length === 0 ? "wpwax-vm-tag-filter-action wpwax-vm-tag-filter-action-disabled" : "wpwax-vm-tag-filter-action"}>
                <a href="#" className="wpwax-vm-tag-filter-action__clear" onClick={handleClearChecked}>Clear all</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={hadnleTagFilterApply}>Apply</a>
            </div>
        </TagFilterDropdown>
    )
}

export default TagFilter;