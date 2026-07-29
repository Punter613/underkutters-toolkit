const express = require('express');
const backupRoutes=require("./routes/backup");
const photosFinal=require("./routes/photos-final");
const signatureRoutes=require("./routes/signature");
const invoiceFinal=require("./routes/invoice-final");
const dashboardFinal=require("./routes/dashboard-final");
const pdfEstimateRoutes=require('./routes/pdf-estimate');

const materialRoutes = require("./routes/materials");
const invoiceRoutes = require("./routes/invoice");


const fs = require('fs');
const path = require('path');

const jobTools = require("./routes/job-tools");
const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'turnover_data.json');
const photoRoutes=require("./routes/photos");
const reportRoutes=require("./routes/reports");
const jobDetailRoutes=require("./routes/job-detail");
const estimateRoutes=require("./routes/estimate");


app.use("/api/estimate",estimateRoutes);
app.use("/api/job",jobDetailRoutes);
app.use("/api/reports",reportRoutes);
app.use("/api/photos",photoRoutes);
app.use(express.json());
app.use('/api/job-tools',jobTools);
app.use("/api/materials", materialRoutes);
app.use("/api/invoice", invoiceRoutes);


app.use("/api/dashboard-final",dashboardFinal);
app.use("/api/invoice-final",invoiceFinal);
app.use("/api/signature",signatureRoutes);
app.use("/api/photos-final",photosFinal);
app.use("/api/backup",backupRoutes);

app.use(express.static("public"));
app.use('/api/jobs', require('./routes/jobs'));
const estimate = require("./routes/estimate");
const reports = require("./routes/reports");
// Create default data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    const defaultData = {
        estimator: [
            { task: 'Paint Living Room', cost: 150, status: 'Pending' }
        ],
        checklist: {
            kitchen: false,
            bathroom: false,
            hvac: false
        }
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(defaultData, null, 2));
}

// Get saved data
app.get('/api/data', (req, res) => {
    const data = fs.readFileSync(DATA_FILE);
    res.json(JSON.parse(data));
});

// Save updated data
app.post('/api/data', (req, res) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`[Underkutters Inc] Toolkit running at http://localhost:${PORT}`);
});



app.use("/api/pdf-estimate",pdfEstimateRoutes);
