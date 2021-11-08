const View = (() => {
  const domElements = {
    // region: document.querySelector("region"),
    // model: document.querySelector("")
    table: document.querySelector("#table"),
    regionSelect: document.querySelector("#regionSelect"),
    modelSelect: document.querySelector("#modelSelect"),
  };
  const render = (element, tmp) => {
    element.innerHTML = tmp;
  };
  return {
    domElements,
    render,
  };
})();

const Model = (() => {
  const data = [
    { region: "US", model: "A", sales: 150 },
    { region: "US", model: "B", sales: 120 },
    { region: "US", model: "C", sales: 350 },
    { region: "EU", model: "A", sales: 200 },
    { region: "EU", model: "B", sales: 100 },
    { region: "EU", model: "C", sales: 250 },
    { region: "CA", model: "A", sales: 200 },
    { region: "CA", model: "B", sales: 100 },
    { region: "CA", model: "C", sales: 230 },
    { region: "CA", model: "D", sales: 400 },
  ];
  //-----------sum--------------
  let sum = data[0].sales;
  let res = [];
  let tmp = [];
  let dataRegion = new Set();
  let dataModel = new Set();
  tmp.push(data[0]);
  //-----------filter--------------
  dataRegion.add(data[0].region);
  dataModel.add(data[0].model);
  for (let i = 1; i < data.length; i++) {
    dataRegion.add(data[i].region);
    dataModel.add(data[i].model);
    if (data[i].region !== data[i - 1].region) {
      tmp.push({
        region: data[i - 1].region,
        model: "sum",
        sales: sum,
      });
      res = [...res, ...tmp];
      sum = 0;
      //console.log(tmp);
      tmp = [];
    }
    tmp.push(data[i]);
    sum += data[i].sales;
    if (i === data.length - 1) {
      tmp.push({
        region: data[i - 1].region,
        model: "sum",
        sales: sum,
      });
      res = [...res, ...tmp];
    }
  }
  //-----------sum end--------------
  //console.log(dataRegion, dataModel);
  return {
    res,
    dataRegion,
    dataModel,
  };
})();

const Controller = ((view, model) => {
  const createTable = () => {
    let tmp = "";
    model.res.forEach((element) => {
      tmp += `
      <tr>
        <td id="${element.region}">${element.region}</td>
        <td id="${element.model}">${element.model}</td>
        <td id="${element.sales}">${element.sales}</td>
      </tr>
      `;
    });
    view.render(table, tmp);
  };
  const createRegionList = () => {
    let tmp = "";
    const regionArr = [...model.dataRegion];
    console.log(regionArr);
    regionArr.forEach((key) => {
      tmp += `<option value="${key}">${key}</option>`;
    });
    view.render(regionSelect, tmp);
  };
  const createModelList = () => {
    let tmp = "";
    const modelArr = [...model.dataModel];
    console.log(modelArr);
    modelArr.forEach((key) => {
      tmp += `<option value="${key}">${key}</option>`;
    });
    view.render(modelSelect, tmp);
  };
  const setUpEvent = () => {
    view.domElements.regionSelect.addEventListener("change", (event) => {
      const filterRegion = model.res.filter(
        (element) => element.region === event.target.value
      );
      let tmp = "";
      filterRegion.forEach((element) => {
        tmp += `
        <tr>
          <td id="${element.region}">${element.region}</td>
          <td id="${element.model}">${element.model}</td>
          <td id="${element.sales}">${element.sales}</td>
        </tr>
        `;
      });
      view.render(table, tmp);
      console.log(filterRegion);
    });
    view.domElements.modelSelect.addEventListener("change", (event) => {
      const filterModel = model.res.filter(
        (element) => element.model === event.target.value
      );
      let tmp = "";
      filterModel.forEach((element) => {
        tmp += `
        <tr>
          <td id="${element.region}">${element.region}</td>
          <td id="${element.model}">${element.model}</td>
          <td id="${element.sales}">${element.sales}</td>
        </tr>
        `;
      });
      view.render(table, tmp);
      console.log(filterModel);
    });
  };
  const init = () => {
    createTable();
    createRegionList();
    createModelList();
    setUpEvent();
  };
  return { init };
})(View, Model);

Controller.init();
