import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useQuery } from "react-query";
import { Row, Button } from "react-bootstrap";
import Select from "react-select";
import { NavLink } from "react-router-dom";
import { getLinks, OrderType, SortByType } from "../../services/api";
import LinkCardContainer from "../../components/LinkCardContainer";
import Icon from "../../components/Icon";
import Pagination from "../../components/Pagination";
import { ShowToastFunction } from "../../App";

type ListPageProps = {
  showToast: ShowToastFunction;
};

// NOTE Sıralama Türleri
const options: Array<{
  label: string;
  sortBy: SortByType;
  order: OrderType;
  value: string;
}> = [
  {
    label: "Newest",
    sortBy: "date",
    order: "desc",
    value: "1",
  },
  {
    label: "Oldest",
    sortBy: "date",
    order: "asc",
    value: "2",
  },
  {
    label: "Less Voted",
    sortBy: "score",
    order: "asc",
    value: "3",
  },
  {
    label: "Most Voted",
    sortBy: "score",
    order: "desc",
    value: "4",
  },
];

const ListPage: React.FC<ListPageProps> = ({ showToast }) => {
  // NOTE Sıralama State, Sayfa State ve bunların yönetimi
  const [filter, setFilter] = React.useState(options[0]);
  const [page, setPage] = React.useState(1);

  const { order, sortBy } = filter;
  const { isLoading, data, refetch, isPreviousData } = useQuery(["getLinks", page, sortBy, order], () => getLinks({ sortBy, page, order }), { keepPreviousData: true });
  const pageCount = data?.pageCount || 0;

  return (
    <>
      <Row className="d-flex justify-content-center border-bottom pb-2 mb-2">
        <NavLink to="/create">
          <Button size="lg">SUMBIT A LINK</Button>
        </NavLink>
      </Row>

      <Row>
        <Select
          className="basic-single w-100"
          defaultValue={options[0]}
          options={options}
          onChange={(value) => {
            if (value) {
              setFilter(value);
              if (value.label !== filter.label) {
                setPage(1);
              }
            }
          }}
          value={filter}
        />
      </Row>

      <Row>
        {(isPreviousData || isLoading) && (
          <div className="w-100 pt-5 pb-5 d-flex justify-content-center align-items-center">
            <Icon name="loader" size={48} className="text-primary" />
          </div>
        )}
        {data &&
          !isPreviousData &&
          (data.values.length ? (
            <TransitionGroup className="w-100 position-relative">
              {data.values.map((link) => (
                <CSSTransition key={link.id} timeout={500} classNames="linkTransition">
                  <LinkCardContainer {...link} refetchList={() => refetch()} showToast={showToast} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <div className="w-100 pt-5 pb-5 d-flex justify-content-center align-items-center">
              <h4 className="text-primary">No Data</h4>
            </div>
          ))}

        {pageCount > 1 && <Pagination pageCount={pageCount} page={page} onChange={setPage} />}
      </Row>
    </>
  );
};

export default ListPage;
