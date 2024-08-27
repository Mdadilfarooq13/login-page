import React, { createContext, useState } from "react";

export const FileDataContext = createContext();

export const FileDataProvider = ({ children }) => {
  const [fileData, setFileData] = useState([]);

  return (
    <FileDataContext.Provider value={{ fileData, setFileData }}>
      {children}
    </FileDataContext.Provider>
  );
};

  