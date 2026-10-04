import Workspace from "../models/Workspace.js";

export const requireWorkspaceMember = async (
  req,
  res,
  next
) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await Workspace.findOne({
      _id: workspaceId,
      "members.user": req.user._id,
    });

    if (!workspace) {
      return res.status(403).json({
        message: "You do not have access to this workspace",
      });
    }

    req.workspace = workspace;

    next();
  } catch (error) {
    console.error(
      "Workspace authorization error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};