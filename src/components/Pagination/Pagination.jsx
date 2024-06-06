import "./Pagination.css";
import previous from "../../images/icon-previous.svg";
import next from "../../images/icon-next.svg";
import { Link } from "react-router-dom";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    }
  }

  currentPage < 8 && pages.splice(pages.length - 1, 0, "...");

  currentPage > 4 && pages.splice(1, 0, "...");

  return (
    <div className="pagination">
      <Link
        to={`/list/page/${currentPage - 1}`}
        onClick={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className="pagination__button"
      >
        <img className="pagination__icon" src={previous} alt="previous-icon" />
      </Link>

      {pages.map((page, index) =>
        page == "..." ? (
          <div key={index} className="pagination__elipsis">
            {page}
          </div>
        ) : (
          <Link
            to={`/list/page/${page}`}
            key={index}
            className={` ${
              page === currentPage ? "active" : ""
            } ${"pagination__page"}`}
            onClick={() => {
              onPageChange(page);
            }}
          >
            {page}
          </Link>
        )
      )}

      <Link
        to={`/list/page/${currentPage + 1}`}
        onClick={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        className="pagination__button"
      >
        <img className="pagination__icon" src={next} alt="next-icon" />
      </Link>
    </div>
  );
};

export default Pagination;
