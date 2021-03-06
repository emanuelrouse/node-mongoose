import mongoose from 'mongoose';
const { Schema } = mongoose;

// Create a Subdocument
const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Create the Schema
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
}, {
    timestamps: true
});

// Convert the campsiteSchema into a model
// Generate a Model
// Desugared class because mongoose was written before ES6 Classes 
const Campsite = mongoose.model('Campsite', campsiteSchema); // returns a constructor fn
export { Campsite };
