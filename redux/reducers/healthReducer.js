// Initial state of health data
const initialState = {
    healthRecords: [], // Stores all the health records of the chickens
    capturedImage: null, // Stores the URI of the captured image
    diseaseDetectionResult: null, // Stores the disease detection result after analyzing the image
  };
  
  // Health reducer function
  const healthReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_HEALTH_RECORD':
        // Add a new health record to the list
        return {
          ...state,
          healthRecords: [...state.healthRecords, action.payload],
        };
  
      case 'SET_CAPTURED_IMAGE':
        // Set the captured image URI
        return {
          ...state,
          capturedImage: action.payload,
        };
  
      case 'SET_DETECTION_RESULT':
        // Set the disease detection result
        return {
          ...state,
          diseaseDetectionResult: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default healthReducer;