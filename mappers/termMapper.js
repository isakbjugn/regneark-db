const { GoogleSpreadsheetRow } = require("google-spreadsheet")

const termMapper = (row) => {
  return {
    _id: row._id,
    en: row.en,
    nb: row.nb,
    nn: row.nn,
    field: row.field,
    subfield: row.subfield,
    reference: row.reference,
    _added: row._added,
    _modified: row._modified,
    definition: row.definition
  }
}

const termArrayMapper = (rows) => {
  var termArray;
  for (let row in rows) {
    termArray.push(termMapper(row));
  }
  return termArray;
}

module.exports = {
  termMapper: termMapper,
  termArrayMapper: termArrayMapper
}