const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { createNotionPageWithName } = require("./integrations/notion");
const { Client } = require("@notionhq/client");

const app = express();
const port = process.env.LOCAL_PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views'); // Set the views directory
app.set('layout', 'layout'); // Set the default layout file (relative to the 'views' directory)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory


// Static dummy data for the Notion page
const dummyTitle = "Static Dummy Title";
const dummyText = "This is some static dummy content.";

// Function to create a Notion page on server start
async function createPageOnStart() {
  try {
    console.log("Attempting to create a Notion page with static data...");
    const response = await createNotionPageWithName(dummyTitle, dummyText);
    console.log("Notion page created successfully:", response);
  } catch (error) {
    console.error("Failed to create Notion page:", error.message);
  }
}




app.get('/', async (req, res) => {
   
res.send('This site works lol');

});


// Start server
app.listen(port,async () => {
  console.log(`Server running at http://localhost:${port}`);
  // this a test
});