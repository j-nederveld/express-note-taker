const path = require('path')
const OUTPUT_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(OUTPUT_DIR, "db.json");
// var notes = require("../db/db.json");
const fs = require('fs');

let notesArray = [];
let savedNotes = [];
module.exports = function(app) {

  app.get("/api/notes", function(req, res) {
    savedNotes = [];
    fs.readFile(outputPath, 'utf8',  (err, data) => {
        if (err) throw err;
        data = JSON.parse(data)
        for (i = 0; i < data.length; i++){
          savedNotes.push(data[i])
        }
        console.log(savedNotes);
       });
       
   });
  

  app.post("/api/notes", function(req, res) {
    notesArray = [];
    fs.readFile(outputPath, 'utf8',  (err, data) => {
        if (err) throw err;
        // console.log(data);
        data = JSON.parse(data)
        for (i = 0; i < data.length; i++){
          notesArray.push(data[i])
        }
        notesArray.push(req.body);
        console.log(notesArray);
  
    fs.writeFile(outputPath, JSON.stringify(notesArray), function(err) {
        if (err) {
          throw err;
        } else {

        console.log("you did it");
        }
      })
    });
  });

}
