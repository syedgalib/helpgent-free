import React from "react";
import PageHeaderStyle from './Style';
const PageHeader = props =>{
    const { formState, setFormState } = props;

    const handleCreateNew = e =>{
        e.preventDefault()
        setFormState({
            ...formState,
            createFormModalStatus: 'open'
        });
    }
    return(
        <React.Fragment>
            <PageHeaderStyle>
                <h2 className="wpwax-vm-page-header-title">All Forms</h2>
                { formState.data.length > 0 ? <a href="#" className={`wpwax-vm-page-header-btn wpwax-vm-btn wpwax-vm-btn-dark`} onClick={handleCreateNew}>Create New</a> : null }
            </PageHeaderStyle>
        </React.Fragment>
    ) 
}

export default PageHeader;