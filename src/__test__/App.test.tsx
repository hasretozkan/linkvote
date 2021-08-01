import { Route } from "react-router-dom";
import { shallow } from "enzyme";
import App from "../App";

// NOTE sayfa sayısı kontrolü ve sayfa kontrolü
describe("<App/>", () => {
  test("should render pages correctly", () => {
    const app = shallow(<App />);

    const routes = app.find(Route);
    expect(routes.length).toBe(2);

    expect(routes.get(0).props.path).toBe("/create");
    expect(routes.get(1).props.path).toBe("/");
  });
});
