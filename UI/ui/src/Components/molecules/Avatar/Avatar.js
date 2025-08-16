import PropTypes from "prop-types";
import AvatarEditor from "react-avatar-editor";
import { StyledAvatarContainer } from "./Avatar.styles";
import Input from "../../atoms/Input/Input";
const Avatar = ({
  file,
  handleAvatarClick,
  fileInputRef,
  handleFileChange,
}) => {
  return (
    <>
      <Input
        style={{ display: "none" }}
        type="file"
        hiddenInput={true}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <StyledAvatarContainer onClick={handleAvatarClick}>
        {file ? (
          <AvatarEditor
            image={file}
            width={200}
            height={200}
            border={30}
            borderRadius={100}
            scale={1.2}
          />
        ) : (
          <img
            src="/images/default-avatar.png"
            alt="Avatar"
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
        )}
      </StyledAvatarContainer>
    </>
  );
};

// Default props for the Avatar component
Avatar.propTypes = {};

Avatar.defaultProps = {};

export default Avatar;
