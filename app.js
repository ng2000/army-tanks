const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const { google } = require("googleapis")

var bodyParser = require('body-parser')

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files 
app.use(express.urlencoded({ extended: true })) //To extract the data from the website to the app.js file
app.use(bodyParser.json());

const xlsx = require('xlsx');
const fs = require('fs');
app.post("/apply", async (req, res) => {
  console.log("res = " + JSON.stringify(req.body));
  if (!req.body.name || !req.body.companyEmail || !req.body.linkedinUrl || !req.body.contactNumber || !req.body.yourHRIS) {
    res.status(400).send();
  } else {
    try {
      const { name, companyEmail, linkedinUrl, contactNumber, yourHRIS } = req.body;
      console.log("Form data submitted is " + JSON.stringify(req.body));

      const workbookPath = 'data.xlsx'; // Path to your local Excel file

      let workbook;
      if (fs.existsSync(workbookPath)) {
        workbook = xlsx.readFile(workbookPath);
      } else {
        workbook = xlsx.utils.book_new();
      }

      // Select the first worksheet or create a new one if it doesn't exist
      const worksheetName = workbook.SheetNames[0] || 'Sheet1';
      let worksheet = workbook.Sheets[worksheetName];
      if (!worksheet) {
        worksheet = xlsx.utils.aoa_to_sheet([['Name', 'Company Email', 'LinkedIn URL', 'Contact Number', 'Your HRIS']]);
        workbook.SheetNames.push(worksheetName);
        workbook.Sheets[worksheetName] = worksheet;
      }

      // Append new row with form data
      const newRow = [name, companyEmail, linkedinUrl, contactNumber, yourHRIS];
      const range = worksheet['!ref'] ? xlsx.utils.decode_range(worksheet['!ref']) : { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
      const newRowRef = range.e.r + 1;
      for (let i = 0; i < newRow.length; i++) {
        const cellRef = xlsx.utils.encode_cell({ r: newRowRef, c: i });
        worksheet[cellRef] = { v: newRow[i] };
        worksheet[cellRef].t = 's';
      }
      worksheet['!ref'] = xlsx.utils.encode_range({ s: { c: 0, r: 0 }, e: { c: range.e.c, r: range.e.r + 1 } });

      // Write the updated workbook back to file
      xlsx.writeFile(workbook, workbookPath);

      res.status(200).send();
    } catch (e) {
      console.log("Error in Submitting Form data is " + e);
      res.status(500).send();
    }
  }
});


app.use(express.static(path.join(__dirname, "./Frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./Frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

//listening on specified Port
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
