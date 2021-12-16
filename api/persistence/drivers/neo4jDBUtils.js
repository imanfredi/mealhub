require("dotenv").config();
const neo4j = require("neo4j-driver");

class Neo4JDriver {
  constructor() {
    if (!Neo4JDriver.instance) {
      this._isInitialized = false;
      Neo4JDriver.instance = this;
    }
    return Neo4JDriver.instance;
  }

  async _init() {
    try {
      this._driver = neo4j.driver(process.env.DB_NEO4J_URI);
    } catch (e) {
      // Ensures that the client will close when you finish/error
      await this.closeConnection();
    }
  }

  async closeConnection() {
    await this._driver.close();
  }

  async executeQuery(query) {
    try {
      let aux = await this._driver
        .session()
        .readTransaction((txc) => txc.run(query));
      let results = [];
      aux.records.map((record) => {
        results.push(record._fields[0].properties);
      });
      return results;
    } catch (e) {
      //FIXME loggear
      return null;
    }
  }

  async executeQueryCount(query) {
    try {
      let aux = await this._driver
        .session()
        .readTransaction((txc) => txc.run(query));
      return parseInt(aux.records[0]._fields[0].toString());
    } catch (e) {
      //FIXME: loggear
      return null;
    }
  }
}

const neo4JDriver = new Neo4JDriver();

module.exports = async () => {
  if (!neo4JDriver._isInitialized) {
    neo4JDriver._isInitialized = true;
    await neo4JDriver._init();
    Object.freeze(neo4JDriver);
  }
  return neo4JDriver;
};
