const Resource = require("../models/Resource");

exports.getHome = (req, res) => {
  res.render("home");
};

exports.getDashboard = async (req, res) => {
  const { search } = req.query;
  let query = {};

  if (search) {
    query = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } }
      ]
    };
  }

  const resources = await Resource.find(query);
  res.render("dashboard", { resources, search });
};


exports.getResourceForm = (req, res) => {
  res.render("resource");
};

exports.addResource = async (req, res) => {
  const { name, type, description } = req.body;
  const newResource = new Resource({ name, type, description });
  await newResource.save();
  res.redirect("/dashboard");
};


// View a single resource
exports.viewResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).send("Resource not found");
  res.render("viewResource", { resource });
};

// Render edit form
exports.getEditResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (!resource) return res.status(404).send("Resource not found");
  res.render("editResource", { resource });
};

// Update the resource
exports.updateResource = async (req, res) => {
  const { name, type, description } = req.body;
  await Resource.findByIdAndUpdate(req.params.id, { name, type, description });
  res.redirect("/dashboard");
};

// Delete the resource
exports.deleteResource = async (req, res) => {
  await Resource.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard");
};
