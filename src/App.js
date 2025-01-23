import React, { useState } from 'react';
import './App.css'; // Keep the custom styling

const App = () => {
  const [menuItems, setMenuItems] = useState([]);  // Empty initial state

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    quantity: 1 // Default quantity
  });

  const handleAddItem = (e) => {
    e.preventDefault();

    if (!newItem.name || isNaN(newItem.price) || isNaN(newItem.quantity)) {
      alert('Please fill in all fields correctly');
      return;
    }

    const itemToAdd = {
      id: Date.now(),
      name: newItem.name,
      price: parseFloat(newItem.price),
      quantity: newItem.quantity
    };

    setMenuItems(prevItems => [...prevItems, itemToAdd]);
    setNewItem({ name: '', price: '', quantity: 1 }); // Reset form
  };

  const handleDeleteItem = (id) => {
    setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-3xl font-bold mb-6 text-primary">Namma Rusi Unavagam Menu</h2>
      
      <table className="menu-table table table-bordered">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price (Rs)</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>Rs {item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>
                <button 
                  onClick={() => handleDeleteItem(item.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={handleAddItem} className="form-row">
        <div className="col-md-3 mb-3">
          <input
            type="text"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="number"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem(prev => ({ ...prev, quantity: e.target.value }))}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-3 mb-3">
          <button 
            type="submit" 
            className="btn btn-success w-full"
          >
            <i className="fas fa-plus-circle mr-2"></i> Add Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
