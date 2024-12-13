const mongoose = require('mongoose');

async function checkCollection(collectionName) {
  try {
    // Get the list of collections in the current database
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(collections)

    // Check if the collection is in the list of collections
    //const collectionExists = collections.some((collection) => collection.name === collectionName);

 /*    if (collectionExists) {
      console.log(`Collection "${collectionName}" exists.`);
    } else {
      console.log(`Collection "${collectionName}" does not exist.`);
    } */
  } catch (error) {
    console.error('Error checking collection existence:', error);
  }
}

// Example usage:
module.exports=checkCollection;
