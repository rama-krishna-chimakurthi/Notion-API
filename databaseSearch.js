const { Client } = require("@notionhq/client");
const { CASH_FLOW_DB_ID } = require("./consts");
require("dotenv").config();

const query = process.argv[2];
if (!query) {
  console.error("Please provide a query to search for.");
  process.exit(1);
}
console.log("CASH_FLOW_DB_ID - ", CASH_FLOW_DB_ID);
const notion = new Client({
  auth: process.env.NOTION_API_TOKEN,
});

/* async function getDatabaseId() {
  const resp = await notion.search({
    query,
    filter: {
      property: "object",
      value: "database",
    },
  });
  resp.results.map((res) => {
    console.log(`Database ID: ${res.id}`);
  });
}

getDatabaseId(); */

async function getLast10Entries() {
  const resp = await notion.databases.query({
    database_id: CASH_FLOW_DB_ID,
    page_size: 10,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });
  resp.results.map((res) => {
    console.log(
      `CashFlow last 10 entries: ${res.properties["Description"].title[0].text.content}`
    );
  });
}
getLast10Entries();
