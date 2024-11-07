/** @type { import("drizzle-kit").Config} */

export default {
  schema: "./utils/schema.js",
  dialect:'postgresql',
  dbCredentials:{
    url: 'postgresql://demo_owner:ofUGs1iW0pPX@ep-purple-surf-a5guudf0.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  }
};
