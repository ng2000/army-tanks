const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');

app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // To extract the data from the website to the app.js file
app.use(bodyParser.json());


app.post("/apply", async (req, res) => {
  console.log("res = " + JSON.stringify(req.body));

    try {
      const workbookPath = 'data.xlsx'; // Path to your local Excel file

      let workbook;
      if (fs.existsSync(workbookPath)) {
        workbook = xlsx.readFile(workbookPath);
      } else {
        workbook = xlsx.utils.book_new();
      }

      const resKeys = Object.keys(req.body);

      const dataValues = resKeys.map(key => req.body[key]);
      console.log("datavalues "+dataValues);

      // Select the first worksheet or create a new one if it doesn't exist
      const worksheetName = workbook.SheetNames[0] || 'Sheet1';
      let worksheet = workbook.Sheets[worksheetName];
      if (!worksheet) {
        worksheet = xlsx.utils.aoa_to_sheet([resKeys]);
        workbook.SheetNames.push(worksheetName);
        workbook.Sheets[worksheetName] = worksheet;
      }

      // Append new row with form data
      const range = worksheet['!ref'] ? xlsx.utils.decode_range(worksheet['!ref']) : { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
      const newRowRef = range.e.r + 1;
      console.log("dataValues.length ",dataValues.length);
      for (let i = 0; i < dataValues.length; i++) {
        const cellRef = xlsx.utils.encode_cell({ r: newRowRef, c: i });
        worksheet[cellRef] = { v: dataValues[i] };
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

// listening on specified Port
app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});