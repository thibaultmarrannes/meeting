const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = process.env.LOCAL_PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory
app.set('layout', 'layout'); // Set the default layout file (relative to the 'views' directory)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory



app.get('/', async (req, res) => {
   
res.send('This site works');

});


// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  // this a test
});