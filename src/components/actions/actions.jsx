import axios from "axios";
import { lng, API_URL, noDescr } from "../../dictionary/text";

export const getOccupations = (dispatch, region) => {
  axios
    .get(`${API_URL}/jobs/names?region=${region}&lang=${lng}`)
    .then((response) => response.data)
    .then((data) => {
      let names = [];
      names.push({ label: "All occupations", value: "reset" });

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

export const getSalaryEntities = (region, isco, code, dispatch) => {
    let url;
    if(isco === "averages")
    url = `${API_URL}/jobs?region=${region}&lang=${lng}`;
    else
      url = `${API_URL}/jobs?region=${region}&isco=${isco}&code=${code}&lang=${lng}`;

    axios
      .get(url)
      .then((response) => response.data)
      .then((data) => {
          console.log(data)
          return parseSalaryEntities(data, isco, dispatch);})
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: "SET_MEAN", mean: data.payload })
      });
}


const parseSalaryEntities = (data, type, dispatch) => {
    let entities;
    if(type == "averages")
      entities = data.payload.countyAverages;

    else
      entities = data.payload.salaryEntities;

    let jobEntity = data.payload.jobEntity;
    if (jobEntity !== undefined && entities !== undefined) {
      if (entities[0].region !== "All") {
        let description = jobEntity.description;

        dispatch({ type: "SET_ENTITIES", entities: entities, description: description })
      } else {
        dispatch({ type: "SET_ENTITIES", entities: entities, description: noDescr })
      }
    } else {
        dispatch({ type: "SET_ENTITIES", entities: [], description: noDescr })
    }
    return axios.get(`${API_URL}/jobs/${entities[0].id}/average`);
  }
