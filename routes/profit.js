const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const { calculateProfit } = require("../services/profitEngine");

const DATA_FILE = path.join(__dirname,"../turnover_data.json");

router.get("/", (req,res)=>{

    const jobs = JSON.parse(
        fs.readFileSync(DATA_FILE,"utf8")
    );

    const reports = jobs.map(job => calculateProfit(job));

    res.json(reports);

});

module.exports = router;
