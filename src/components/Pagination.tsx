import * as React from "react";
import { Pagination } from "react-bootstrap";
import { pagination } from "../utils";

type CustomPaginationProps = {
  onChange: (page: number) => void;
  page: number;
  pageCount: number;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({ page, onChange, pageCount }) => {
  const pages = pagination(page, 1, pageCount, 9);

  return (
    <Pagination className="w-100 justify-content-center">
      <Pagination.Prev onClick={() => onChange(Math.max(0, page - 1))} />
      {pages.map(({ type, pageNumber }) => (
        <React.Fragment key={pageNumber}>
          {type === "dot" && <Pagination.Ellipsis as="span" onClick={() => onChange(pageNumber)} />}
          {type === "page" && (
            <Pagination.Item as="span" active={page === pageNumber} onClick={() => onChange(pageNumber)}>
              {pageNumber}
            </Pagination.Item>
          )}
        </React.Fragment>
      ))}
      <Pagination.Next onClick={() => onChange(Math.min(pageCount, page + 1))} />
    </Pagination>
  );
};

export default CustomPagination;
