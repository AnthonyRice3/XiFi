// eslint-disable-next-line @typescript-eslint/no-require-imports
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;
const TARGET_EMAIL = "rnarice3@gmail.com";

if (!MONGODB_URI) { console.error("MONGODB_URI not set"); process.exit(1); }

mongoose.connect(MONGODB_URI, { dbName: "application" }).then(async () => {
  const result = await mongoose.connection.db
    .collection("users")
    .findOneAndUpdate(
      { email: TARGET_EMAIL },
      { $set: { role: "admin" } },
      { returnDocument: "after" }
    );
  if (!result) {
    console.error("No user found with email:", TARGET_EMAIL);
    process.exit(1);
  }
  console.log("Done:", result.email, "->", result.role);
  await mongoose.disconnect();
  process.exit(0);
}).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
