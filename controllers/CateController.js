const Cate = require('../models/Cate');

var CateController = {
    getCates:(rep, res) => {
        return Cate.find();
    },
    addCate: (req, res) => {
    
        const {name, description, image  } = req.payload;
        const cate = new Cate({
            name, 
            description,
            image
        });

       return cate.save();
    },
    updateCate: (req , res) => {
        let option = { new: true };
        let data = {
            name: req.payload.name,
            description:  req.payload.description,
            image:  req.payload.image,
        };
        return Cate.findByIdAndUpdate(req.payload.id,data,option);        
    },
    deleleCate: (req , res) => {
        return Cate.findOneAndDelete({_id: req.payload.id});     
    },
    detailCate: (req , res) => {
        return Cate.findOne({_id: req.params.id});
    }

}

module.exports = CateController;