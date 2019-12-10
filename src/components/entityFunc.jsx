export function fetchData(prop) {
  let menMean = [];
  let womenMean = [];
  let men = [];
  let women = [];
  if (prop !== undefined) {
    let entities = prop;
    let menData = entities[1];
    let womenData = entities[0];

    if (menData !== undefined && womenData !== undefined) {
      menMean = menData.mean;
      womenMean = womenData.mean;
      menData = clearData(menData);
      womenData = clearData(womenData);

      let menArray = [...new Map(Object.entries(menData)).values()];
      let womenArray = [...new Map(Object.entries(womenData)).values()];

      let distributed = distributeData(menArray, womenArray);
      men = distributed.menObject;
      women = distributed.womenObject;
    } else {
      men = [];
      women = [];
      womenMean = 0;
      menMean = 0;
    }
  }

  return { men, women, menMean, womenMean };
}

function clearData(data) {
  let { mean, p1, p2, p3, p4, p6, p7, p8, p9, minVal, maxVal } = data;

  return { p1, p2, p3, p4, mean, p6, p7, p8, p9, minVal, maxVal };
}

function distributeData(dataMen, dataWomen) {
  let men = dataMen.sort((a, b) => parseInt(a) - parseInt(b));
  let women = dataWomen.sort((a, b) => parseInt(a) - parseInt(b));

  let menObject = [];
  let womenObject = [];

  for (let i = 0; i < 11; i++) {
    if (i <= 5) {
      menObject.push({ x: parseInt(men[i]), y: i });
      womenObject.push({ x: parseInt(women[i]), y: i });
    } else {
      menObject.push({ x: parseInt(men[i]), y: 10 - i });
      womenObject.push({ x: parseInt(women[i]), y: 10 - i });
    }
  }

  return { menObject, womenObject };
}