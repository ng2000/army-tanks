const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const multer = require('multer');

app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // To extract the data from the website to the app.js file
app.use(bodyParser.json());

app.post("/apply", async (req, res) => {
  console.log("res = " + JSON.stringify(req.body));
  const fieldMap = {
    sno: 'SNO',
    unit: 'Unit',
    typeOfEquipment: 'Type of Eqpt',
    issueType: 'Issue Type',
    baNo: 'BA No',
    chassisNo: 'Chassis No',
    engineOrgOH: 'Engine Org/OH',
    engKm: 'Eng Km',
    engHrs: 'Eng Hrs',
    chassisKm: 'Chassis Km',
    chassisHrs: 'Chassis Hrs',
    tmIDone: 'TM I Done',
    tmIDue: 'TM I Due',
    tmIIDone: 'TM II Done',
    tmIIDue: 'TM II Due',
    // mrIDueDt: 'MR-I Due Dt',
    // mrIDoneDt: 'MR-I Done Dt',
    // ohIDueDt: 'OH-I Due Dt',
    // ohIDoneDt: 'OH-I Done Dt',
    // mrIIDue: 'MR II Due',
    // mrIIDone: 'MR II Done',
    // ohIIDue: 'OH II Due',
    // ohIIDone: 'OH II Done',
    serR2EOAVOR: 'SER/R2/EOA/VOR',
    assy: 'Assy',
    section: 'Section',
    natureOfDefect: 'Nature of Defect',
    demandPlacedTo: 'Demand Placed To',
    demandNoDt: 'Demand No & Dt',
    contNoDt: 'Cont No & Dt',
    workOrderNoDate: 'Work Order No & Dt',
    fwdTo: 'Fwd To',
    since: 'Since',
    presentStatus: 'Present Status',
    underRepairTime: 'Under Repair Time',
    efcRDSFired: 'EFC/RDS Fired',
    chamberElongation: 'Chamber Elongation',
    bore: 'Bore',
    // gunPullBackDoneDate: 'Gun Pull Back Done Date',
    siDetails: 'SI Details',
    fumeExtractor: 'Fume Extractor',
    // n2PurgingDueDate: 'N2 Purging Due Date',
    // n2PurgingCarriedOut: 'N2 Purging Carried Out',
    getterActivationDoneDate: 'Getter Activation Done Date (Check Every 3 Months)',
    //NEW
    bde: "BDE",
    div: "DIV/(I) BDE",
    corps: "CORPS",
    yoi: "Year of Induction",
    eqptStatus: "EQPT STATUS",
    mrDueDt: 'MR Due Dt',
    mrCarriedOut: 'MR Carried Out',
    mrRemarks: 'MR Remarks',
    typeOfMR: "Type Of MR",
    ohDueDt: 'OH Due Dt',
    ohCarriedOut: 'OH Carried Out',
    ohRemarks: 'OH Remarks',
    typeOfOH: "Type Of OH",
    engRegNo: "ENG REG NO",
    engDateOfChange: "Engine Date Of Change",
    btyDtOfIssue: "BTY DT OF ISSUE",
    btyExpOn: "BTY EXP On",
    muaNomenclature: "MUA Nomenclature",
    muaDtOfFittment: "MUA Date Of Fittment",
    muaRemarks: "MUA Remarks",
    tsNomenclature: "THERMAL SIGHT Nomenclature",
    tsRegdNo: "THERMAL SIGHT Regd No",
    tsDtOfIssue: "THERMAL Date of Issue",
    tsEqptStatus: "THERMAL EQPT STATUS",
    n2PurgingDueDate: 'N2 Purging Due Date',
    n2PurgingCarriedOut: 'N2 Purging Carried Out',
    n2PurgingRemarks: 'N2 Purging Remarks',
    gaDueDate: 'GA Due Date',
    gaPurgingCarriedOut: 'GA Carried Out',
    gaPurgingRemarks: 'GA Remarks',
    tcmIDetails: 'TCM I RS CNR 900 M DETAILS(5W,20W,50W)',
    tcmIRegdNo: 'TCM I REGD No',
    tcmIDtOfIssue: 'TCM I Dt Of Issue',
    tcmIWarrantyPeriod: 'TCM I Warranty Period',
    tcmIEqptStatus: 'TCM I Eqpt Status',
    tcmIFISTestingDueOn: 'TCM I FIS Testing Due On',
    tcmIDtOfIssue: 'TCM I Dt Of Issue',
    tcmIIDetails: 'TCM II GPS 9312 A',
    tcmIIRegdNo: 'TCM II REGD No',
    tcmIIDtOfIssue: 'TCM II Dt Of Issue',
    tcmIIWarrantyPeriod: 'TCM II Warranty Period',
    tcmIIEqptStatus: 'TCM II Eqpt Status',
    tcmIIFISTestingDueOn: 'TCM II FIS Testing Due On',
    tcmIIDtOfIssue: 'TCM II Dt Of Issue',
    tcmIIIDetails: 'TCM III DCH',
    tcmIIIRegdNo: 'TCM III REGD No',
    tcmIIIDtOfIssue: 'TCM III Dt Of Issue',
    tcmIIIWarrantyPeriod: 'TCM III Warranty Period',
    tcmIIIEqptStatus: 'TCM III Eqpt Status',
    tcmIIIFISTestingDueOn: 'TCM III FIS Testing Due On',
    tcmIIIDtOfIssue: 'TCM III Dt Of Issue',
    // New fields added below with 'armt' prefix
    armtBrlRegdNo: 'ARMT BRL REGD NO',
    armtRecoilBufferRegdNo: 'ARMT RECOIL BUFFER REGD NO',
    armtRecuperatorRegdNo: 'ARMT RECUPERATOR REGD NO',
    armtBreechBlockRegdNo: 'ARMT BREECH BLOCK REGD NO',
    armtBreechRingRegdNo: 'ARMT BREECH RING REGD NO',
    armtBrlStatus: 'ARMT BRL STATUS',
    armtTotalEfcsFired: 'ARMT TOTAL EFCS FIRED',
    armtTotalRoundFire: 'ARMT TOTAL ROUND FIRE',
    armtDtOfSeriesExam: 'ARMT DT OF SERIES EXAM',
    armtQuarterOfLife: 'ARMT QUARTER OF LIFE',
    armtWearVerticle: 'ARMT WEAR VERTICLE',
    armtBoreCondition: 'ARMT BORE CONDITION',
    armtChamberCondition: 'ARMT CHAMBER CONDITION',
    armtFumeExtractorCondition: 'ARMT FUME EXTRACTOR CONDITION',
    armtDateOfLastInsp: 'ARMT DATE OF LAST INSP',
    recoilSysSIDOne: 'SI DONE', recoilSysSIDue: 'SI DUE', recoilSysRemarks: 'REMARKS',
    armtFiredTypeOfAmnFired: 'TYPE OF AMN FIRED - Type of AMN',
    armtFiredRoundFired: 'TYPE OF AMN FIRED - ROUND FIRED',
    armtFiredRemarks: 'TYPE OF AMN FIRED - REMARKS',
    gunPullBackDoneDate: 'Gun Pull Back Done Date',
    gunPullBackDueDate: 'Gun Pull Back Due Date',
    gunPullBackRemarks: 'Gun Pull Back Remarks',
  };
  const listOfValues = Object.values(fieldMap);
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
    console.log("datavalues " + dataValues);

    // Select the first worksheet or create a new one if it doesn't exist
    const worksheetName = workbook.SheetNames[0] || 'Sheet1';
    let worksheet = workbook.Sheets[worksheetName];
    if (!worksheet) {
      worksheet = xlsx.utils.aoa_to_sheet([listOfValues]);
      workbook.SheetNames.push(worksheetName);
      workbook.Sheets[worksheetName] = worksheet;
    }

    // Append new row with form data
    const range = worksheet['!ref'] ? xlsx.utils.decode_range(worksheet['!ref']) : { s: { c: 0, r: 0 }, e: { c: 0, r: 0 } };
    const newRowRef = range.e.r + 1;
    console.log("newRowRef", newRowRef);
    console.log("dataValues.length ", dataValues.length);
    const cellRef = xlsx.utils.encode_cell({ r: newRowRef, c: 0 });
    worksheet[cellRef] = { v: newRowRef.toString() };
    worksheet[cellRef].t = 's';
    for (let i = 0; i <= dataValues.length; i++) {
      const cellRef = xlsx.utils.encode_cell({ r: newRowRef, c: i + 1 });
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

function excelToJson(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  return jsonData;
}

app.get("/allData", function (_, res) {
  const filePath = 'data.xlsx';
  const jsonData = excelToJson(filePath);
  res.json(jsonData); // Send the JSON data as response
});

// Endpoint to download a file
app.get('/download', (req, res) => {
  const filePath = 'data.xlsx';

  if (!filePath) {
    return res.status(400).send('File path is missing.');
  }

  const resolvedPath = path.resolve(__dirname, filePath);

  // Check if the file exists
  if (!fs.existsSync(resolvedPath)) {
    return res.status(404).send('File not found.');
  }

  // Set the proper content type for the response
  res.setHeader('Content-disposition', 'attachment; filename=' + path.basename(resolvedPath));
  res.setHeader('Content-type', 'application/octet-stream');

  // Create a read stream from the file and pipe it to the response
  const fileStream = fs.createReadStream(resolvedPath);
  fileStream.pipe(res);
});

// Configure Multer for file upload
const upload = multer({
  dest: 'uploads/' // Destination directory for uploaded files
});

// Endpoint to upload a file
app.post('/upload', upload.single('file'), (req, res) => {
  const uploadedFile = req.file;
  const destinationPath = __dirname; // Path where the file should be uploaded

  if (!destinationPath) {
    // If destination path is not provided
    fs.unlinkSync(uploadedFile.path); // Remove the uploaded file
    return res.status(400).send('Destination path is missing.');
  }

  // Resolve destination path
  const resolvedPath = path.resolve(destinationPath);

  // Check if the file already exists at the destination path
  if (fs.existsSync(path.join(resolvedPath, 'data.xlsx'))) {
    // If file already exists, change the name of the existing file
    const timestamp = Date.now();
    const newName = `${path.parse('data.xlsx').name}_${timestamp}${path.extname(uploadedFile.originalname)}`;

    // Rename the existing file
    fs.renameSync(path.join(resolvedPath, 'data.xlsx'), path.join(resolvedPath, newName));
    // Move the uploaded file to the destination with its original name
    fs.renameSync(uploadedFile.path, path.join(resolvedPath, 'data.xlsx'));

    return res.status(200).send(`File renamed and uploaded successfully as ${'data.xlsx'}`);
  }

  // If file doesn't exist at the destination path, move the uploaded file to the destination
  fs.renameSync(uploadedFile.path, path.join(resolvedPath, 'data.xlsx'));
  res.status(200).send('File uploaded successfully.');
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