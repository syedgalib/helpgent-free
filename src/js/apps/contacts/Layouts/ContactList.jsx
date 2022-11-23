import React, { useState, useEffect } from 'react';
import Checkbox from 'Components/form-fields/Checkbox.jsx';
import ReactSVG from 'react-inlinesvg';
import ReactPaginate from 'react-paginate';
import useContactAPI from 'API/useContactAPI.js';
import { CSVLink } from "react-csv";
import ContactStyleWrap from './Style';
import angleLeft from 'Assets/svg/icons/angle-left.svg';
import angleRight from 'Assets/svg/icons/angle-right.svg';

const ContactList = () =>{
    const { getItems: getUsers } = useContactAPI();
    const [state, setState] = useState({
        userList: [],
        csvList:[],
        headCheckBox: false,
        loader: true,
        checkBoxesValue: []
    });

    const itemsPerPage = 20;

    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(1);

    const { loader, userList, csvList, headCheckBox, checkBoxesValue } = state;

    useEffect(() => {

        const userArgs = {
            is_client: 1,
            limit: itemsPerPage,
            page: itemOffset,
        };
        const fetchUsers = async () => {
            const fetchUserResponse = await getUsers(userArgs);
            return fetchUserResponse;
        };

        fetchUsers()
            .then((fetchUserResponse) => {
                const totalUser = parseInt(fetchUserResponse.headers['x-wp-total']);
                let value = [];
                for(let i=0; i<fetchUserResponse.data.length; i++){
                    value.push(false);
                }
                setState({
                    ...state,
                    userList: fetchUserResponse.data,
                    checkBoxesValue: value,
                    loader: false
                });
                setPageCount(Math.ceil(totalUser/itemsPerPage));
            });
    }, [itemOffset,itemsPerPage]);

    useEffect(() => {
        const allchecked = checkBoxesValue.filter(item=> item === false);
        if(allchecked.length === 0){
            setState({
                ...state,
                headCheckBox: true,
            });
        }else{
            setState({
                ...state,
                headCheckBox: false,
            });
        }
        
    }, [ checkBoxesValue ]);

    const handleSelectCheckbox = ( e, i, userId ) =>{
        if(checkBoxesValue[i]){
            let newArray  = [...checkBoxesValue];
            let csvUser = csvList.filter( item=> item.id !== userId);

            newArray[i] = false;
            setState({
                ...state,
                csvList: csvUser,
                headCheckBox: false,
                checkBoxesValue: newArray
            });
        }else{
            let newArray  = [...checkBoxesValue];
            let csvUser = userList.filter( item=> item.id === userId);

            newArray[i] = true;
            setState({
                ...state,
                csvList: [
                    ...state.csvList,
                    csvUser[0]
                ],
                headCheckBox: false,
                checkBoxesValue: newArray
            });
        }
    }

    function handleSelectAll(){
        if(headCheckBox){
            let value = [];
            for(let i=0; i<userList.length; i++){
                value.push(false);
            }
            setState({
                ...state,
                csvList: [],
                headCheckBox: false,
                checkBoxesValue: value
            });
        }else{
            let value = [];
            for(let i=0; i<userList.length; i++){
                value.push(true);
            }
            setState({
                ...state,
                csvList: userList,
                headCheckBox: true, 
                checkBoxesValue: value
            });
        }
    }

    const handlePageClick = (event) => {
        setItemOffset(event.selected+1);
    };

    return(
        <ContactStyleWrap className="wpwax-vm-contact-list">
            
            <div className="wpwax-vm-contact-list__top">
                <div className="wpwax-vm-contact-list__action">
                    <CSVLink className="wpwax-vm-btn wpwax-vm-btn-primary" filename={"helpgent-contact-list.csv"} data={csvList}>Export Contacts</CSVLink>
                </div>
            </div>

            <div className={loader? "wpwax-vm-contact-list__table wpwax-vm-loder-active" : "wpwax-vm-contact-list__table"}> 
                {
                    loader ? 
                    <span className="wpwax-vm-loading-spin">
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                        <span className="wpwax-vm-spin-dot"></span>
                    </span>
                    :
                    <React.Fragment>
                        <div className="wpwax-vm-table-wrap wpwax-vm-table-responsive">
                            <table className="wpwax-vm-table wpwax-vm-table-striped">
                                <thead>
                                    <tr>
                                        <th>
                                            <Checkbox
                                                id={`wpwax-vm-checkbox-head`}
                                                onChange={handleSelectAll}
                                                checked={headCheckBox}
                                            />
                                        </th>
                                        <th className="wpwax-vm-contact-name">Name</th>
                                        <th className="wpwax-vm-contact-email">Email Address</th>
                                        <th className="wpwax-vm-contact-phone">Phone Number</th>
                                        <th>User Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userList.length !== 0 ? 
                                        userList.map((user,i)=>{
                                            return(
                                                <tr key={i}>
                                                    <td>
                                                        <Checkbox
                                                            id={`wpwax-vm-${i}`}
                                                            onChange={e=>handleSelectCheckbox(e,i, user.id)}
                                                            checked={checkBoxesValue[i] ? true : false}
                                                        />
                                                    </td>
                                                    <td>{ user.name }</td>
                                                    <td><a href={`mailto:${user.email}`}> { user.email } </a></td>
                                                    <td><a href={`tel:${user.phone}`} className="wpwax-vm-phone"> { user.phone } </a></td>
                                                    <td>{ user.is_guest ? 'Guest' : 'Registered' }</td>
                                                </tr>
                                            )
                                        }) : null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            onPageChange={handlePageClick}
                            nextLabel={<ReactSVG src={angleRight} />}
                            previousLabel={<ReactSVG src={angleLeft} />}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousClassName="wpwax-vm-pagination__item"
                            previousLinkClassName="wpwax-vm-pagination__link wpwax-vm-pagination__control"
                            nextClassName="wpwax-vm-pagination__item"
                            nextLinkClassName="wpwax-vm-pagination__link wpwax-vm-pagination__control"
                            containerClassName="wpwax-vm-pagination"
                            pageClassName="wpwax-vm-pagination__item"
                            pageLinkClassName="wpwax-vm-pagination__link"
                            activeLinkClassName="wpwax-vm-pagination__active"
                            renderOnZeroPageCount={null}
                        />
                    </React.Fragment>

                }
            </div>
            
        </ContactStyleWrap>
        
    )
}

export default ContactList;