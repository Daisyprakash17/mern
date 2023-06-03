import { Pagination } from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
const PaginationComponent = ({categoryName,searchQuery,paginationlinksnumber,pagenumber}) => {

    const category=categoryName?`category/${categoryName}/`:"";
    const search =searchQuery? `category/${searchQuery}/`:"";
    const url=`/product-list/${category}${search}`
  return (
    <Pagination>
      <LinkContainer to={`${url}${pagenumber - 1}`}>
        <Pagination.Prev disabled={pagenumber === 1} />
      </LinkContainer>
      {[...Array(paginationlinksnumber).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`${url}${x + 1}`}>
          <Pagination.Item active={x + 1 === pagenumber}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
      <LinkContainer
        disabled={pagenumber === paginationlinksnumber}
        to={`${url}${pagenumber + 1}`}
      >
        <Pagination.Next />
      </LinkContainer>
    </Pagination>
  );
};

export default PaginationComponent;
