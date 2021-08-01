import React from "react";
import { shallow, render } from "enzyme";
import { ArrowUp } from "react-feather";
import Icon from "../../components/Icon";

describe("<Icon/>", () => {
  it("should render correctly ArrowUp by name", () => {
    const icon = <Icon name="arrowUp" size={16} />;
    const component = shallow(icon);

    const renderedComponent = render(<span>{icon}</span>);

    expect(component.find(ArrowUp).length).toBe(1);
    expect(renderedComponent.find("svg").length).toBe(1);
  });

  it("should render correctly width and height by props", () => {
    const size = 99;
    const icon = <Icon name="trash" size={size} />;
    const renderedComponent = render(<span>{icon}</span>);
    expect(renderedComponent.find("svg").attr("width")).toBe(size.toString());
    expect(renderedComponent.find("svg").attr("height")).toBe(size.toString());
  });
});
