const bcrypt = require("bcryptjs");
const Joi = require("joi");
const { User } = require("../models/User.model");
const { generateToken } = require("../utils/jwt");

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.send(users);
};

exports.register = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = userJoiSchema.register.validate(body);
        if (validate.error)
            throw Error(validate.error);
        if (await checkIfUserExist(body.email)) {
            throw new Error("already in the system")
        }
        const hash = await bcrypt.hash(body.password, 10);
        body.password = hash;
        const newUser = new User(body);

        await newUser.save();

        res.status(201).send({UserName: newUser.name, Email:  newUser.email});

    } catch (error) {
        next(error);
    }

};

exports.login = async (req, res, next) => {
    const body = req.body;
    try {
        const validate = userJoiSchema.login.validate(body);
        if (validate.error)
            throw Error(validate.error);
        const user = await checkIfUserExist(body.email);

        if (!user || ! await bcrypt.compare(body.password, user.password)) {
            throw new Error("invalid email or password");
        };

        const token = generateToken(user);
        return res.status(201).send({UserName: user.name, Email:user.email, token: token});

        

    } catch (error) {
        next(error);
    }

};


const checkIfUserExist = async (email) => {
    const user = await User.findOne({ email });
    if (user) {
        return user;
    }
    return false;
};

const userJoiSchema = {
    login: Joi.object().keys({
        password: Joi.string(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid'))
    }),
    register: Joi.object().keys({
        password: Joi.string().max(10).required(),
        email: Joi.string().email({ tlds: { allow: ['com'] } }).error(() => Error('Email is not valid')),
        name: Joi.string().required()
    })
};
