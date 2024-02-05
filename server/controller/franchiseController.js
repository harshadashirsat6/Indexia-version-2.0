const Franchise = require("../models/franchise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
/*
Sign up a new franchise.
 *
 * param {object} req - The request object.
 * param {object} res - The response object.
 * return {object} The JSON response containing the success status, message, and data.
 */
const singup = async (req, res) => {
    try {
        const findFranchise = await Franchise.findOne({
            email: req.body.email,
        });
        if (findFranchise) {
            return res.json({
                success: false,
                msg: "Franchise already exists",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newFranchise = new Franchise({
            ...req.body,
            password: hashedPassword,
        });

        await newFranchise.save();
        return res.json({
            success: true,
            msg: "Franchise created successfully",
            data: newFranchise,
        });
    } catch (err) {
        return res.json({
            success: false,
            msg: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const findFranchise = await Franchise.findOne({
            email: req.body.email,
        });
        if (!findFranchise) {
            return res.json({
                success: false,
                msg: "Franchise not found",
            });
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            findFranchise.password
        );
        if (!validPassword) {
            return res.json({
                success: false,
                msg: "Incorrect Credentials",
            });
        }
        const token = jwt.sign(
            { _id: findFranchise._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );

        await findFranchise.save();
        res.json({
            success: true,
            msg: "Login successful",
            token: token,
            data: findFranchise,
        });
    } catch (err) {
        return res.json({
            success: false,
            msg: err.message,
        });
    }
};

module.exports = {
    login, singup
}