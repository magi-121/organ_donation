import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { storageService } from '../../services/storageService';

const ImageUpload = ({ 
  onUploadComplete, 
  maxFiles = 5, 
  acceptedTypes = 'image/*',
  entityId,
  entityType = 'organ' 
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [error, setError] = useState('');

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + uploadedImages.length > maxFiles) {
      setError(`Maximum ${maxFiles} images allowed`);
      return;
    }

    setError('');
    setUploading(true);

    // Create previews
    const newPreviews = [];
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          file,
          preview: reader.result
        });
        
        if (newPreviews.length === files.length) {
          setPreviews([...previews, ...newPreviews]);
        }
      };
      reader.readAsDataURL(file);
    }

    // Upload files
    try {
      const result = await storageService.uploadMultipleImages(files, entityId);
      
      if (result.success) {
        const newImages = [...uploadedImages, ...result.urls];
        setUploadedImages(newImages);
        onUploadComplete(newImages);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('Failed to upload images');
    }

    setUploading(false);
  };

  const removeImage = async (index, imagePath) => {
    try {
      if (imagePath) {
        await storageService.deleteImage(imagePath);
      }
      
      const newImages = uploadedImages.filter((_, i) => i !== index);
      const newPreviews = previews.filter((_, i) => i !== index);
      
      setUploadedImages(newImages);
      setPreviews(newPreviews);
      onUploadComplete(newImages);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Upload Images
        </label>
        <span className="text-sm text-gray-500">
          {uploadedImages.length}/{maxFiles} uploaded
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Preview uploaded images */}
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview.preview}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index, uploadedImages[index]?.path)}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
            {uploading && index >= uploadedImages.length && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full"></div>
              </div>
            )}
          </div>
        ))}

        {/* Upload button */}
        {uploadedImages.length < maxFiles && (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
            <input
              type="file"
              multiple
              accept={acceptedTypes}
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Image</span>
          </label>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
