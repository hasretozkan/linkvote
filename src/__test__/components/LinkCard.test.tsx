import React from "react";
import { Card } from "react-bootstrap";
import { mount } from "enzyme";
import LinkCard from "../../components/LinkCard";
import { SerializedLink } from "../../services/models";
import Icon from "../../components/Icon";

describe("<LinkCard/>", () => {
  const link: SerializedLink = {
    createdAt: new Date(),
    id: "1",
    name: "Example",
    score: 0,
    url: "www.abc.xyz",
  };

  it("should render correctly", () => {
    const component = mount(<LinkCard {...link} />);

    expect(component.find(Card).length).toBe(1);
    expect(component.find(Card.Body).length).toBe(1);
    expect(component.find(Card.Title).length).toBe(1);
    expect(component.find("small").length).toBe(1);
    expect(component.find(Card.Title).text()).toBe(link.name);
    expect(component.find(Icon).length).toBe(3);
    expect(component.find("p").length).toBe(2);
  });
});
