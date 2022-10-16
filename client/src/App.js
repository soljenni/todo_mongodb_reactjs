import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [itemText, setItemText] = useState("");
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [updateItemText, setUpdateItemText] = useState("");
  //add new todo item to database

  const onChange = (event) => {
    setItemText(event.target.value);
  };
  const addItem = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:5800/api/item", {
        item: itemText,
      });
      setListItems((prev) => [...prev, res.data]);
      setItemText("");
    } catch (err) {
      console.log(err);
    }
  };

  //create function to fetch all todo items from database by using useEffect hook

  useEffect(() => {
    const getItemList = async () => {
      try {
        const res = await axios.get(`http://localhost:5800/api/items`);
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemList();
  }, []);

  //delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5800/api/item/${id}`);
      const newListItem = listItems.filter((item) => item._id !== id);
      setListItems(newListItem);
    } catch (err) {
      console.log(err);
    }
  };

  //updating item

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5800/api/item/${isUpdating}`,
        { item: updateItemText }
      );

      const updatedItemIndex = listItems.findIndex(
        (item) => item._id === isUpdating
      );
      listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText("");
      setIsUpdating("");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form className="form" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Add todo items"
          onChange={onChange}
          value={itemText}
        ></input>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {listItems.map((item) => (
          <div className="todo-item">
            {isUpdating === item._id ? (
              <>
                <form className="update-form" onSubmit={(e) => updateItem(e)}>
                  <input
                    className="update-new-input"
                    type="text"
                    placeholder="New Item"
                    onChange={(e) => {
                      setUpdateItemText(e.target.value);
                    }}
                    value={updateItemText}
                  ></input>
                  <button className="update-new-btn" type="submit">
                    Update
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="item-content">{item.item}</p>
                <button
                  className="update-item"
                  onClick={() => {
                    setIsUpdating(item._id);
                  }}
                >
                  Update
                </button>
                <button
                  className="delete-item"
                  onClick={() => {
                    deleteItem(item._id);
                  }}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
