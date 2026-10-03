import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";
import Workspace from "./models/Workspace.js";
import Board from "./models/Board.js";
import List from "./models/List.js";
import Card from "./models/Card.js";
import Invitation from "./models/Invitation.js";

dotenv.config();

const testModels = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    console.log("User collection:", User.collection.name);
    console.log(
      "Workspace collection:",
      Workspace.collection.name
    );
    console.log("Board collection:", Board.collection.name);
    console.log("List collection:", List.collection.name);
    console.log("Card collection:", Card.collection.name);
    console.log(
      "Invitation collection:",
      Invitation.collection.name
    );

    await mongoose.connection.close();

    console.log("Model verification completed");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testModels();