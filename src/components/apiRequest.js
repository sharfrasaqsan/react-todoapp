const apiRequest = async (
  url = "",
  optionsObject = null,
  errorMessage = null
) => {
  try {
    const response = await fetch(url, optionsObject);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errorMessage = err.message;
  } finally {
    return errorMessage;
  }
};

export default apiRequest;
