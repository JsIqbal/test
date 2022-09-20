const User = require("./user.model");

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        res.status(200).send(users);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const [ user, created ] = await User.findOrCreate({
            where: { email },
            defaults: { name, email, password }
        });

        if(!created) return res.status(409).send("User is already created.");

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, password } = req.body;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(409).send("User was not found!");

        if (name) await user.update({ name });
        
        if (password) await user.update({ password });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ where: { id } });

        if (!user) return res.status(409).send("User was not found!");

        await User.destroy({ where: { id } });

        return res.status(201).send(user);
    } catch (err) {
        console.log(err);

        res.status(500).send("Internal server error.")
    };
};

module.exports.getUsers = getUsers;
module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;