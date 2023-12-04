const { Toy } = require("../models/Toys.model");

exports.getToys = async (req, res, next) => {
    const { query } = req;
    const perPage =10;
    const skip = (query.page -1) * perPage;
    const toys = await Toy.find().skip(skip).limit(perPage).select("-__v");
    res.send(toys);
};

exports.getToysByNameOrInfo = async (req, res, next) => {
    const { query } = req;
    const perPage =10;
    const skip = (query.page -1) * perPage;
    const toys = await Toy.find({$or:[ {name: query.s}, {info: query.s}]}).skip(skip).limit(perPage).select("-__v");
    res.send(toys);
};

exports.getToysByCat = async (req, res, next) => {
    const { params, query } = req;
    const perPage =10;
    const skip = (query.page -1) * perPage;
    const toys = await Toy.find({ category: params.catname }).skip(skip).limit(perPage).populate('user_id').select("-__v");
    res.send(toys);
};


exports.postToy = async (req, res, next) => {
    const body = req.body;
    const userId = res.locals.userId;
    try {
        const newToy = new Toy(body);
        newToy.user_id = userId;
        newToy.id = newToy._id;
        await newToy.save();
        res.status(201).send(newToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.editToy = async (req, res, next) => {
    const { body, params } = req;
    const id = params.id;
    try {
        const updateToy = await Toy.updateOne({ id: id, user_id: res.locals.userId }, body);
        if (!updateToy)
            throw new Error("Not authorized to update toy")
        res.status(201).send(updateToy);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.deleteToy = async (req, res, next) => {
    const { id } = req.params;
    try {
        const toyDeleted = await Toy.findOneAndDelete({ id: id, user_id: res.locals.userId });
        if (!toyDeleted) throw new Error("Not authorized to delete toy")
        res.send(toyDeleted);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};

exports.getToysById = async (req, res, next) => {
    const { id } = req.params;
    const toy = await Toy.find({ id }).select("-__v");
    res.send(toy);
};

