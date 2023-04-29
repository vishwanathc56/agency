const express = require('express');

const router = express.Router();
const Agency = require('../models/agency');
const { responseHandler } = require('../utils');
const Client = require('../models/client');

//CREATE (C)
// create new Agencies
router.post('/agencies', async function (req, res, next) {
    try {
        const { name, address1, address2, state, city, phoneNumber, client } = req.body
        const newAgency = new Agency({ name, address1, address2, state, city, phoneNumber, })
        const savedAgency = await newAgency.save();
        const agencyId = savedAgency._id
        // const {
        //     phoneNumber: ClientPhoneNumber,
        //     totalBill,
        //     email,
        //     clientId,
        //     name: clientName,
        // } = client
        const newClient = new Client({
            ...client, agencyId,
        })
        const savedClient = await newClient.save()
        return responseHandler(res, { agency: savedAgency, client: savedClient })
    } catch (error) {
        return next(error)
    }
});


//UPDATE
// update client
router.put('/updateClient/:clientId', async function (req, res, next) {
    const clientId = req.params.clientId
    const { name, email, phoneNumber, totalBill } = req.body;
    Client.findByIdAndUpdate(clientId, { name, email, phoneNumber, totalBill }, { new: true })
        .then(updatedClient => {
            if (!updatedClient) {
                return res.status(404).send('User not found');
            }
            return responseHandler(res, updatedClient)
        })
        .catch(next);
})


router.get("/gettopclient", async function (req, res, next) {
    try {
        const topClient = await Client.aggregate(
            [
                {
                    '$sort': {
                        'totalBill': -1
                    }
                }, {
                    '$lookup': {
                        'from': 'agencys',
                        'localField': 'agencyId',
                        'foreignField': '_id',
                        'as': 'agency'
                    }
                }, {
                    '$unwind': {
                        'path': '$agency',
                        'preserveNullAndEmptyArrays': true
                    }
                }, {
                    '$project': {
                        'name': 1,
                        'phoneNumber': 1,
                        'totalBill': 1,
                        'agencyName': '$agency.name'
                    }
                }
                , {
                    $limit: 1
                }

            ])
        return responseHandler(res, topClient)
    } catch (error) {
        next(error)
    }

})

module.exports = router;