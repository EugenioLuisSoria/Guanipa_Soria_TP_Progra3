const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/productos"));
    },
    filename: function (req, file, cb) {
        let imageName = `prodImg-${Date.now()}${path.extname(file.originalname)}`;

        cb(null, imageName);
    },
});

//const upload = multer(/* { dest: "Raquetapp/public/uploads/" } */);
const upload = multer({ storage });
module.exports = upload;
