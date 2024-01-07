const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const dbPath = path.join(__dirname, "notes.db");

let db = null;

const port = process.env.PORT || 3001;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(port, () => {
      console.log("Server Running at http://localhost:3001/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

//Retrieve all notes.
app.get("/notes/", async (request, response) => {
  const getNotesQuery = `
    SELECT
      *
    FROM
      list
    ORDER BY
      no;`;
  const notesArray = await db.all(getNotesQuery);
  response.send(notesArray);
});

//Retrieve a note by its ID.  
app.get("/notes/:no/", async (request, response) => {
const { no } = request.params;
const getNotesQuery = `
  SELECT
    *
  FROM
    list
  WHERE
    no = ${no};`;
const note = await db.get(getNotesQuery);
response.send(note);
});  

//Delete a note by its ID.
app.delete("/notes/:no/", async (request, response) => {
  const { no } = request.params;
  const deleteNoteQuery = `
    DELETE FROM
      list
    WHERE
      no = ${no};`;
  await db.run(deleteNoteQuery);
  response.send("Note Deleted Successfully");
});

//Create a new note.  
app.post("/notes/", async (request, response) => {
const bookDetails = request.body;
const { no, title, content}=bookDetails
const addBookQuery = `
  INSERT INTO
    list (no, title ,content)
  VALUES
    (
      '${no}',
      '${title}',
      '${content}'
    );`;
    const dbResponse=await db.run(addBookQuery);
    response.send("Added");
});

//Update a note by its ID.
app.put("/notes/:no", async (request,response)=>{
const { no } = request.params;
const bookDetails = request.body;
const {
  title,
  content,
} = bookDetails;
const updateBookQuery = `
  UPDATE
    list
  SET
    title='${title}',
    content='${content}'
  WHERE
    no = ${no};`;
  await db.run(updateBookQuery);  
  response.send("success");
});
