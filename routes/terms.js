const express = require('express');
const bodyParser = require('body-parser');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { termMapper } = require('../mappers/termMapper');

const termRouter = express.Router();

termRouter.use(bodyParser.json());

termRouter.route('/')
  .all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get( async (req, res, next) => {
    console.log('Kvekk')
    const rows = await getRows();
    console.log(termMapper(rows[2]));
    res.json(termMapper(rows[2]));
  });

const getRows = async () => {
  // sheet id finner du i Google Sheets-urlen
  const SHEET_ID = process.env.SHEET_ID;
  // lag en Google Sheets representasjon
  const doc = new GoogleSpreadsheet(SHEET_ID);
  // Autentiser med nøkler du får i Googles utviklerportal
  await doc.useServiceAccountAuth({
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  });
  // last inn regnearket ditt
  await doc.loadInfo();
  // pek på første ark i Google Sheets-urlen
  const sheet = doc.sheetsByIndex[0];
  // hent radene
  const rows = await sheet.getRows();
  return rows
};

module.exports = termRouter;