let Config = {
  // Development variables
  apiUrl: "http://ugly.veraldi.ca/api",
  apiVersion: "0.1.0",
  enableHiddenFeatures: true,
};

if (process.env.APP_ENV === "production") {
  Config.apiUrl = "http://ugly.veraldi.ca/api";
  apiVersion: "0.1.0", (Config.enableHiddenFeatures = false);
} else if (process.env.APP_ENV === "staging") {
  Config.apiUrl = "http://ugly.veraldi.ca/api";
  apiVersion: "0.1.0", (Config.enableHiddenFeatures = true);
}

export default ({ config }) => {
  const mergedConfig = {
    ...config,
    ...Config,
  };

  return mergedConfig;
};
