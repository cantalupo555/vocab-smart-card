// Import necessary dependencies and utility functions
import { Dispatch, SetStateAction } from 'react';
// import { validateAndRefreshToken } from './validateAndRefreshToken'; // Removed deprecated import
import { TokenCount, APIServiceOption, LLMOption, FrequencyAnalysis } from './Types';

// Define the backend API URLs, using environment variables
// const ANALYZE_FREQUENCY_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/analyze/frequency'; // No longer needed

// Function to handle word frequency analysis
export const handleAnalyzeFrequency = async (
    setFrequencyAnalysis: Dispatch<SetStateAction<FrequencyAnalysis | null>>,
    setIsAnalyzeLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<string | null>>,
    updateTotalTokenCount: (tokenCount: TokenCount) => void,
    setIsFrequencyModalOpen: Dispatch<SetStateAction<boolean>>,
    nativeLanguage: string,
    targetLanguage: string,
    selectedAPIService: APIServiceOption,
    selectedLLM: LLMOption,
    word: string,
    // Replace token parameter with callApiWithAuth function
    callApiWithAuth: (url: string, options?: RequestInit) => Promise<Response>
) => {
  // Validate required fields
  if (!nativeLanguage || !targetLanguage || !selectedAPIService || !word || selectedLLM.value === '') {
    setError('Please fill in all required fields.');
    return;
  }

  setError(null); // Clear any previous errors
  setIsAnalyzeLoading(true); // Set loading state

  try {
    // Log request details for debugging
    console.log('Sending frequency analysis request...');
    console.log('Request payload:', { 
      word, 
      targetLanguage, 
      nativeLanguage, 
      apiService: selectedAPIService.value, 
      llm: selectedLLM.value
    });

    // No need for explicit token check here

    // Send POST request using callApiWithAuth
    const analysisResponse = await callApiWithAuth(`/generate/frequency`, { // Corrected path: /generate/frequency
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization header is handled by callApiWithAuth
      },
      body: JSON.stringify({
        word: word,
        targetLanguage: targetLanguage,
        nativeLanguage: nativeLanguage,
        apiService: selectedAPIService.value,
        llm: selectedLLM.value
      }),
    });

    // Log response status for debugging
    console.log('Response status for analysis:', analysisResponse.status);

    // Check if response is successful
    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${analysisResponse.status}, message: ${errorText}`);
    }

    // Parse response JSON
    const analysisData = await analysisResponse.json();
    console.log('Received analysis data:', {
      analysis: analysisData.analysis.substring(0, 100) + '...', // Mostra os primeiros 100 caracteres
      tokenCount: analysisData.tokenCount
    });

    // Validate response data structure
    if (
        analysisData.analysis && typeof analysisData.analysis === 'string' &&
        analysisData.tokenCount && typeof analysisData.tokenCount === 'object' &&
        'inputTokens' in analysisData.tokenCount &&
        'outputTokens' in analysisData.tokenCount &&
        'totalTokens' in analysisData.tokenCount
    ) {
      // Create and set frequency analysis object
      const analysis: FrequencyAnalysis = {
        text: analysisData.analysis,
        tokenCount: analysisData.tokenCount
      };
      setFrequencyAnalysis(analysis);
      updateTotalTokenCount(analysisData.tokenCount);
      console.log('Set frequency analysis:', {
        analysis: analysis.text.substring(0, 100) + '...',
        tokenCount: analysis.tokenCount
      });
      setIsFrequencyModalOpen(true); // Open frequency analysis modal
    } else {
      console.error('Invalid analysis data structure:', analysisData);
      throw new Error('Received invalid analysis data from the server.');
    }
  } catch (error: unknown) {
    console.error('Error in handleAnalyzeFrequency:', error);
    if (error instanceof Error) {
      setError(`An error occurred while fetching frequency analysis: ${error.message}`);
    } else {
      setError('An unknown error occurred while fetching frequency analysis.');
    }
  } finally {
    setIsAnalyzeLoading(false); // Reset loading state
  }
};
