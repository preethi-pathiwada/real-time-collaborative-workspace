import Workspace from "../models/Workspace.js";
import Board from "../models/Board.js";

export const createWorkspace = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Workspace name is required",
      });
    }

    const workspace = await Workspace.create({
      name: name.trim(),
      description: description?.trim() || "",
      owner: req.user._id,

      members: [
        {
          user: req.user._id,
          role: "OWNER",
        },
      ],
    });

    const board = await Board.create({
      name: "My First Board",
      description: "Your first collaborative board",
      workspace: workspace._id,
    });

    return res.status(201).json({
      message: "Workspace created successfully",

      workspace: {
        id: workspace._id,
        name: workspace.name,
        description: workspace.description,
        owner: workspace.owner,
        members: workspace.members,
      },

      board: {
        id: board._id,
        name: board.name,
        description: board.description,
        workspace: board.workspace,
      },
    });
  } catch (error) {
    console.error("Create workspace error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getMyWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find({
      "members.user": req.user._id,
    })
      .select("name description owner members createdAt updatedAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      workspaces,
    });
  } catch (error) {
    console.error(
      "Get workspaces error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getWorkspace = async (req, res) => {
  try {
    return res.status(200).json({
      workspace: req.workspace,
    });
  } catch (error) {
    console.error(
      "Get workspace error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};