import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const ToDo = () => {
  const apiUrl = "http://localhost:3000"; 

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [toggleBut, setToggleBut] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/todos`);
      const responseData = response.data;

    if (responseData) {
      setItems(responseData);
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const addItem = async () => {
    if (!inputData) {
      alert("Enter data");
    } 

    else if (editedItem && toggleBut) {
        try {
          await axios.put(`${apiUrl}/api/todos/${editedItem._id}`, {
            name: inputData,
          });
            
          setItems(
              items.map((curElem)=>{
                  if(curElem.id === editedItem) {
                      return{ ...curElem, name:inputData };
                  }
                  return curElem;
              })
          )
  
          setEditedItem(null);
          setInputData(""); 
          setToggleBut(false);
          fetchData(); 
        } catch (error) {
          console.error("Error updating item:", error);
        }
      }

    else {
      try {
        await axios.post(`${apiUrl}/api/todos`, { name: inputData });
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }

    setInputData("");
    setToggleBut(false);
    fetchData();  
};

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/todos/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const editItem = async (item) => {

    setInputData(item.name);
    setEditedItem(item);
    setToggleBut(true);
    console.log('works');
   };


  const deleteAll = async () => {
    try {
      await axios.delete(`${apiUrl}/api/todos`);
      fetchData(); 
    } catch (error) {
      console.error("Error deleting all items:", error);
    }
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption> Add your Item here </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              className="form-control"
              placeholder="Add Item"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleBut ? (
              <i className="fa fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem._id}>
                  <h3> {curElem.name} </h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem._id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={deleteAll}
            >
              <span> CHECK LIST </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDo;
