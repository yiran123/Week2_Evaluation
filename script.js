const View = (() => {
  const domElements = {
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
  let sum = 0;
  //result data array
  let res = [];
  //temporary holding data array
  let tmp = [];
  //-----------filtered data--------------
  let dataRegion = new Set();
  let dataModel = new Set();
  for (let i = 0; i < data.length - 1; i++) {
    dataRegion.add(data[i].region);
    dataModel.add(data[i].model);
    tmp.push(data[i]);
    sum += data[i].sales;
    console.log(data[i].region, sum);
    if (data[i].region !== data[i + 1].region) {
      tmp.unshift({
        region: data[i].region,
        model: "sum",
        sales: sum,
      });
      res = [...res, ...tmp];
      sum = 0;
      tmp = [];
    }
  }
  //control the last element
  dataRegion.add(data[data.length - 1].region);
  dataModel.add(data[data.length - 1].model);
  tmp.push(data[data.length - 1]);
  sum += data[data.length - 1].sales;
  tmp.unshift({
    region: data[data.length - 1].region,
    model: "sum",
    sales: sum,
  });
  res = [...res, ...tmp];
  console.log(res);
  //-----------sum end--------------
  return {
    res,
    dataRegion,
    dataModel,
  };
})();

const Controller = ((view, model) => {
  const loadTableData = (regionType, modelType) => {
    let tmp = "";
    model.res.forEach((element) => {
      if (
        (regionType === element.region || regionType === "all") &&
        (modelType === element.model || modelType === "all")
      ) {
        tmp += `
        <tr>
          <td id="${element.region}">${element.region}</td>
          <td id="${element.model}">${element.model}</td>
          <td id="${element.sales}">${element.sales}</td>
        </tr>
        `;
      }
    });
    view.render(table, tmp);
  };
  const createRegionList = () => {
    let tmp = "";
    const regionArr = [...model.dataRegion];
    tmp += `<option value="all">all</option>`;
    regionArr.forEach((key) => {
      tmp += `<option value="${key}">${key}</option>`;
    });
    view.render(regionSelect, tmp);
  };
  const createModelList = () => {
    let tmp = "";
    const modelArr = [...model.dataModel];
    tmp += `<option value="all">all</option>`;
    modelArr.forEach((key) => {
      tmp += `<option value="${key}">${key}</option>`;
    });
    view.render(modelSelect, tmp);
  };
  const setUpEvent = () => {
    view.domElements.regionSelect.addEventListener("change", (event) => {
      view.domElements.regionSelect.value = event.target.value;
      loadTableData(
        view.domElements.regionSelect.value,
        view.domElements.modelSelect.value
      );
    });
    view.domElements.modelSelect.addEventListener("change", (event) => {
      view.domElements.modelSelect.value = event.target.value;
      loadTableData(
        view.domElements.regionSelect.value,
        view.domElements.modelSelect.value
      );
    });
  };
  const init = () => {
    loadTableData("all", "all");
    createRegionList();
    createModelList();
    setUpEvent();
  };
  return { init };
})(View, Model);

Controller.init();
