import { Lead } from "../models/lead.model.js";

const allowedStatuses = [
  "new",
  "contacted",
  "qualified",
  "converted",
  "unqualified",
];

const createLead = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { name, email, status } = req.body || {};
    if (!name || !email || !status) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Status are required" });
    }
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `Status must be one of the following: ${allowedStatuses.join(
          ", "
        )}`,
      });
    }
    const lead = await Lead.create({ name, email, status, owner: userId });
    return res.status(201).json({ message: "Lead created successfully", lead });
  } catch (error) {
    console.log("create lead error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getLeads = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const filter = req?.user?.role === "admin" ? {} : { owner: userId };
    const leads = await Lead.find(filter);
    return res.json({ message: "Leads fetched successfully", leads });
  } catch (error) {
    console.log("get leads error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateLead = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    console.log("role", req.user.role);

    if (lead.owner.toString() !== userId && req?.user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: You don't have permission to update this lead",
      });
    }
    const { name, email, status } = req.body || {};
    if (name) {
      lead.name = name;
    }
    if (email) {
      lead.email = email;
    }
    if (status) {
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          message: `Status must be one of the following: ${allowedStatuses.join(
            ", "
          )}`,
        });
      }
      lead.status = status;
    }
    await lead.save();
    return res.json({ message: "Lead updated successfully", lead });
  } catch (error) {
    console.log("update lead error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getLeadById = async (req, res) => {
  try {
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    if (lead.owner.toString() !== userId && req?.user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: You don't have permission to update this lead",
      });
    }
    return res.json({ message: "Lead fetched successfully", lead });
  } catch (error) {
    console.log("get lead by id error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteLead = async (req, res) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const leadId = req.params.id;
    const lead = await Lead.findById(leadId);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    if (lead.owner.toString() !== userId && req?.user?.role !== "admin") {
      return res.status(403).json({
        message: "Forbidden: You don't have permission to update this lead",
      });
    }
    await lead.deleteOne();
    return res.json({ message: "Lead deleted successfully", lead });
  } catch (error) {
    console.log("delete lead error:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

export { createLead, getLeads, updateLead, getLeadById, deleteLead };
