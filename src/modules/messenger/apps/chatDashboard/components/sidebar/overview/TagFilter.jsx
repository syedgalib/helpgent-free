import React, {useState} from 'react';
import { ReactSVG } from 'react-svg';
import Checkbox from "Components/formFields/Checkbox.jsx";
import magnifier from 'Assets/svg/icons/magnifier.svg';
import { TagFilterDropdown } from './Style';

const TagFilter = props =>{
    const { outerState, setOuterState, tagState, setTagState } = props;
    const { sessionFilterDropdown, tagFilterDropdownOpen } = outerState;
    const { allTags, filteredTagList, tagLoader } = tagState;
    
    const hadnleTagFilterApply = event =>{
        event.preventDefault();
        setOuterState({
            ...outerState,
            tagFilterDropdown: false,
            // addTagModalOpen: false
        });
    }
    const handleTagSelection = () =>{

    }
    const handleTagSearch = event =>{
        let keyword = event.target.value;
        const filtered = allTags.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(keyword)));
        setTagState({
            ...tagState,
            filteredTagList: filtered
        });
    }

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
                        filteredTagList.map((item,index)=>{
                                                
                            return(
                                <div className="wpwax-vm-tag-filter__check" key={index}>
                                    <Checkbox id={`wpwax-vm-term-${item.term_id}`} label={item.name} value={false} onChange={handleTagSelection}/>
                                </div>
                            )
                        })
                    }
                </div>
            }
            
            <div className="wpwax-vm-tag-filter-action">
                <a href="#" className="wpwax-vm-tag-filter-action__clear">Clear all</a>
                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-sm wpwax-vm-btn-primary" onClick={hadnleTagFilterApply}>Apply</a>
            </div>
        </TagFilterDropdown>
    )
}

export default TagFilter;