import React from "react";
import styles from "./Pagination.module.css";
import { usePagination } from "../hooks/usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        disabled={currentPage === 1}
        onClick={onPrevious}
      >
        Previous
      </button>

      <h6 className={styles.paginationPageCount}>
        Page {currentPage} of {lastPage}
      </h6>

      <button
        className={styles.paginationButton}
        disabled={currentPage === lastPage}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
