import React from "react";
import classes from './Style.scss';
import './Style.scss';
const PageHeader = ()=>{
    return(
        <>
            <div className={classes.header}>
                <h2 className={classes.title}>All Templates</h2>
                <button href="#" className={`${classes.btn} wpwax-vm-btn wpwax-vm-btn-dark`}>Create New</button>
            </div>
        </>
    ) 
}


export default PageHeader;