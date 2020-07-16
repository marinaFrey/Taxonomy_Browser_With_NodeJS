const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var measureSchema = new Schema({
    characteristic: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});

var specimenSchema = new Schema({
    collection: {
        type: Number,
        required: true
    },
    collected_by: {
        type: String
    },
    collected_date: {
        type: String
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    altitude: {
        type: Number
    },
    measures: [measureSchema],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groups:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }]
}, {
    timestamps: true
});

const taxonomyRankSchema = new Schema({
    rank: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

const taxonomySchema = new Schema({
    scientific_name: {
        type: String,
        required: true,
        unique: true
    },
    information: {
        type: String
    },
    rank: taxonomyRankSchema,
    children: [taxonomySchema],
    specimens: [specimenSchema]
}, {
    timestamps: true
});

var Taxonomy = mongoose.model('Taxonomy', taxonomySchema);

module.exports = Dishes;