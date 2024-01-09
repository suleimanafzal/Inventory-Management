const Item = require('../models/Items');

let addItem = (req, res) => {
    try {
        const { name, price, description, category, quantity } = req.body;
        const file = req.files.image;

        const image = Date.now() + file.name;

        file.mv(`./uploads/${image}`, function (err) {
            if (err) {
                throw err; // Propagate the error to the catch block
            }

            // Create a new item with the uploaded image
            const item = new Item({ name, price, image, description, category, quantity });

            // Save the item to the database
            item.save()
                .then(() => {
                    res.status(200).json({ "Success": true, 'Message': 'Item added successfully' });
                })
                .catch(err => {
                    res.status(400).send({ "Success": false, "Message": 'Adding new item failed', err });
                });
        });
    } catch (err) {
        res.status(400).json({ "Success": false, 'Message': 'Image upload failed', err });
    }
}

let getAllItems = (req, res) => {
    Item.find()
        .then(items => {
            res.status(200).json({ "Success": true, items });
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting items failed', err });
        });
}

let getItemById = (req, res) => {
    Item.findById(req.params.id)
        .then(item => {
            res.status(200).json({ "Success": true, item });
        })
        .catch(err => {
            res.status(400).json({ "Success": false, 'Message': 'Getting item failed', err });
        });
}

module.exports = {
    addItem,
    getAllItems,
    getItemById
}
