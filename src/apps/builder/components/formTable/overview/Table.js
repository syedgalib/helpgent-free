import React, { useState } from "react";
import classes from './Style.scss';

const tableData = [
    {
      "form_id": "01",
      "name": "Place",
    },
]

const Table = ()=>{

    /* Initialize State */
    const [state, setState] = useState({
        data: tableData,
        titleInput: '',
        editMode: false
    });

    /* Data Destructuring  */
    const { data, editMode } = state;
    
    return(
        <div className={`${classes.content} wpwax-vm-content-box`}>
            <div className="wpwax-vm-table-wrap wpwax-vm-table-responsive">
                <table className="wpwax-vm-table">
                    <thead>
                        <tr>
                            <th className="wpwax-vm-head-name">Title</th>
                            <th className="wpwax-vm-head-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((value, key) => {
                            return(
                                <tr key={key}>
                                    <td>
                                        <div className={classes.titlebox}>
                                            <div className={classes.title}>
                                                <span className={classes.name}>{value.name}</span>
                                                <div className={editMode? `${classes.form}` : `${classes.form} ${classes.show}`}>
                                                    <input type="text" name="wpwax-vm-title-input"/>
                                                    <div className={classes.formAction}>
                                                        <a href="#" className={classes.iconBtn}>
                                                            <span className="dashicons dashicons-no"></span>
                                                        </a>
                                                        <a href="#" className={classes.iconBtn}>
                                                            <span className="dashicons dashicons-check"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <span className="message">Successfuly Updated</span>
                                                <span className="id">{value.form_id}</span>
                                            </div>
                                            <a href="#" className="edit dashicons dashicons-edit"></a>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-light"> <span className="dashicons dashicons-edit"></span> Edit</a>
                                        <a href="#" className="wpwax-vm-btn wpwax-vm-btn-danger"> <span className="dashicons dashicons-trash"></span> Delete</a>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;