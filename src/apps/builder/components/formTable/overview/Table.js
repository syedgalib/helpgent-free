import React, { useState, useEffect, useRef } from "react";
import { apiService } from "../../../../../apiService/Service";
import {TemplateBox} from './Style';

const Table = ()=>{

    /* Initialize State */
    const [state, setState] = useState({
        data: [],
        titleInput: '',
        message: '',
        responseType: 'success',
        loader: true,
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
        apiService.patch('/forms');
    };

    /* useEffect Hook used for render data when component was mounted  */
    useEffect(() => {
        apiService.get('/forms')
            .then(response => {
                setState({
                    ...state,
                    message: response.message,
                    titleInput: response.data.name,
                    responseType: 'success',
                    data: response.data,
                });
                console.log(response);
            })
            .catch((error) => {
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                });
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
    console.log(data)
    return(
        <TemplateBox>
            <div className="wpwax-vm-table-wrap wpwax-vm-table-responsive">
                {!message === ''? 
                    <p className="wpwax-vm-notice wpwax-vm-notice-success">
                        <span className="wpwax-vm-notice__text">Request failed with status code 404</span>
                        <a href="#" className="wpwax-vm-notice__close">x</a>
                    </p>
                    :''
                }
                <table className="wpwax-vm-table">
                    <thead>
                        <tr>
                            <th className="wpwax-vm-head-name">Title</th>
                            <th className="wpwax-vm-head-action">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((value, key) => {
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
                                );
                            })):(
                            <tr>
                                <td colSpan={2}>
                                    <span className="wpwax-vm-loading-spin">
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                        <span className="wpwax-vm-spin-dot"></span>
                                    </span>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </TemplateBox>
    )
}

export default Table;