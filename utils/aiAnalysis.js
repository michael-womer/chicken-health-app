// aiAnalysis.js

import axios from 'axios';

/**
 * Function to analyze chicken health via image using an external AI model/API.
 * 
 * @param {string} imageUri - The URI of the captured image.
 * @returns {Promise<Object>} - The AI analysis result.
 */
export const analyzeImage = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg', // Make sure the image type is correct based on what you're sending
      name: 'chicken_image.jpg',
    });

    // Send the image to your AI API for analysis
    const response = await axios.post('https://your-ai-service.com/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Assuming the response contains a 'result' field with analysis data
    return response.data.result;
  } catch (error) {
    console.error('Error during image analysis:', error);
    throw new Error('Image analysis failed');
  }
};

/**
 * A helper function to process the analysis results (e.g., formatting or classifying diseases).
 * 
 * @param {Object} analysisData - The data returned by the AI model after analysis.
 * @returns {string} - A formatted message or classification result.
 */
export const processAnalysisResults = (analysisData) => {
  // This is just an example; modify based on the actual structure of your analysis data
  if (analysisData && analysisData.diseaseDetected) {
    return `Warning! Disease detected: ${analysisData.diseaseName}. Please consult a veterinarian.`;
  } else {
    return 'No diseases detected. Your chicken is healthy!';
  }
};