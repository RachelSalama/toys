const jwt = require("jsonwebtoken");

exports.generateToken = (payload) =>{
    try{
        const token = jwt.sign({...payload}, '123@@', { expiresIn: '20h'});
        return token;
    } catch (error) {
        throw Error (error.message);
    }
};

exports.decodeToken = (token) =>{
    try{
        const payload = jwt.verify(token, '123@@');
        return payload;
    } catch (error) {
        throw Error (error.message);
    }
};