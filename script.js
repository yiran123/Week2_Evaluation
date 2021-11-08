const View = (() => {
  const domElements = {
    // region: document.querySelector("region"),
    // model: document.querySelector("")
    table: document.querySelector("#table"),
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
  let sum = data[0].sales;
  let res = [];
  let tmp = [];
  tmp.push(data[0]);
  for (let i = 1; i < data.length; i++) {
    if (data[i].region !== data[i - 1].region) {
      tmp.push({
        region: data[i - 1].region,
        model: "sum",
        sales: sum,
      });
      res = [...res, ...tmp];
      sum = 0;
      console.log(tmp);
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
  return {
    res,
  };
})();

const Controller = ((view, model) => {
  const createTable = () => {
    let tmp = "";
    model.res.forEach((element) => {
      tmp += `<tr>
      <td id="${element.region}">${element.region}</td>
      <td id="${element.model}">${element.model}</td>
      <td id="${element.sales}">${element.sales}</td>
    </tr>`;
    });
    view.render(table, tmp);
  };
  const init = () => {
    createTable();
  };
  return { init };
})(View, Model);

Controller.init();
