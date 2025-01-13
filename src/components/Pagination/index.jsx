import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import styles from "./pagination.module.css"; // Custom CSS for styling

const PaginationComponent = ({ pageCount, onPageChange }) => {
  return (
    <div className={styles.paginationContainer}>
      <div className={styles.recordsPerPage}>
        Show
        <select
          className={styles.recordsDropdown}
          onChange={(e) => console.log(e.target.value)} // Update records per page logic
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        <span>records</span>
        <span>/</span>
        <span>56</span>
      </div>

      <div className={styles.pageNumbers}>
        <button>
          <RiArrowLeftSLine />
        </button>
        <span className={styles.active}>01</span>
        <span>of</span>
        <span>06</span>
        <button>
          <RiArrowRightSLine />
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
