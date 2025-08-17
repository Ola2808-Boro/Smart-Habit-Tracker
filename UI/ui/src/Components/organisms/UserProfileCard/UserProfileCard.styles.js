import PropTypes from "prop-types";
import Avatar from "../../molecules/Avatar/Avatar";
import Input from "../../atoms/Input/Input";
const UserProfileCard = ({
  file,
  handleAvatarClick,
  fileInputRef,
  handleFileChange,
  editorMode,
  handleSave,
  editorRef,
  userData,
}) => {
  return (
    <>
      <Avatar
        file={file}
        handleFileChange={handleFileChange}
        handleAvatarClick={handleAvatarClick}
        fileInputRef={fileInputRef}
        editorMode={editorMode}
        handleSave={handleSave}
        editorRef={editorRef}
      />
      <Input tetx="text" value={userData["name"]} />
      <Input tetx="text" value={userData["surname"]} />
    </>
  );
};

// Default props for the UserProfileCard component
UserProfileCard.propTypes = {};

UserProfileCard.defaultProps = {};

export default UserProfileCard;
