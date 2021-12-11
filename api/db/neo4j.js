require('dotenv/config')

const driver;

async function getNeo4JDataBase(){
    const neo4j = require('neo4j-driver')

    if (!driver){
      const driver = driver(process.env.DB_NEO4J_URI, 
        neo4j.auth.basic(
          process.env.DB_NEO4J_USER,
          process.env.DB_NEO4J_PASSWORD
        ));
    }
    return driver;
}

async function closeNeo4JDatabase(){
  // on application exit:
  await driver.close()
}


(async () => {
  await initNeo4J();
})();




module.exports = ;