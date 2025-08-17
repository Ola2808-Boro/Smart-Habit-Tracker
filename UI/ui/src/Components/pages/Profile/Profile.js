import "./Profile.styles.js";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import { MainContainer } from "./Profile.styles.js";
import UserProfileCard from "../../organisms/UserProfileCard/UserProfileCard.styles.js";
import { useUserData, useInitialData } from "../../../hooks/profile/profile.js";
import {
  createAvatarImage,
  fetchAvatarImage,
  fetchUserData,
} from "../../../api/profile/profile.js";
const Profile = () => {
  const {
    file,
    setFile,
    fileInputRef,
    editorMode,
    setEditorMode,
    editorRef,
    userData,
    setUserData,
  } = useUserData();

  const loadUserData = async () => {
    const response = await fetchAvatarImage();
    if (response.data.results) {
      setFile(response.data.results);
    }
    const response1 = await fetchUserData();
    if (response1.data.results) {
      setUserData({
        name: response1.data.results[0],
        surname: response1.data.results[1],
        dateJoin: response1.data.results[2],
      });
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFile(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64 = reader.result;
            setFile(base64);
            createAvatarImage(base64);
            setEditorMode(false);
          };
          reader.readAsDataURL(blob);
        }
      }, "image/png");
    }
  };

  const handleAvatarClick = () => {
    if (!editorMode) {
      fileInputRef.current.click();
      setEditorMode(true);
    }
  };
  useInitialData(loadUserData);
  return (
    <>
      <PageTitle />
      <MainContainer>
        <UserProfileCard
          file={file}
          handleFileChange={handleFileChange}
          handleAvatarClick={handleAvatarClick}
          fileInputRef={fileInputRef}
          editorMode={editorMode}
          handleSave={handleSave}
          editorRef={editorRef}
          userData={userData}
        />
      </MainContainer>
    </>
  );
};

export default Profile;
