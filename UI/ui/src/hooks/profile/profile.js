import { useState, useRef, useEffect } from "react";

export function useUserData() {
  const [file, setFile] = useState("/images/default-avatar.png");
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [editorMode, setEditorMode] = useState(false);
  const editorRef = useRef(null);

  return {
    file,
    setFile,
    fileInputRef,
    editorMode,
    setEditorMode,
    editorRef,
    userData,
    setUserData,
  };
}

export const useInitialData = (loadUserData) => {
  useEffect(() => {
    const fetchData = async () => {
      loadUserData();
    };
    fetchData();
  }, []);
};
