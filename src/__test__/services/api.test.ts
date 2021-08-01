import { createLink, sortAlgorithm } from "../../services/api";
import { SerializedLink } from "../../services/models";

describe("API", () => {
  // NOTE API Link yaratma kontrol
  test("The link should be created correctly.", () => {
    const name = "Example";
    const url = "https://abc.xyz";

    return createLink({ name, url }).then((response) => {
      expect(response.name).toBe(name);
      expect(response.url).toBe(url);
    });
  });

  // NOTE API Link yaratma undefined kontrol
  test("should fail when sending invalid url.", () =>
    createLink({ name: "name", url: "url" }).catch((e) => {
      expect(e).not.toBe(undefined);
    }));

  // NOTE API Sıralama kontrol
  describe("Sort Algorithm", () => {
    const links: SerializedLink[] = [
      {
        name: "1",
        id: "1",
        url: "https://www.a.com",
        createdAt: new Date("2020-12-31T20:54:05.416Z"),
        score: 10,
      },
      {
        name: "2",
        id: "2",
        url: "https://www.b.com",
        createdAt: new Date("2020-12-31T20:54:55.416Z"),
        score: 11,
      },

      {
        name: "3",
        id: "3",
        url: "https://www.d.com",
        createdAt: new Date("2020-12-31T20:54:05.416Z"),
        score: 9,
      },

      {
        name: "4",
        id: "4",
        url: "https://www.c.com",
        createdAt: new Date("2020-12-31T20:54:05.416Z"),
        score: 11,
      },
      {
        name: "5",
        id: "5",
        url: "https://www.e.com",
        createdAt: new Date("2020-12-31T20:54:05.416Z"),
        score: 12,
      },
    ];

    test("The sorting algorithm should work correctly.", () => {
      const sortedByScoreDesc = Array.from(links).sort(sortAlgorithm("score", "desc"));
      const sortedByDateDesc = Array.from(links).sort(sortAlgorithm("date", "desc"));

      expect(sortedByScoreDesc[0].name).toBe("5");
      expect(sortedByDateDesc[0].name).toBe("2");
    });

    test("The newest link with the same score should be higher in the list.", () => {
      const sortedByScoreDesc = Array.from(links).sort(sortAlgorithm("score", "desc"));

      expect(sortedByScoreDesc[1].name).toBe("2");
      expect(sortedByScoreDesc[2].name).toBe("4");
    });
    test("The link with the highest score among the same created links should be higher in the list.", () => {
      const sortedByDateDesc = Array.from(links).sort(sortAlgorithm("date", "desc"));

      expect(sortedByDateDesc[1].name).toBe("5");
      expect(sortedByDateDesc[2].name).toBe("4");
      expect(sortedByDateDesc[3].name).toBe("1");
    });
  });
});
