import { useEffect, useState } from "react";
import api from "../services/api";

export default function ProfileImage({ studentName }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    let objectUrl = null;

    async function loadImage() {
      try {
        const response = await api.get(
          `/student-image/${encodeURIComponent(studentName)}`,
          {
            responseType: "blob",
          }
        );

        objectUrl = URL.createObjectURL(response.data);
        setImageUrl(objectUrl);
      } catch (err) {
        console.error("Failed to load image:", studentName);
      }
    }

    loadImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [studentName]);

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={studentName}
        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow">
      {studentName.charAt(0).toUpperCase()}
    </div>
  );
}