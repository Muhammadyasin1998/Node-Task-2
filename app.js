const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

// I/want/title/google.com/

const addressRoute = require('./routes/address');

app.use(addressRoute);

app.get("*", function (request, response) {
	response.status(404).send('Not found');
});




app.listen(port, () => console.log(`This app listening on port ${port}`));
