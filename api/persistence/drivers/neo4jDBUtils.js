require("dotenv").config();
const neo4j = require("neo4j-driver");


class Neo4JDriver{

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
            // this._driver = driver(process.env.DB_NEO4J_URI, 
            // neo4j.auth.basic(
            //   process.env.DB_NEO4J_USER,
            //   process.env.DB_NEO4J_PASSWORD
            // ));
          
        } catch (e) {
            // Ensures that the client will close when you finish/error
            await this.closeConnection()
        }
    }

    async closeConnection(){
        await this._driver.closeConnection();
    }

    async executeQuery(){
        return await this._driver.session().readTransaction(txc =>
            txc.run('MATCH (recipe:Recipe {name: \"cream  of spinach soup\"}) return recipe'));
    
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