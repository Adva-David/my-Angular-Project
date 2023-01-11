class Config {
  public connectionString = "mongodb://127.0.0.1:27017/admin"; // Fill in the blank (database name)...
  public port = 5001;
  public socketPort = 5002;
}

const config = new Config();

export default config;
