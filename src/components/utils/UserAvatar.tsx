import Avatar from 'boring-avatars';
import styles from './UserAvatar.module.css';

const UserAvatar = ({
  name,
  available,
}: {
  name: string;
  available: boolean;
}) => {
  return (
    <div className="container">
      <Avatar size={21} variant={`beam`} name={name} />
      <div
        className={
          available === true
            ? styles['badge--online']
            : styles['badge--offline']
        }
      />
    </div>
  );
};

export default UserAvatar;
