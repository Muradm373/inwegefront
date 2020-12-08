import { genderLabel } from "../dictionary/text";

const initState = {
  occupations: [],
  gender: genderLabel[0],
  wage: undefined,
  entities: [],
  description: "",
  generalName: null,
  occupationCode: undefined,
  dates: {
    ageDataQuarter: "I",
    ageDate: "2020",
    occupationEntityDate: "2020",
    occupationEntityDateQuarter: "I",
    pensionDate: "2020",
    pensionDateQuarter: "I",
    salaryEntityDate: "2020",
    salaryEntityDateQuarter: "I",
    wageForecastDate: "2020",
    wageForecastDateQuarter: "I"
  },
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
      generalName: action.generalName,
      occupationCode: action.code
    };
  }
  if (action.type === "SET_MEAN") {
    return { ...state, mean: action.mean };
  }
  if (action.type === "SET_DATES") {
    return { ...state, dates: {...state.dates, ...action.dates}}
  }

  return { ...state };
};

export default rootReduce;
