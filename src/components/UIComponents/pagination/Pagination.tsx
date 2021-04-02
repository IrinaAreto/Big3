import * as React from "react";
import ReactPaginate from "react-paginate";
import styles from "./stylesPagination.module.css";

interface PaginationProps {
    pageCount: number;
    handlePageClick: (selectedItem: { selected: number }) => void
}

export function Pagination({pageCount, handlePageClick}: PaginationProps): React.ReactElement {
    return (
        <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={'...'}
                       pageCount={pageCount}
                       onPageChange={handlePageClick}
                       pageRangeDisplayed={3}
                       marginPagesDisplayed={1}
                       containerClassName={styles.pageContainer}
                       previousLinkClassName={styles.prevNext}
                       nextLinkClassName={styles.prevNext}
                       activeClassName={styles.activePage}
                       pageLinkClassName={styles.pageLink}
                       disabledClassName={styles.disabled}/>
    )
}
