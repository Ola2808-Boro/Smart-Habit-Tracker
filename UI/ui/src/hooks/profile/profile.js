import { useState, useRef } from "react";

export function useAvatarImage() {
  const [file, setFile] = useState("/images/default-avatar.png");
  const fileInputRef = useRef(null);

  return { file, setFile, fileInputRef };
}
