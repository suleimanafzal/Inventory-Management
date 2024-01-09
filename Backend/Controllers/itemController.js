const Item = require('../models/Items');


let addItem = (req, res) => {
    let { name, price, description, category, quantity } = req.body;
    console.log(req.body);
    let file = req.files.image;
    console.log(file);
    let image = Date.now() + file.name;
    file.mv('./uploads/' + image, function (err) {
        if (err) {
            res.status(400).json({"Success":false, 'Message': 'image upload failed' });
        }
    });
    let item = new Item({ name, price,image, description, category, quantity });


    item.save()
        .then(item => {
            res.status(200).json({ "Success":true,'Message': 'item added successfully' });
        })
        .catch(err => {
            res.status(400).send({"Success":false,"Message":'adding new item failed' , err});
        });
}

let getAllItems = (req, res) => {
    Item.find()
        .then(items => {
            res.status(200).json({"Success":true,items});
        })
        .catch(err => {
            res.status(400).json({"Success":false, 'Message': 'getting items failed' });
        }
        );
}

let getItemById = (req, res) => {

    Item.findById(req.params.id)
        .then(item => {
            res.status(200).json({"Success":true,item});
        }
        )
        .catch(err => {
            res.status(400).json({"Success":false, 'Message': 'getting item failed' });
        }
        );
}


module.exports = {
    addItem,
    getAllItems,
    getItemById
}
