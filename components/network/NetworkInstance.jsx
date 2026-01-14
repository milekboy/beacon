import axios from "axios";

const NetworkInstance = () => {
  return axios.create({
    baseURL: "https://polymarketcrawler.onrender.com/",
  });
};

export default NetworkInstance;
