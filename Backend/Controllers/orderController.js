const Item = require('../models/Items');
const Order = require('../models/Order');

// Utility function to calculate total cost for an array of items
let calculateTotal = async (items) => {
    let total = 0;
    for (const item of items) {
        try {
            const dbItem = await Item.findById(item.item);
            total += dbItem.price * item.quantity;
        } catch (err) {
            throw err;
        }
    }
    return total;
}

let addOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const user = req.decoded._id;
        
        // Calculate total using the utility function
        const total = await calculateTotal(items);

        // Create a new order with the calculated total
        const order = new Order({ items, total, user });

        // Save the order to the database
        await order.save();

        res.status(200).json({ "Success": true, 'Message': 'Order added successfully' });
    } catch (err) {
        res.status(400).json({ "Success": false, 'Message': 'Adding new order failed', err });
    }
}

module.exports = {
    addOrder
};
