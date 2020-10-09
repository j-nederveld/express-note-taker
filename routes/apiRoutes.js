const path = require('path')
const OUTPUT_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
// var notes = require("../db/db.json");
const fs = require('fs');

let notesArray = [];
let savedNotes = [];
module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    fs.readFile(outputPath, 'utf8',  (err, data) => {
        if (err) throw err;
        data = JSON.parse(data);
        savedNotes.push(data)
      });
  });

  app.post("/api/notes", function(req, res) {

    fs.readFile(outputPath, 'utf8',  (err, data) => {
        if (err) throw err;
        console.log(data);
        notesArray.push(JSON.parse(data));
      
    console.log(req.body);
        newNote = JSON.stringify(req.body);
        notesArray.push(newNote)

    fs.writeFile(outputPath, notesArray, function(err) {
        if (err) {
            throw err;
        } else {

        console.log("you did it");
        }
      })
    });
  });

}
