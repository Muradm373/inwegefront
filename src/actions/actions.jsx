import axios from "axios";
import { lng, API_URL, noInformationLabel, allOcupationsLabel, overall } from "../dictionary/text";

export const getOccupations = (dispatch, regionSelected) => {
  console.log(regionSelected)
  let region =  regionSelected;
  if(region === overall || region === "")
    region = "Harju maakond"
  axios
    .get(`${API_URL}/jobs/names?region=${region}&lang=${lng}`)
    .then((response) => response.data)
    .then((data) => {
      let names = [];
      names.push({ label: allOcupationsLabel, value: "reset" });

      data.payload.forEach((element) => {
        if (element.name !== " ") {
          names.push({
            label: element.name,
            value: element,
          });
        }
      });

      return dispatch({ type: "GET_OCCUPATIONS", occupations: names });
    });
};

export const getDates = (dispatch) => {
  axios
    .get(`${API_URL}/file/date/info`)
    .then((data) => {
      return dispatch({ type: "SET_DATES", dates: data.data.payload });
    });
};

export const updateDates = (dates, userToken, dispatch) => {
  axios
    .put(`${API_URL}/file/date/update`, dates,{headers:{Authorization: `Bearer ${userToken}`, 'Content-Type': 'application/json'}})
    .then((data) => {
      return dispatch({ type: "SET_DATES", dates: dates });
    });
};

export const setGender = (gender) => {
  return { type: "SET_GENDER", gender: gender };
};

export const setWage = (wage) => {
  const MAX_WAGE = 1000000;
  const MIN_WAGE = 0;

  if (wage < MAX_WAGE && wage >= MIN_WAGE && !isNaN(wage))
    return { type: "SET_WAGE", wage: wage };
  else return { type: "SET_WAGE", wage: 0 };
};

export const getSalaryEntities = (regionSelected, isco, code, dispatch) => {
  let region = regionSelected;
  if(region==="all" && isco === "averages"){
    dispatch({
      type: "SET_ENTITIES",
      entities: [],
      description: "",
      generalName: null,
      code: undefined
    });
    return;
  }
  let url;
  region === "" ? region = "all" : region = regionSelected;
  if (isco === "averages") url = `${API_URL}/jobs?region=${region}&lang=${lng}`;
  else
    url = `${API_URL}/jobs?region=${region}&isco=${isco}&code=${code}&lang=${lng}`;

  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => {
      return parseSalaryEntities(data, isco, dispatch);
    })
};

export const setLanguage = (lang) =>{
  return ({ type: "SET_LANGUAGE", lang:lang });
}

const parseSalaryEntities = (data, type, dispatch) => {
  let entities;
  let code = "";
  if (type === "averages") {
    entities = data.payload.countyAverages;

  }
  else entities = data.payload.salaryEntities;

  let jobEntity = data.payload.jobEntity;
  code = data.payload.jobEntity.code;
  if (jobEntity !== undefined && entities !== undefined) {
    if ( entities[0] !== undefined && entities[0].region !== "All") {
      let description = jobEntity.description;
      dispatch({
        type: "SET_ENTITIES",
        entities: entities,
        description: description,
        generalName: jobEntity.name,
        code: code
      });
    } else {
      dispatch({
        type: "SET_ENTITIES",
        entities: entities,
        description: noInformationLabel,
        generalName: jobEntity.name,
        code: code
      });
    }
  } else {
    dispatch({ type: "SET_ENTITIES", entities: [], description: noInformationLabel });
  }
  if(entities[0] !== undefined)
    return axios.get(`${API_URL}/jobs/${entities[0].id}/average`)
        .then((response) => response.data)
        .then((data) => {
          dispatch({ type: "SET_MEAN", mean: data.payload });
        });
  else
    dispatch({ type: "SET_MEAN", mean: [] })
};
