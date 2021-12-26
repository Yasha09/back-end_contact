const { v4: uuid4 } = require('uuid');
const { validationResult } = require('express-validator');

let contactsDB = [
    {
        id: uuid4(),
        name: 'John',
        email: 'john@gmail.com',
        phone: '+37400112233',
    },
    {
        id: uuid4(),
        name: 'Pete',
        email: 'pete@gmail.com',
        phone: '+37433221100',
    },
    {
        id: uuid4(),
        name: 'Bob',
        email: 'bob@gmail.com',
        phone: '+22124f1200',
    },
];

exports.getContacts = (req, res) => {
    try {
        if (contactsDB.length > 0) {
            res.status(200).json({
                contacts: contactsDB,
                errors: [],
                successMsgs: [],
            });
        } else {
            res.status(400).send('Contacts is empty');
        }
    } catch (err) {
        return res.status(400).send({
            contacts: [],
            errors: [{ msg: 'Something went wrong' }],
            successMsgs: [],
        });
    }
};

exports.addContact = (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const { errors } = validationResult(req);
        const hasEmail = contactsDB.find((cont) => cont.email === email);
        if (errors.length > 0) {
            res.status(400).send(errors);
        } else if (hasEmail) {
            return res.status(400).send({
                contacts: [],
                errors: [{ msg: 'This Email is already exist' }],
                successMsgs: [],
            });
        } else {
            contactsDB.push({ id: uuid4(), name, email, phone });
            res.status(200).json({
                contacts: contactsDB,
                errors: [],
                successMsgs: [{ msg: 'Contact successfuly created' }],
            });
        }
    } catch (err) {
        return res.status(400).send({
            contacts: [],
            errors: [{ msg: 'Something went wrong' }],
            successMsgs: [],
        });
    }
};

exports.updateContact = (req, res) => {
    try {
        const { errors } = validationResult(req);
        if (errors.length > 0) {
            res.status(400).send(errors);
        }
        const contactIndex = contactsDB.findIndex(
            (cont) => cont.id === req.params.id
        );
        const { name, email, phone } = req.body;
        if (contactIndex === -1) {
            res.status(400).send([{ msg: 'Contact not found' }]);
        } else {
            contactsDB[contactIndex] = {
                ...contactsDB[contactIndex],
                name,
                email,
                phone,
            };
            res.status(200).json({
                contacts: contactsDB,
                errors: [],
                successMsgs: [{ msg: 'Contact successfuly updated' }],
            });
        }
    } catch (err) {
        return res.status(400).send({
            contacts: [],
            errors: [{ msg: 'Something went wrong' }],
            successMsgs: [],
        });
    }
};

exports.deleteContact = (req, res) => {
    try {
        const contactIndex = contactsDB.findIndex(
            (cont) => cont.id === req.params.id
        );
        if (contactIndex === -1) {
            res.status(400).send([{ msg: 'Contact not found' }]);
        } else {
            contactsDB = contactsDB.filter(
                (contact) => contact.id !== req.params.id
            );
            res.status(200).json({
                contacts: contactsDB,
                errors: [],
                successMsgs: [{ msg: 'Contact successfuly deleted' }],
            });
        }
    } catch (err) {
        return res.status(400).send({
            contacts: [],
            errors: [{ msg: 'Something went wrong' }],
            successMsgs: [],
        });
    }
};
