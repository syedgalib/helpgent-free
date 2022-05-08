import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../../../../apiService/Service";
import {TemplateBox} from './Style';

const Table = ()=>{

    /* Initialize State */
    const [state, setState] = useState({
        data: [],
        titleInput: '',
        message: ''
    });

    /* Initialize EditMode State */
    const [editModeState, setEditModeState] = useState({
        editMode: false,
    });

    /* State Destructuring  */
    const { data, titleInput, message } = state;
    const { editMode } = editModeState;

    /* Edit Mode Activation */
    const activateEditMode = (name) => {
        setState({
            ...state,
            titleInput: name,
        });
        setEditModeState({
            editMode: true,
        });
    };

    /* Edit Mode Cancelation */
    const cancelEditMode = () => {
        setEditModeState({
          ...state,
          editMode: false,
        });
    };

    /* Update Table Name */
    const updateTableName = (event) => {
        setState({
          ...state,
          titleInput: event.target.value,
        });
    };

    /* Update Table Name */
    const saveTableName = (id,name) => {
        apiService.patch('/get_forms');
    };

    /* useEffect Hook used for render data when component was mounted  */
    useEffect(() => {
        apiService.get('/get_forms')
            .then(response => {
                setState({
                    ...state,
                    titleInput: response.data.name,
                    data: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function detectOutsideClick(ref){
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                cancelEditMode()
            }
        }
        useEffect(() => {
            document.addEventListener("click", handleClick);
            return () => document.removeEventListener("click", handleClick);
        }, [ref]);
    }

    /* Initialize Reference */
    const referenceBox = useRef(null);
    detectOutsideClick(referenceBox);

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
                                            <div ref={referenceBox} className="wpwax-vm-titlebox-inner">
                                                <span className={editMode ? 'wpwax-vm-titlebox__name' : 'wpwax-vm-titlebox__name wpwax-vm-show'}>
                                                    {value.name}
                                                    <span className="wpwax-vm-titlebox__id">ID: {value.form_id}</span>
                                                </span>
                                                <div className={editMode? `wpwax-vm-titlebox__editor wpwax-vm-show` : `wpwax-vm-titlebox__editor`}>
                                                    <input type="text" name="wpwax-vm-title-input" value={titleInput || ''} onChange={updateTableName}/>
                                                </div>
                                                <div className="wpwax-vm-titlebox__editor-action">
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--cancel wpwax-vm-show' : 'wpwax-vm-titlebox__editor--cancel'} onClick={cancelEditMode}>
                                                        <span className="dashicons dashicons-no"></span>
                                                    </a>
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--yes wpwax-vm-show' : 'wpwax-vm-titlebox__editor--yes'} onClick={()=> saveTableName(value.id, value.name)}>
                                                        <span className="dashicons dashicons-yes"></span>
                                                    </a>
                                                    <a href="#" className={editMode ? 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit' : 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show'} onClick={ ()=> activateEditMode(value.name)}></a>
                                                </div>
                                                <span className="wpwax-vm-titlebox__editor--message">{message}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="wpwax-vm-table-action">
                                            <a href="#" className="wpwax-vm-btn wpwax-vm-btn-light"> <span className="dashicons dashicons-edit"></span> Edit</a>
                                            <a href="#" className="wpwax-vm-btn wpwax-vm-btn-danger"> <span className="dashicons dashicons-trash"></span> Delete</a>
                                        </div>
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