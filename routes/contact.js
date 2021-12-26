const express = require('express');
const router = express.Router();
const {
    getContacts,
    addContact,
    updateContact,
    deleteContact,
} = require('../controllers/contact');
const { validateContactRequests } = require('../validators/validator');

router.get('/', getContacts);
router.post('/', validateContactRequests, addContact);
router.put('/:id', validateContactRequests, updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
