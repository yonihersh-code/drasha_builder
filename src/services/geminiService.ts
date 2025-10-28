import { DrashaOptions } from "../types";

export const generateDrasha = async (options: DrashaOptions): Promise<string> => {
  try {
    const response = await fetch('/api/generate-drasha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ options }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.drasha;
  } catch (error) {
    console.error("Error generating drasha:", error);
    throw new Error("Failed to communicate with the drasha generation service. Please try again.");
  }
};
