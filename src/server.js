const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/pradeshBank", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to mongoDB")
})

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    accNumber: String,
    branch: String,
    mobileNumber: Number,
    availbleBalance: {
        type: Number,
        default: 0
    }
})

const Customer = mongoose.model("Customer", userSchema);

app.post("/api/signUp", async (req, res) => {
    try {
        const { username, password, accNumber, branch, mobileNumber } = req.body;
        const customer = await Customer.findOne({ username });
        if (customer){
            res.status(404).json({message:"user already exist"});
        }
        if(!customer) {
            const newCustomer = Customer({
                username, password, accNumber, branch, mobileNumber
            })
            await newCustomer.save();

            res.status(202).json({ message: "user not exist" });
            res.status(202).json({ message: "User created Succesfully" });

        }
    }
    catch (error) {
        console.error();
            res.status(500).json({ message: "user already exist"})
    }
})

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const customer = await Customer.findOne({ username });
        if (!customer) {
            res.status(402).json({ message: "Username not found" });
        }
        if (customer.password !== password) {
            res.status(402).json({
                message: "Invalid Password"
            })
        }
        res.status(200).json({
            message: "Login succesful",
            customer: {
                username: customer.username,
                accNumber: customer.accNumber,
                branch: customer.branch,
                mobileNumber: customer.mobileNumber,
                availbleBalance: customer.availbleBalance
            }
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal error"
        })
    }
})

const DepositSchema = new mongoose.Schema({
    username: String,
    accNumber: String,
    date: String,
    amount: String,
    type: String
})

const deposit = new mongoose.model("Deposit", DepositSchema)

app.post("/api/deposit", async (req, res) => {
    try {
        const { username, accNumber, date, amount, type } = req.body;
        const customer = await Customer.findOne({ username, accNumber });
        // console.log(customer.availbleBalance);
        customer.availbleBalance = Number(customer.availbleBalance) + Number(amount);
        // console.log(customer.availbleBalance);
        await customer.save()
        const newDeposit = new deposit({
            username, accNumber, date, amount, type
        })

        await newDeposit.save();
        return res.status(200).json({
            message: "Deposit Succesful",
            availbleBalance: customer.availbleBalance
        })

    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal error"
        })
    }
})

const withdrawSchema = mongoose.Schema({
    username: String,
    accNumber: Number,
    WithDrawAmount: Number,
    WithDrawType: String

})
const withdraw = mongoose.model("Withdraw", withdrawSchema)

app.post("/api/withdraw", async (req, res) => {
    try {
        const { username, accNumber, WithDrawAmount, WithDrawType } = req.body;
        // console.log(req.body);
        const customer = await Customer.findOne({ username, accNumber });
        // console.log("avalable balance",customer.availbleBalance);
        // console.log("withdrawa amount",WithDrawAmount)

        customer.availbleBalance = customer.availbleBalance - WithDrawAmount;

        console.log("after ", customer.availbleBalance)
        await customer.save();
        return res.status(200).json({
            message: "withdraw succesful",
            availbleBalance: customer.availbleBalance
        })

        const newWithdraw = withdraw({
            username, accNumber, WithDrawAmount, WithDrawType
        })
        await newWithdraw.save();
    }
    catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log("Server is running at ", PORT);
})