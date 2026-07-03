const axios = require("axios");
const config = require("../config");

async function deleteCanvasUser(userId) {

    try {

       
        const response = await axios.delete(

            `${config.BASE_URL}/api/v1/accounts/${config.ACCOUNT_ID}/users/${userId}`,

            {
                headers: {
                    Authorization: `Bearer ${config.TOKEN}`
                }
            }

        );

        return {
            success: true,
            data: response.data
        };

    } catch (error) {

        
        return {
            success: false,
            error: error.response?.data || error.message
        };

    }

}

module.exports = {
    deleteCanvasUser
};