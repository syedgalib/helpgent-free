import React, { useState, useEffect, useRef } from "react";
import apiService  from "../../../../../apiService/Service";
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
        editMode: '',
    });

    /* State Destructuring  */
    const { data, titleInput, message, responseType, loader } = state;
    const { editMode } = editModeState;

    /* Edit Mode Activation */
    const activateEditMode = (name,index) => {
        // console.log(index);
        setState({
            ...state,
            titleInput: name,
        });
        setEditModeState({
            editMode: index,
        });
        // console.log(editModeState)
    };

    /* Edit Mode Cancelation */
    const cancelEditMode = () => {
        setEditModeState({
          editMode: '',
        });
    };

    /* Update Table Name */
    const updateTableName = (event) => {
        setState({
          ...state,
          titleInput: event.target.value,
        });
    };

    /* Remove The Notice Box */
    const removeNotice = (event) => {
        event.preventDefault();
        setState({
          ...state,
          message: '',
        });
    };

    /* Update Table Name */
    const saveTableName = (id) => {
        setState({
            ...state,
            loader: true,
        });
        const updatedData = data.map(item => {
            if (item.form_id === id) {
              item.name = titleInput;
              return item;
            }
            return item;
        });
        apiService.dataUpdate(`/forms/${id}`, updatedData)
            .then(response =>{
                if(response.data.success){
                    setState({
                        ...state,
                        data: updatedData,
                        responseType: 'success',
                        message: response.data.message,
                        loader: false,
                    });
                }else{
                    setState({
                        ...state,
                        data: data,
                        responseType: 'warning',
                        message: response.data.message,
                        loader: false,
                    });
                }
                setEditModeState({
                    editMode: '',
                });
                console.log(response)
            })
            .catch((error)=>{
                console.log(error)
            })
    };

    /* Update Table Name */
    const deleteForm = id => {
        setState({
            ...state,
            loader: true,
        });
        apiService.datadelete(`/forms/${id}`)
            .then(response => {
                if(response.data.success){
                    const responsedData = data.filter(item => item.form_id !== id);
                    setState({
                        ...state,
                        data: responsedData,
                        responseType: 'success',
                        message: response.data.message,
                        loader: false,
                    });
                }
            })
            .catch((error) =>{
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                    loader: false,
                });
            })
    };

    /* useEffect Hook used for render data when component was mounted  */
    useEffect(() => {
        apiService.getAll('/forms')
            .then(response => {
                setState({
                    ...state,
                    titleInput: response.data.name,
                    data: response.data.data,
                    loader: false,
                });
            })
            .catch((error) => {
                setState({
                    ...state,
                    message: error.message,
                    responseType: 'error',
                    loader: false,
                });
            });
    }, []);

    // function detectOutsideClick(refs){
        
    //     const handleClick = (event) => {
    //         // console.log(indexKey);
    //         // console.log(refs.current[indexKey]);
    //         refs.current.map((item,index)=>{
                
    //             if(item && !item.contains(event.target)){
    //                 console.log(event.target,item,item.contains(event.target))
    //                 // cancelEditMode()
    //             }
    //         })
    //         // if (refs.current[indexKey] && !refs.current[indexKey].contains(event.target)) {
    //         //     cancelEditMode()
    //         // }
    //     }
    //     useEffect(() => {
    //         document.addEventListener("click", handleClick);
    //         return () => document.removeEventListener("click", handleClick);
    //     }, [refs]);
    // }

    /* Initialize Reference */
    // const referenceBox = useRef([]);
    // detectOutsideClick(referenceBox);
    // console.log(referenceBox)
    return(
        <TemplateBox>
            <div className="wpwax-vm-table-wrap wpwax-vm-table-responsive">
                {message ?
                    <p className={`${responseType ==='success'?'wpwax-vm-notice wpwax-vm-notice-success':'wpwax-vm-notice wpwax-vm-notice-danger'}`}>
                        <span className="wpwax-vm-notice__text">{message}</span>
                        <a href="#" className="wpwax-vm-notice__close" onClick={removeNotice}>x</a>
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
                                                <div className="wpwax-vm-titlebox-inner">
                                                    <span className={editMode === key ? 'wpwax-vm-titlebox__name' : 'wpwax-vm-titlebox__name wpwax-vm-show'}>
                                                        {value.name}
                                                        <span className="wpwax-vm-titlebox__id">ID: {value.form_id}</span>
                                                    </span>
                                                    <div className={editMode === key? `wpwax-vm-titlebox__editor wpwax-vm-show` : `wpwax-vm-titlebox__editor`}>
                                                        <input type="text" name="wpwax-vm-title-input" value={titleInput || ''} onChange={updateTableName}/>
                                                    </div>
                                                    <div className="wpwax-vm-titlebox__editor-action">
                                                        <a href="#" className={editMode === key ? 'wpwax-vm-titlebox__editor--cancel wpwax-vm-show' : 'wpwax-vm-titlebox__editor--cancel'} onClick={cancelEditMode}>
                                                            <span className="dashicons dashicons-no"></span>
                                                        </a>
                                                        <a href="#" className={editMode === key ? 'wpwax-vm-titlebox__editor--yes wpwax-vm-show' : 'wpwax-vm-titlebox__editor--yes'} onClick={()=> saveTableName(value.form_id)}>
                                                            <span className="dashicons dashicons-yes"></span>
                                                        </a>
                                                        <a href="#" className={editMode === key ? 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit' : 'wpwax-vm-titlebox__editor--edit dashicons dashicons-edit wpwax-vm-show'} onClick={ () => activateEditMode(value.name,key)}></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="wpwax-vm-table-action">
                                                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-light"> <span className="dashicons dashicons-edit"></span> Edit</a>
                                                <a href="#" className="wpwax-vm-btn wpwax-vm-btn-danger" onClick={()=> deleteForm(value.form_id)}> <span className="dashicons dashicons-trash"></span> Delete</a>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })):(
                            <tr>
                                <td colSpan={2}>
                                    <span className="wpwax-notfound-text wpwax-vm-text-center">Sorry!! Data Not Found :(</span>
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