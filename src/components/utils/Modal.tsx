import { GroupByOption, OrderByOption } from '../../types';
import styles from './Modal.module.css';

const Modal = ({
  setShowModal,
  group,
  setGroup,
  order,
  setOrder,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  group: GroupByOption;
  setGroup: React.Dispatch<React.SetStateAction<GroupByOption>>;
  order: OrderByOption;
  setOrder: React.Dispatch<React.SetStateAction<OrderByOption>>;
}) => {
  const groupByOptions = [
    'Status',
    'User',
    'Priority',
  ] satisfies GroupByOption[];
  const orderByOptions = ['Title', 'Priority'] satisfies OrderByOption[];
  return (
    <div className={styles['modal']}>
      <div onClick={() => setShowModal(false)} className="overlay"></div>
      <div className={styles['modal-content']}>
        <label htmlFor="1" className={styles['modal-label']}>
          Grouping
        </label>
        <select
          value={group}
          id="1"
          onChange={(e) => {
            setGroup(e.target.value as GroupByOption);
            setShowModal(false);
          }}
          className={styles['modal-select']}
        >
          {groupByOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className={styles['modal-content']}>
        <label htmlFor="2" className={styles['modal-label']}>
          Ordering
        </label>
        <select
          id="2"
          value={order}
          onChange={(e) => {
            setOrder(e.target.value as OrderByOption);
            setShowModal(false);
          }}
          className={styles['modal-select']}
        >
          {orderByOptions.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Modal;
