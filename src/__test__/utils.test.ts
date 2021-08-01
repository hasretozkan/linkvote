import { validURL, pagination } from "../utils";

// NOTE Pagination test, url kontrol
describe("Utils Functions", () => {
  test("validUrl() should work correctly", () => {
    expect(validURL("https://www.abc.com")).toBe(true);
    expect(validURL("invalid-url")).toBe(false);
    expect(validURL("12345")).toBe(false);
  });

  test("pagination() should work correctly", () => {
    const paginationArray = pagination(50, 1, 150, 9);

    expect(paginationArray.length).toBe(9);
    expect(paginationArray[0].pageNumber).toBe(1);
    expect(paginationArray[0].type).toBe("page");

    expect(paginationArray[1].pageNumber).toBe(47);
    expect(paginationArray[1].type).toBe("dot");

    expect(paginationArray[7].pageNumber).toBe(53);
    expect(paginationArray[7].type).toBe("dot");
  });

  test("pagination() should work correctly by `pageCount` param", () => {
    const arrays = [7, 11, 19].map((pageCount) => [pageCount, pagination(50, 1, 150, pageCount)] as const);

    arrays.forEach(([pageCount, array]) => {
      expect(array.length).toBe(pageCount);
      expect(array[0].pageNumber).toBe(1);
      expect(array[0].type).toBe("page");
    });
  });
});
