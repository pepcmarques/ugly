let Config = {
  // Development variables
  apiUrl: "https://development.api.server/server/api",
  apiVersion: 6,
  enableHiddenFeatures: true,
};

if (process.env.APP_ENV === "production") {
  Config.apiUrl = "https://production.api.server/server/api";
  apiVersion: 6, (Config.enableHiddenFeatures = false);
} else if (process.env.APP_ENV === "staging") {
  Config.apiUrl = "https://staging.api.server/server/api";
  apiVersion: 6, (Config.enableHiddenFeatures = true);
}

export default ({ config }) => {
  const mergedConfig = {
    ...config,
    ...Config,
  };

  return mergedConfig;
};
