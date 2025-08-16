import "./Profile.styles.js";
import PageTitle from "../../atoms/PageTitle/PageTitle";
import { MainContainer } from "./Profile.styles.js";
import Avatar from "../../molecules/Avatar/Avatar.js";
import { useAvatarImage } from "../../../hooks/profile/profile.js";
import { useEffect } from "react";
import {
  createAvatarImage,
  fetchAvatarImage,
} from "../../../api/profile/profile.js";
const Profile = () => {
  const { file, setFile, fileInputRef } = useAvatarImage();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAvatarImage();
      console.log(response);
      if (response.data.results) {
        setFile(response.data.results);
      }
    };
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setFile(base64String);
        createAvatarImage(base64String);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <PageTitle />
      <MainContainer>
        <Avatar
          file={file}
          handleFileChange={handleFileChange}
          handleAvatarClick={handleAvatarClick}
          fileInputRef={fileInputRef}
        />
      </MainContainer>
    </>
  );
};

export default Profile;
