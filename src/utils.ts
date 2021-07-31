export function validURL(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function pagination(
  current: number,
  first: number,
  last: number,
  pageCount: number
): {
  type: "page" | "dot";
  pageNumber: number;
}[] {
  const count = pageCount % 2 === 0 ? pageCount - 1 : pageCount;

  if (count >= last) {
    return Array.from({ length: last }, (_, i) => i + 1).map((pageNumber) => ({
      type: "page",
      pageNumber,
    }));
  }

  const delta = Math.floor(count / 2);

  const isFirst = current - delta <= 0;
  const isLast = current + delta >= last;

  return [
    first,
    current - delta <= 0 ? first + 1 : -1,
    //
    ...Array.from({ length: count - 4 }, (_, i) => Math.ceil(delta / 2 - i))
      .map((i) => current - i)
      .map((i) => (isFirst ? i + (delta - (current - first)) : isLast ? i - (delta - (last - current)) : i)),
    current + delta >= last ? last - 1 : 0,
    last,
  ].map((p, i, s) => ({
    type: p <= 0 ? "dot" : "page",
    pageNumber: p === -1 ? s[i + 1] - 1 : p === 0 ? s[i - 1] + 1 : p,
  }));
}
