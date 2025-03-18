import React, { useState } from "react";

const ImageCapture = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600 transition">
        Take or Upload Image
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>

      {imageSrc && (
        <img
          src={imageSrc}
          alt="Captured"
          className="max-w-sm w-full rounded-2xl shadow-md border"
        />
      )}
    </div>
  );
};

export default ImageCapture;
