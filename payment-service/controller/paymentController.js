
const axios = require('axios')

const updatePayment = async (req, res) => {
    try {
        const payment ="Paid"
        const id = req.params.id
        const response = await axios.put(process.env.PAYMENT+id, { payment: payment })
        res.status(200).json(response.data);       
    } catch (error) {
        res.status(400).json({ error:error.message });
    }
}

module.exports={updatePayment}

