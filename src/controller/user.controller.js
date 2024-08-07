const User = require("../schema/user.model");

// Create and Save a new User
exports.create = async (req, res) => {
  try {
    // Create a User
    const { name, email, password, phone } = req.body;
    const user = await new User({
      name,
      email,
      password,
      phone,
    });

    // Save User in the database
    await user.save();
    res.status(201).send({
      message: "User created successsfully",
      data : user
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

// Find a single user with a useri
exports.findOne = async (req, res) => {
  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    res.status(201).send({
        message: "User found successsfully", data : user
      });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).send({
        message: "User not found with id " + req.params.userId,
      });
    }
    return res.status(500).send({
      message: "Error retrieving user with id " + req.params.userId,
    });
  }
};

// Update a user identified by the userId in the request
exports.update = async(req, res) => {
try{
let user = await   User.findByIdAndUpdate(req.params.userId, {
    name: req.body.name,
    email: req.body.email,
    phone : req.body.phone,
    password: req.body.password
}, {new: true})

if(!user) {
    return res.status(404).send({
        message: "User not found with id " + req.params.userId
    });
}
res.status(201).send({
    message: "User update successsfully", data : user
  });
}catch(error){
    if(error.kind === 'ObjectId') {
        return res.status(404).send({
            message: "User not found with id " + req.params.userId
        });                
    }
    return res.status(500).send({
        message: "Error updating user with id " + req.params.userId
    });
}
};


// Delete a user with the specified user in the request
exports.delete = async(req, res) => {
    try{
       let user =  await User.findByIdAndDelete(req.params.userId)
        if(!user) {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });
        }
        await res.send({message: "user deleted successfully!"});

    }catch(error){
        if(error.kind === 'ObjectId' || error.name === 'NotFound') {
            return res.status(404).send({
                message: "user not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    }
};
