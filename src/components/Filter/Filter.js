import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import styles from "./Filter.module.css";

const Filter = ({ filterValue, onChangeFilter }) => {
  const filterInputId = nanoid();
  return (
    <div className={styles.FilterThumb}>
      <label htmlFor={filterInputId} className={styles.label}>
        Find contacts by name
      </label>
      <input
        className={styles.input}
        type="text"
        name="filter"
        required
        onChange={onChangeFilter}
        id={filterInputId}
        value={filterValue}
      />
    </div>
  );
};

Filter.propTypes = {
  filterValue: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

export default Filter;
