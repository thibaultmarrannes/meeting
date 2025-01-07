const { Client } = require("@notionhq/client");

// Initialize the Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

/**
 * Create a new page in the Notion database.
 * The name is set as the page's title (database property), and the text is added as a block.
 * @param {string} name - The name of the page.
 * @param {string} text - The text content to be added as a block.
 * @returns {Promise<Object>} - The response from the Notion API.
 */
async function createNotionPageWithName(name, text) {
  if (!name || !text) {
    throw new Error("Name and text are required");
  }

  try {
    // Step 1: Create the page with the provided name
    const page = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          title: [
            {
              text: { content: name },
            },
          ],
        },
      },
    });

    // Step 2: Add a text block to the page
    await notion.blocks.children.append({
      block_id: page.id,
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                text: { content: text },
              },
            ],
          },
        },
      ],
    });

    return page; // Return the created page object
  } catch (error) {
    console.error("Error creating Notion page with name:", error);
    throw new Error("Failed to create Notion page with name");
  }
}

module.exports = { createNotionPageWithName };