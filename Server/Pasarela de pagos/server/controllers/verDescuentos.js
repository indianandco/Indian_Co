const Airtable = require("airtable");
const base = new Airtable({ apiKey: 'patKyJqwMo6UN1kny.7961e8aeea5ca5f0f08f29ad63d7ca9e376ea8ee5e15c4458e20a18e5e2c7350' }).base("app200SOPVTlaXvVO");

const verDescuentos = async (req, res) => {
  try {
    const records = await base("tblE76iOHeubYslKE")
      .select({ filterByFormula: "active = 1" })
      .all();
    const data = records.map((record) => record.fields);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = verDescuentos;