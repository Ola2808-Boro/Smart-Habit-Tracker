import PropTypes from "prop-types";
import Avatar from "../../molecules/Avatar/Avatar";
import Input from "../../atoms/Input/Input";
import { StyledConatiner } from "./UserProfileCard.styles";
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
    <StyledConatiner>
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
    </StyledConatiner>
  );
};

// Default props for the UserProfileCard component
UserProfileCard.propTypes = {};

UserProfileCard.defaultProps = {};

export default UserProfileCard;
