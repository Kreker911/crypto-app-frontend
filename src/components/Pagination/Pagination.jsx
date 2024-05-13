import "./Pagination.css";
import previous from "../../images/icon-previous.svg";
import next from "../../images/icon-next.svg";

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
      <button
        onClick={() => {
          if (currentPage !== 1) {
            onPageChange(currentPage - 1);
          }
        }}
        className="pagination__button"
      >
        <img className="pagination__icon" src={previous} alt="previous-icon" />
      </button>
      {pages.map((page, index) => (
        <div
          key={index}
          className={` ${page === currentPage ? "active" : ""} ${
            page == "..." ? "pagination__elipsis" : "pagination__page"
          }`}
          onClick={() => {
            onPageChange(page);
          }}
        >
          {page}
        </div>
      ))}

      <button
        onClick={() => {
          if (currentPage !== totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
        className="pagination__button"
      >
        <img className="pagination__icon" src={next} alt="next-icon" />
      </button>
    </div>
  );
};

export default Pagination;
