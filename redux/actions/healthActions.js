// Action for setting health records
export const setHealthRecord = (record) => ({
    type: 'SET_HEALTH_RECORD',
    payload: record,
  });
  
  // Action for setting captured image URI
  export const setCapturedImage = (uri) => ({
    type: 'SET_CAPTURED_IMAGE',
    payload: uri,
  });
  
  // Action for setting disease detection result
  export const setDiseaseDetectionResult = (result) => ({
    type: 'SET_DETECTION_RESULT',
    payload: result,
  });