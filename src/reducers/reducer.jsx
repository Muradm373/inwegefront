import axios from "axios";
import { lng, API_URL, genderLabel, noDescr } from "../dictionary/text";

const initState = {
  occupations: [],
  gender: genderLabel[0],
  wage: undefined,
  entities: [],
  description: noDescr
};

const rootReduce = (state = initState, action) => {
  if (action.type === "GET_OCCUPATIONS") {
    return { ...state, occupations: action.occupations };
  }
  if (action.type === "SET_GENDER") {
    return { ...state, gender: action.gender };
  }

  if (action.type === "SET_WAGE") {
    return { ...state, wage: action.wage };
  }
  if (action.type === "SET_ENTITIES") {
    return {
      ...state,
      entities: action.entities,
      description: action.description,
    };
  }
  if (action.type === "SET_MEAN") {
    return { ...state, mean: action.mean };
  }

  return { ...state };
};

export default rootReduce;
