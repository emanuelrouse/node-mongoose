import mongoose from 'mongoose';
import { Campsite } from './models/campsite.js';

const url = 'mongodb://localhost:27017/nucampsite';
// Wrapper around MongoDB connect client(adds functionality)
const connect = mongoose.connect(url, {
    // Used to stop deprication warnings
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log('Connected correctly to server');
    // Create a new document based on the mongoose model named campsite
    const newCampsite = new Campsite({
        name: 'React Lake Campground',
        description: 'test'
    });

    // Save that document that automatically saves to the campsite collection 
    newCampsite.save()
        .then(campsite => {
            console.log(campsite);
            return Campsite.find();
        })
        .then(campsites => {
            // Log React Lake Campground Document as an array
            console.log(campsites);
            // Delete all the documents created from the campsite document
            return Campsite.deleteMany({});
        })
        .then(() => {
            // Close the connection
            return mongoose.connection.close();
        })
        .catch(err => {
            // If there's an error log it
            console.log(err);
            // Close the connection after logging the error
            mongoose.connection.close();
        });
});