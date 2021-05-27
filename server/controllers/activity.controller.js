const { Activity } = require('../models/activity.model')


module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
}

module.exports.createActivity = (request, response) => {
    Activity.create(request.body)
        .then(activity => response.json(activity))
        .catch(err => response.status(400).json(err));
}

module.exports.getAllActivities = (request, response) => {
    Activity.find({})
        .then(activities => response.json(activities))
        .catch(err => response.json(err))
}

module.exports.getActivity = (request, response) => {
    Activity.findOne({_id:request.params.id})
        .then(activity => response.json(activity))
        .catch(err => response.json(err))
}

module.exports.updateActivity = (request, response) => {
    Activity.findOneAndUpdate({_id: request.params.id}, request.body, {
        runValidators: true,
        new:true})
        .then(updatedActivity => response.json(updatedActivity))
        .catch(err => response.status(400).json(err))
}

module.exports.deleteActivity = (request, response) => {
    Activity.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
