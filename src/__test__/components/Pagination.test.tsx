import React from "react";
import { mount } from "enzyme";
import Pagination from "../../components/Pagination";

describe("<Pagination/>", () => {
  it("should render correctly", () => {
    const initialPage = 25;
    const pagination = <Pagination page={initialPage} pageCount={30} onChange={() => 0} />;

    const component = mount(<div>{pagination}</div>);

    const ul = component.find("ul");

    expect(ul.length).toBe(1);
    expect(ul.hasClass("pagination")).toBe(true);
  });

  test("Page items should render correctly", () => {
    const initialPage = 23;
    const pagination = <Pagination page={initialPage} pageCount={30} onChange={() => 0} />;

    const component = mount(pagination);

    const liElements = component.find("li");
    const activeLi = component.find("li.active");

    expect(liElements.length).toBe(11);
    expect(activeLi.length).toBe(1);

    expect(activeLi.find("span.page-link").childAt(0).text()).toBe(initialPage.toString());
  });

  test("When the page changes, the active class should change.", () => {
    const initialPage = 23;
    const pagination = <Pagination page={initialPage} pageCount={30} onChange={() => 0} />;

    const component = mount(pagination);

    const activeLi = component.find("li.active");
    expect(activeLi.find("span.page-link").childAt(0).text()).toBe(initialPage.toString());

    component.setProps({ page: 3 });
    const newActiveLi = component.find("li.active");
    expect(newActiveLi.find("span.page-link").childAt(0).text()).toBe("3");
  });
});
