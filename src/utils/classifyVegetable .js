const axios = require('axios');

const classifyVegetable = async (imagePath) => {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');

    const response = await axios({
        method: 'POST',
        url: 'https://detect.roboflow.com/image_veg/1', // replace with actual
        params: {
            api_key: process.env.ROBOFLOW_API_KEY,
        },
        data: base64,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const predictions = response.data?.predictions;
    return predictions?.length > 0 ? predictions[0].class : 'Unknown';
};
