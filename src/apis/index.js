import axios from 'axios';

const base_url = "http://ec2-43-207-165-198.ap-northeast-1.compute.amazonaws.com/";

export const getData = async () => {
    let response = await axios.get(base_url + "ambassadorsData");
    console.log(response.data.data)
    return response.data.data;
}

export const collectPayemnt = async (ambassador_id, amount) => {
    let response = await axios.put(base_url + "collectPayment", {ambassador_id, amount});
    console.log(response.data.data)
    return response.data.data;
}