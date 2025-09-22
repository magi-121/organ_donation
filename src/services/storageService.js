import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../config/firebase';

export const storageService = {
  // Upload organ image
  async uploadOrganImage(file, organId) {
    try {
      // Create a unique file name
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `organs/${organId}/${fileName}`);
      
      // Upload file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { 
        success: true, 
        url: downloadURL,
        path: snapshot.ref.fullPath 
      };
    } catch (error) {
      console.error('Error uploading image:', error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Upload multiple images
  async uploadMultipleImages(files, organId) {
    try {
      const uploadPromises = files.map(file => this.uploadOrganImage(file, organId));
      const results = await Promise.all(uploadPromises);
      
      const urls = results
        .filter(result => result.success)
        .map(result => ({ url: result.url, path: result.path }));
      
      return { 
        success: true, 
        urls 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Delete image
  async deleteImage(imagePath) {
    try {
      const imageRef = ref(storage, imagePath);
      await deleteObject(imageRef);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Upload user profile picture
  async uploadProfilePicture(file, userId) {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `users/${userId}/profile/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { 
        success: true, 
        url: downloadURL,
        path: snapshot.ref.fullPath 
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  },

  // Upload hospital documents
  async uploadHospitalDocument(file, hospitalId, documentType) {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}_${file.name}`;
      const storageRef = ref(storage, `hospitals/${hospitalId}/${documentType}/${fileName}`);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return { 
        success: true, 
        url: downloadURL,
        path: snapshot.ref.fullPath,
        fileName: fileName
      };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
};
