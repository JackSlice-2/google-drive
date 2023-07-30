import React, { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { Input } from "@mui/material";

const FileTable = () => {
    const [files, setFiles] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
  
    useEffect(() => {
      // Fetch files from the "File" table in Supabase
      const fetchFiles = async () => {
        const { data, error } = await supabase.from("File").select("*");
        if (error) {
          console.error("Error fetching files:", error);
        } else {
          setFiles(data);
          setFilteredFiles(data);
        }
      };
      fetchFiles();
    }, []);
  
    const handleSearch = (event) => {
      const searchTerm = event.target.value.toLowerCase();
      const filtered = files.filter((file) =>
        file.filename.toLowerCase().includes(searchTerm)
      );
      setFilteredFiles(filtered);
    };
  
    return (
      <div>
        <Input
          type="text"
          placeholder="Search by filename..."
          onChange={handleSearch}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredFiles.map((file) => (
            <div key={file.id} style={{ margin: "10px", maxWidth: "200px" }}>
              <img
                src={file.url}
                alt={file.filename}
                style={{ width: "100%", height: "auto" }}
              />
              <div>
                <p>Name: {file.filename}</p>
                <p>Type: {file.type}</p>
                <p>Size: {file.size} bytes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FileTable;
  