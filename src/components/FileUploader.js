import React, { useEffect, useState } from "react";
import { supabase } from "./../config/supabaseClient";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);

  useEffect(() => {
    console.log("Test log outside handleUpload");
  }, []);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);

    // Generate file previews for display
    const fileArray = Array.from(event.target.files);
    const previews = fileArray.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve({
            file,
            preview: reader.result,
          });
        };
      });
    });

    Promise.all(previews).then((results) => {
      setFilePreviews(results);
    });
  };

  const handleUpload = async () => {
    for (const file of selectedFiles) {
      try {
        // Upload each file to the "files" table in Supabase
        const { data, error } = await supabase.storage
          .from("files")
          .upload(`files/${file.name}`, file);

        if (error) {
          throw error;
        }

        console.log("File uploaded successfully:", data);

        // Insert metadata into the "File" table to store information about the uploaded file
        const { data: insertedData, error: insertError } = await supabase
          .from("File")
          .insert([
            {
              filename: file.name,
              size: file.size,
              type: file.type,
              url: data.Key,
            },
          ]);

        if (insertError) {
          throw insertError;
        }

        console.log("File metadata inserted successfully:", insertedData);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {/* Thumbnails */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filePreviews.map((preview) => (
          <div key={preview.file.name} style={{ margin: "10px" }}>
            <img
              src={preview.preview}
              alt={preview.file.name}
              style={{ width: "100px", height: "100px" }}
            />
            <div>
              <p>Name: {preview.file.name}</p>
              <p>Type: {preview.file.type}</p>
              <p>Size: {preview.file.size} bytes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
