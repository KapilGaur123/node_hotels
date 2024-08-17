const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const persomeSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    address: {
        type: String,
        require: true,
    },
    salary: {
        type: Number,
        require: true
    },
    username: {
        require: true,
        type: String
    },
    password: {
        require: true,
        type: String
    }
});

persomeSchema.pre('save', async function (next) {
    const person = this;
    //if password is not modified then we not authenticate
    if (person.isModified('password')) return next();

    try {
        // hash password genrete
        const salt = await bcrypt.genSalt(10);
        //hash password
        const hassPassword = bcrypt.hash(person.password, salt);
        //override the plain password with salted password
        person.password = hassPassword;

        next();
    }
    catch (err) {
        return next();
    }
})

persomeSchema.method.comparePassword = async function (condidatePassword) {
    try {
        //use bcrypt to compare
        const isMatch = await bcrypt.compare(condidatePassword, this.password);
        return isMatch;
    }
    catch (err) {
        throw err;
    }
}

const person = mongoose.model('person', persomeSchema);
module.exports = person;