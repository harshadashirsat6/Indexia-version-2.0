const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema({
    currentStage : {type: Number, default : 0},
    rejected : {type: Boolean, default : false},
    loanType: { type: String },
    employmentType: { type: String },
    yearlyIncome: { type: Number, default: 0 },
    monthlyIncome: { type: Number, default: 0 },
    bank: { type: String },
    companyName: { type: String },
    companyType: { type: String },
    exsitingEMI: { type: String, default: "No" },
    salaryReceivedAs: { type: String },
    loanAmount: { type: Number },
    tenure: { type: Number },

    // For car loan
    vehicleVIN: { type: String },
    manufacturingYear: { type: Date },
    carModel: { type: String },
    carManufacturer: { type: String },

    // For Business Loan
    businessNature: { type: String },
    industryType: { type: String },
    companyStartDate: { type: Date },
    companyCurrentYearTurnOverRange: { type: String },
    companyLastYearTurnOverRange: { type: String },

    // For education Loan
    fieldOfStudy: { type: String },
    universityName: { type: String },
    instituteName: { type: String },
    enrollmentStatus: { type: String },
    courseDuration: { type: String },
    educationCost: { type: String },

    // Home Loan
    houseNumber: { type: String },
    newPropertyType: { type: String },
    city: { type: String },
    locality: { type: String },
    pincode: { type: Number },

    //project
    projectDescription: { type: String },
    projectObjective: { type: String },
    scopeOfWorkandDeliverables: { type: String },
    projectBudget: { type: String },
    projectStartDate: { type: Date },
    expectedDateOfComletion: { type: Date },
    lenderdetails: {
        //in future if admin panel is added just pass reference
        bankId: { type: Number },
        bankName: { type: String },
        interestRate: { type: Number },
        emiStarting: { type: Number },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    documentsForLoan : [
        {
            docType: {
                type: String,
            },
            docURL :{
                type: String,
            }
        }
    ],


    loanApproved: { type: Boolean, default: false },
    stage1VerifiedBy : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    stage4VerifiedBy : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    stage5VerifiedBy : {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    createdAt: { type: Date, default: Date.now },
});

const LoanModel = mongoose.model("loan", LoanSchema);
module.exports = LoanModel;
