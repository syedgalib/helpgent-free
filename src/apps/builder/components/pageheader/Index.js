import React from "react";
import classes from './Style.scss';
import './Style.scss';
const PageHeader = ()=>{
    return(
        <>
            <div className={classes.header}>
                <h2 className={classes.title}>All Templates</h2>
                <a href={location.href+'&mode=edit'} className={`${classes.btn} wpwax-vm-btn wpwax-vm-btn-dark`}>Create New</a>
            </div>
        </>
    ) 
}


export default PageHeader;