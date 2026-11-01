const UaParser = require("ua-parser-js");

function parseUserAgent(userAgent){
    const parser = new UaParser(userAgent);
    const result  =  parser.getResult();

    let device = "Desktop";

     if (result.device.type === "mobile") {
    device = result.device.model || "Mobile Device";
  }

     if (result.device.type === "tablet") {
    device = result.device.model || "Tablet";
  }

  return {
    device,
    browser: result.browser.name || "Unknown Browser",
    browserVersion: result.browser.version || null,
    os: result.os.name || "Unknown OS",
    osVersion: result.os.version || null,
  };
}

module.exports = parseUserAgent;