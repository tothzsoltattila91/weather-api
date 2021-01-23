class ApiError extends Error {}

class RestClient {
  public static async get<R>(url: string): Promise<R> {
    try {
      const response = await fetch(url);

      if (response.status === 400) {
        throw new ApiError("You must type in a city.");
      }

      if (response.status === 404) {
        throw new ApiError("City is not existing, try another.");
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("An error occured, try again later.");
    }
  }
}

export { RestClient };
