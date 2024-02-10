const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require("dotenv").config();

class CWAWebClient {
  constructor() {
    this.headers = { "Content-Type": "application/x-www-form-urlencoded" };
  }

  async uploadReport(
    studyInstanceUID,
    reportPath,
    format,
    integrationEngineURL,
    username,
    password
  ) {
    if (!studyInstanceUID.length) {
      return false;
    }

    const formData = new FormData();
    formData.append("studyinstanceuid", studyInstanceUID);
    formData.append("format", format);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("client", "RISES");
    formData.append("report", fs.createReadStream(reportPath));

    try {
      const response = await axios.post(
        `${integrationEngineURL}/RestFulIntegrationService.svc/UploadReport`,
        formData,
        { headers: formData.getHeaders() }
      );

      // Handle response here
      // Example: if(response.data > 0) { ... }
      console.log("Upload successful", response.data);
      return true;
    } catch (error) {
      console.error("Upload failed", error);
      return false;
    }
  }
}

//Usage
const cwaWebClient = new CWAWebClient();
cwaWebClient
  .uploadReport(
    "1234567890",
    "/Users/rushikeshkshirsagar/Desktop/dummy.pdf",
    "PDF",
    process.env.INTEGRATION_ENGINE_URL,
    process.env.USERNAME,
    process.env.PASSWORD
  )
  .then((success) => console.log("Upload finished:", success))
  .catch((error) => console.error("Upload error:", error));
