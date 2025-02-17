import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

const ImageUploader = ({ images, setImages }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      url: URL.createObjectURL(file), // Preview
      file, // Store file for upload
    }));
    setSelectedFiles([...selectedFiles, ...newImages]);
  };

  // Handle image upload (Mock function)
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("No new images selected!");
      return;
    }

    try {
      // Here, you can integrate your actual API upload logic
      const uploadedImages = selectedFiles.map((img) => ({
        url: img.url, // Replace this with the actual uploaded URL from the API
        _id: Math.random().toString(36).substr(2, 9), // Mock ID
      }));

      setImages([...images, ...uploadedImages]);
      setSelectedFiles([]);
      toast.success("Images uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload images!");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Product Images</h2>

      {/* Display Existing Images */}
      <div className="flex flex-wrap gap-2 mb-4">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.url}
            alt="Product"
            className="w-24 h-24 object-cover rounded-md shadow"
          />
        ))}
      </div>

      {/* New Image Previews */}
      {selectedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFiles.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md shadow"
            />
          ))}
        </div>
      )}

      {/* Upload Section */}
      <div className="flex gap-2">
        <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
        <Button onClick={handleUpload}>Upload</Button>
      </div>
    </div>
  );
};

export default ImageUploader;
