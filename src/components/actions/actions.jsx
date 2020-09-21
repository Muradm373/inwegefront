import axios from "axios";
import {lng, API_URL} from "../../dictionary/text"

export const getOccupations = (dispatch, region) =>{
    const url = `${API_URL}/`;
    axios
      .get(url + "jobs/names?region=" + region + "&lang=" + lng)
      .then((response) =>response.data)
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
        
        return dispatch({type: 'GET_OCCUPATIONS', occupations: names});
          
      }
      );

  }

