const router = require("express").Router();
const { json } = require("express");
//import todo model
const todoItemsModel = require("../models/todoItems");

// creating first route -> adding todo items to the database

router.post(`/api/item`, async (req, res) => {
  try {
    const newItem = new todoItemsModel({
      item: req.body.item,
    });
    //save this item in database
    const saveItem = await newItem.save();
    res.status(200).json(saveItem);
  } catch (err) {
    res.json(err);
  }
});

//creating second route to get data from database

router.get(`/api/items`, async (req, res) => {
  try {
    const allTodoItems = await todoItemsModel.find({});
    res.status(200).json(allTodoItems);
    // returning all items in database in json format
  } catch (err) {
    res.json(err);
  }
});

//updating items by using their id
router.put(`/api/item/:id`, async (req, res) => {
  try {
    //find the item by its id and update it

    const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Item updated");
  } catch (err) {
    res.json(err);
  }
});

// deleting item from database

router.delete(`/api/item/:id`, async (req, res) => {
  try {
    // find the item by its id and delete

    const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Item deleted");
  } catch (err) {
    res.json(err);
  }
});

//export router
module.exports = router;
