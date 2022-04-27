import React, { useState } from "react";
import {TemplateBox} from './Style';

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
        editMode: false,
        message: ''
    });

    /* Data Destructuring  */
    const { data, editMode, message } = state;

    const activateEditMode = () => {
        setState({
          ...state,
          editMode: true,
        });
    };

    const cancelEditMode = () => {
        setState({
          ...state,
          editMode: false,
        });
    };
    
    return(
        <TemplateBox>
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
                                        <div className="wpwax-vm-titlebox">
                                            <div className="wpwax-vm-titlebox-inner">
                                                <span className={editMode ? 'wpwax-vm-titlebox__name' : 'wpwax-vm-titlebox__name wpwax-vm-show'}>
                                                    {value.name}
                                                    <span className="wpwax-vm-titlebox__id">ID: {value.form_id}</span>
                                                </span>
                                                <div className={editMode? `wpwax-vm-titlebox__editor wpwax-vm-show` : `wpwax-vm-titlebox__editor`}>
                                                    <input type="text" name="wpwax-vm-title-input"/>
                                                </div>
                                                <div className="wpwax-vm-titlebox__editor-action">
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--cancel wpwax-vm-show' : 'wpwax-vm-titlebox__editor--cancel'} onClick={cancelEditMode}>
                                                        <span className="dashicons dashicons-no"></span>
                                                    </a>
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--yes wpwax-vm-show' : 'wpwax-vm-titlebox__editor--yes'} onClick={activateEditMode}>
                                                        <span className="dashicons dashicons-yes"></span>
                                                    </a>
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit' : 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show'} onClick={activateEditMode}></a>
                                                </div>
                                                <span className="wpwax-vm-titlebox__editor--message">{message}</span>
                                            </div>
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
        </TemplateBox>
    )
}

export default Table;