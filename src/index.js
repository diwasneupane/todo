import { app } from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`port is running at port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log(`error connecting to database:${error}`);
  });
