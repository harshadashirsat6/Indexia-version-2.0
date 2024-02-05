const loan = require("../models/loan");
const loan = async (req, res) => {
    try {
        const id = req.accountId;
        const loanData = new loan({
            ...req.body,
            user: id,
            currentStage: 1,
        });
        await loanData.save();
        return res.json({
            success: true,
            msg: "Loan created successfully",
            data: loanData,
        });
    } catch (err) {
        return res.json({
            success: false,
            msg: err.message,
        });
    }
};

// send isDetailsCorrect as true or false
// Approve a loan for second stage
const approvalForDoc = async (req, res) => {
    try {
        const loanId = req.body.loanId;
        const loanData = await loan.findById(loanId);
        if (isDetailsCorrect === true) {
            loanData.currentStage = 2;
            loanData.stage1VerifiedBy = req.accountId;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Loan approved successfully",
                data: loanData,
            });
        } else {
            loanData.currentStage = 0;
            loanData.rejected = true;
            loanData.stage1VerifiedBy = req.accountId;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Loan rejected successfully",
                data: loanData,
            });
        }
    } catch (err) {
        return res.json({
            success: false,
            msg: err.message,
        });
    }
};

// Upload Document By User
// Loan doc should defined by client
const uploadLoanDoc = async (req, res) => {
    try {
        const loanId = req.body.loanId;
        const loanData = await loan.findByIdAndUpdate(
            loanId,
            {
                documentsForLoan: req.body.documentsForLoan,
                currentStage: 3,
            },
            {
                new: true,
            }
        );
        return res.json({
            success: true,
            msg: "Document uploaded successfully",
            data: loanData,
        });
    } catch (err) {
        return res.json({
            success: false,
            msg: err.message,
        });
    }
};

// doucument verification
// send isDocCorrect in req.body
const documentVerification = async (req, res) => {
    try {
        const loanId = req.body.loanId;
        const loanData = await loan.findById(loanId);
        if (isDocCorrect === true) {
            loanData.currentStage = 4;
            loanData.stage4VerifiedBy = req.accountId;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Document verified successfully",
                data: loanData,
            });
        } else {
            loanData.rejected = true;
            loanData.stage4VerifiedBy = req.accountId;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Document rejected successfully",
                data: loanData,
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            msg: error.message,
        });
    }
};

const loanSactioned = async (req, res) => {
    try {
        const loanId = req.body.loanId;
        const loanData = await loan.findById(loanId);
        if (req.body.isLoanSactioned === true) {
            loanData.currentStage = 5;
            loanData.stage5VerifiedBy = req.accountId;
            loanData.loanApproved = true;
            loanData.lenderdetails = req.body.lenderdetails;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Loan sactioned successfully",
                data: loanData,
            });
        } else {
            loanData.rejected = true;
            loanData.stage5VerifiedBy = req.accountId;
            await loanData.save();
            return res.json({
                success: true,
                msg: "Loan rejected successfully",
                data: loanData,
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            msg: error.message,
        });
    }
};

module.exports = {
    loan,
};
