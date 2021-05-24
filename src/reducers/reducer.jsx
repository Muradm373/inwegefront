import { genderLabel } from "../dictionary/text";

const initState = {
  occupations: [],
  gender: genderLabel[0],
  lang: "",
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
    wageForecastDateQuarter: "I",
    pensionStartDate: "2020",
    pensionEndDate: "2071"
  },
  menGraphMean:0,
  womenGraphMean: 0,
  menu: 0
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
  if (action.type === "SET_LANGUAGE") {
    return { ...state, language: action.lang}
  }

  if (action.type === "SET_MEANS") {
    return { ...state, menGraphMean: action.menMean,womenGraphMean: action.womenMean}
  }

  return { ...state };
};

export default rootReduce;
