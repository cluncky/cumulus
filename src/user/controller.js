const ns = '[user][controller]';
const { UserModel } = require('./model');

const GetUser = async (req, res, next)  =>  {
    const fn = `${ns}[GetUser]`;
    const userId = req.params.id;

    const user = await UserModel.select({
        id: userId
    });

    res.json({data: user});
};

const GetUsers = async (req, res, next)  =>  {
    const fn = `${ns}[GetUsers]`;

    const users = await UserModel.select();

    res.json({data: users});
};

const UpdateUser = async (req, res, next)  =>  {
    const fn = `${ns}[UpdateUser]`;
    const userId = req.params.id;

    const updatedUser = await UserModel.update({
        id: userId
    }, {
        name: req.body.name,
        lng: req.body.lng,
        lat: req.body.lat
    });

    res.json({data: updatedUser});
};

const CreateUser = async (req, res, next)  =>  {
    const fn = `${ns}[CreateUser]`;

    console.log(fn, 'body:', req.body);

    const user = await UserModel.insert({
        name: req.body.name,
        lng: req.body.lng,
        lat: req.body.lat
    });

    console.log(fn, 'user:', user);

    res.json({data: user});
};

const DeleteUser = async (req, res, next)  =>  {
    const fn = `${ns}[DeleteUser]`;
    const userId = req.params.id;

    await UserModel.delete({
        id: userId
    });

    res.json({deleted: true});
};

module.exports = {
    GetUser,
    GetUsers,
    UpdateUser,
    CreateUser,
    DeleteUser
};