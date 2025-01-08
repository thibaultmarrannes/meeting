const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { createNotionPageWithName } = require("./integrations/notion");
const { Client } = require("@notionhq/client");
const Sendgrid = require("./integrations/mail");

const app = express();
const port = process.env.LOCAL_PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs'); // Set EJS as the template engine
app.set('views', './views/'); // Set the views directory
app.set('layout', 'layout'); // Set the default layout file (relative to the 'views' directory)
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" directory



app.get('/', async (req, res) => {
  const trelloBoards = JSON.parse(process.env.Trello_boards);
  res.render('index', { title: 'New meeting', trelloBoards });
});


app.use(express.json()); // Middleware to parse JSON request bodies

app.post("/submit", async (req, res) => {
  try {
    const formData = req.body;

    if (!formData || !formData["ticket"] || !formData["board"]) {
      return res.status(400).json({
        message: "Textbox and Dropdown data are required",
        success: false,
      });
    }

    const textboxes = formData["ticket"];
    const dropdowns = formData["board"];

    // Ensure textboxes and dropdowns arrays have the same length
    if (textboxes.length !== dropdowns.length) {
      return res.status(400).json({
        message: "Mismatch between textboxes and dropdowns count",
        success: false,
      });
    }

    // Iterate over textboxes and dropdowns and trigger the sendTest function
    const results = await Promise.all(
      textboxes.map((textboxValue, index) => {
        const dropdownValue = dropdowns[index];
        return Sendgrid.sendTest(dropdownValue, textboxValue); // Pass the recipient and message
      })
    );

    console.log("Emails sent successfully:", results);

    const meetingTitle = formData["meetingTitle"][0];
    const meetingNotes = formData["meetingNotes"][0];

    try {
      console.log("Attempting to create a Notion page with static data...");
      const response = await createNotionPageWithName(meetingTitle, meetingNotes);
      console.log("Notion page created successfully:", response);
    } catch (error) {
      console.error("Failed to create Notion page:", error.message);
    }

    // Send a success response
    res.status(200).json({
      message: "Emails sent successfully",
      success: true,
      results,
    });
  } catch (error) {
    console.error("Error processing form data:", error.message);
    res.status(500).json({
      message: "An error occurred while processing the form data",
      success: false,
      error: error.message,
    });
  }

  
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});



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