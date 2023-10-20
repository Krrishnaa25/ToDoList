import React from 'react';
import "./style.css";
import { useState } from 'react';
import { useEffect } from 'react';

const ToDo = () => {

    const getItems = () => {
        const list = localStorage.getItem("Storage")

        if (list) {
            return JSON.parse(list);
        }

        return []
    }

    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getItems());
    const [editedList, setEditedList] = useState("");
    const [toggleBut, setToggleBut] = useState(false)

    const addItem = () => {
        if (!inputData) {
            alert("Enter data");

        }
        else if (inputData && toggleBut) {
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === editedList) {
                        return{ ...curElem, name:inputData };
                    }
                    return curElem;
                })
            )
            
            setInputData("");
            setEditedList(null);
            setToggleBut(false);
        }
        else {

            const MyNewInput = {
                id: new Date().getTime().toString(),
                name: inputData,
            }

            setItems([...items, MyNewInput]);
            setInputData("");
        }
    }

    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id !== index;
        })
        setItems(updatedItems);
    }

    const deleteAll = () => {
        return setItems([]);
    }

    const editItem = (index) => {

        const edited_list = items.find((curElem) => {
            return curElem.id === index;
        })

        setInputData(edited_list.name);
        setEditedList(index);
        setToggleBut(true);

    }

    useEffect(() => {

        localStorage.setItem("Storage", JSON.stringify(items));

    }, [items])

    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>

                        <figcaption> Add your Item here </figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text"
                            className="form-control"
                            placeholder="Add Item"
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {
                            toggleBut ? (<i className="fa fa-edit add-btn" onClick={addItem}></i>) :
                                (<i className="fa fa-plus add-btn" onClick={addItem}></i>)
                        }

                    </div>
                    <div className="showItems">
                        {
                            items.map((curElem) => {

                                return (
                                    <div className="eachItem" key={curElem.id}>
                                        <h3> {curElem.name} </h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElem.id)}></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={deleteAll}>
                            <span> CHECK LIST </span>
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ToDo
