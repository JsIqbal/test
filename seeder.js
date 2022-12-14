const path = require("path");

const init = () => {
    const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));

    sequelize.query("CREATE DATABASE IF NOT EXISTS blog", (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });

    require(path.join(process.cwd(), "src/modules/admin/admin.model.js"));
    require(path.join(process.cwd(), "src/modules/service/service.model.js"));
    require(path.join(process.cwd(), "src/modules/permission/permission.model.js"));
    require(path.join(process.cwd(), "src/modules/permission/permission-service.model.js"));
    require(path.join(process.cwd(), "src/modules/permissionSet/permission-set.model.js"));
    require(path.join(process.cwd(), "src/modules/permissionSet/permission-setWithPermission.model.js"));
    require(path.join(process.cwd(), "src/modules/user/user.model.js"));

    sequelize.sync()
        .then(() => console.log("success"))
        .catch((err) => console.log(err));
};

init();