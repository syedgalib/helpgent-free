import React from "react";
import PageHeaderStyle from './Style';
const PageHeader = ()=>{
    return(
        <>
            <PageHeaderStyle>
                <h2 className="wpwax-vm-page-header-title">All Templates</h2>
                <a href={location.href+'&mode=edit'} className={`wpwax-vm-page-header-btn wpwax-vm-btn wpwax-vm-btn-dark`}>Create New</a>
            </PageHeaderStyle>
        </>
    ) 
}


export default PageHeader;