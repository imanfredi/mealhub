const { MongoClient } = require("mongodb");
require("dotenv").config();

class MongoDriver {
  constructor() {
    if (!MongoDriver.instance) {
      this._isInitialized = false;
      MongoDriver.instance = this;
    }
    return MongoDriver.instance;
  }

  async _init() {
    try {
      // Create a new MongoClient
      this._client = new MongoClient(process.env.DB_MONGODB_URI);

      // Connect the client to the server
      await this._client.connect();

      // Connect to db
      this._db = this._client.db(process.env.DB_MONGODB_NAME);
    } catch (e) {
      // Ensures that the client will close when you finish/error
      await this.closeConnection();
    }
  }

  async closeConnection() {
    await this._client.close();
  }



  async executeQueryAggregated(query, collection) {
    return this._db
            .collection(collection)
            .aggregate(query).toArray();
  }

}

const mongoDriver = new MongoDriver();
module.exports = async () => {
  if (!mongoDriver._isInitialized) {

    mongoDriver._isInitialized = true;
    await mongoDriver._init();

    Object.freeze(mongoDriver);
  }

  return mongoDriver;
};
