const mongoose = require('mongoose');

const caseTypeScheme = mongoose.Schema({
    type_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    type: {
        type: [String]
    }
})


const caseType = mongoose.model("caseType", caseTypeScheme, "caseType")
module.exports = caseType;