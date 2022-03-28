const express = require("express");
const path = require("path");
const app = express();

const frontend = path.join(`${__dirname}/../frontend`);

app.get("/", (req, res) => {
	res.sendFile(`${frontend}/index.html`);
});

app.use("/public", express.static(`${frontend}/public`));

app.listen(9000, () => {
	console.log(`http://127.0.0.1:9000`)
})