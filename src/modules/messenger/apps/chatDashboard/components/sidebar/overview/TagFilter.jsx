import React, {useState, useEffect} from 'react';
import { ReactSVG } from 'react-svg';
import apiService from 'apiService/Service.js';
import Checkbox from "Components/formFields/Checkbox.jsx";
import magnifier from 'Assets/svg/icons/magnifier.svg';
import { TagFilterDropdown } from './Style';

const TagFilter = props =>{
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
				console.log(sessionByTermsResponse.data.data);
				setOuterState({
                    ...outerState,
                    sessionList: sessionByTermsResponse.data.data,
                    tagFilterDropdownOpen: false,
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
        console.log(e.target.value);
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
        console.log(event)
        setState({
            ...state,
            checkedForFilter: []
        });
    }

    console.log(tagFilterDropdownOpen);

    return(
        <TagFilterDropdown className={sessionFilterDropdown && tagFilterDropdownOpen ? "wpwax-vm-tagfilter-show": null} >
            <div className="wpwax-vm-tag-search">
                <div className="wpwax-vm-input-icon"><ReactSVG src={magnifier} /></div>
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
                        searchFilterTags.map((item,index)=>{
                                                
                            return(
                                <div className="wpwax-vm-tag-filter__check" key={index}>
                                    <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={checkedForFilter.indexOf(item.term_id) === -1 ? false : true} onChange={e=>handleTagSelection(e)}/>
                                </div>
                            )
                        })
                    }
                </div>
            }
            
            <div className="wpwax-vm-tag-filter-action">
                <a href="#" className="wpwax-vm-tag-filter-action__clear" onClick={handleClearChecked}>Clear all</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={hadnleTagFilterApply}>Apply</a>
            </div>
        </TagFilterDropdown>
    )
}

export default TagFilter;