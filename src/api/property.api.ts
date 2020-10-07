import Axios from "axios";
import cookies from "js-cookie";
import type Property from "../models/PropertyModel";

const api = "https://moon-back.herokuapp.com";
const headers = {
  headers: {
    "moon-auth": cookies.get("auth"),
  },
};

const getProperties = async () => {
  try {
    let resp = (await Axios.get(`${api}/api/properties`)).data;
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getProperty = async (id: string) => {
  try {
    let resp = (await Axios.get(`${api}/api/properties/${id}`)).data;
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const searchProperty = async (query: string) => {
  try {
    let resp = (
      await Axios.post(`${api}/api/properties/search`, { search: query })
    ).data;
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createProp = async (property: Property) => {
  try {
    let form = new FormData();
    if (property.file) {
      form.append("image", property.file);
    }
    form.append("title", property.title);
    form.append("description", property.description);
    form.append("price", `${property.price}`);
    form.append("bathrooms", `${property.bathrooms}`);
    form.append("bedrooms", `${property.bedrooms}`);
    form.append("location", `${property.location}`);

    let res = (await Axios.post(`${api}/api/properties`, form, headers)).data;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const updateProp = async (property: Property) => {
  try {
    let form = new FormData();
    if (property.file) {
      form.append("image", property.file);
    }
    form.append("title", property.title);
    form.append("description", property.description);
    form.append("price", `${property.price}`);
    form.append("bathrooms", `${property.bathrooms}`);
    form.append("bedrooms", `${property.bedrooms}`);
    form.append("location", `${property.location}`);

    let res = (
      await Axios.patch(`${api}/api/properties/${property._id}`, form, headers)
    ).data;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const likeProperty = async (id: string) => {
  try {
    let res = (
      await Axios.patch(`${api}/api/properties/${id}/like`, {}, headers)
    ).data;
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  getProperties,
  getProperty,
  searchProperty,
  createProp,
  updateProp,
  likeProperty,
};
