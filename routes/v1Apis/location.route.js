/**
 * Writing the beamed location by every watch every 2 minutes to Database should not be done by calling an API.
 *
 * SOLUTION:
 * Embed Google Cloud IoT core to receive the beamed data, publish using PubSub, trigger Cloud Function/Lambda
 * in the same VPC the DB instance is.
 * NOTE: Use private IP of the DB instance to connect to the DB from the GCF/Lambda While Saving the Location
 * Fetch the geoFence property, calculate if it's more than allowed geoFense using the haversine and
 * trigger mail if it breaches the geoFense
 */

const express = require('express');
const router = express.Router();

// APIs here would be
// router.post('/', getLocationsByWatchId);


module.exports = router;
