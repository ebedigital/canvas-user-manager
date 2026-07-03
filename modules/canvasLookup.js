const axios = require("axios");
const config = require("../config");

async function getCanvasUserId(sisId) {

    try {

        const response = await axios.get(

            `${config.BASE_URL}/api/v1/users/sis_user_id:${encodeURIComponent(sisId)}`,

            {
                headers: {
                    Authorization: `Bearer ${config.TOKEN}`
                }
            }

        );

        return {

            success: true,
            id: response.data.id

        };

    } catch (error) {

        return {

            success: false,
            error: error.response?.data || error.message

        };

    }

}

module.exports = {
    getCanvasUserId
};