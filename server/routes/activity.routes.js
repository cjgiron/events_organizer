const ActivityController = require('../controllers/activity.controller');
module.exports = function(app){
    app.get('/api', ActivityController.index);
    app.get('/api/activities', ActivityController.getAllActivities);
    app.post('/api/activities', ActivityController.createActivity);
    app.put('/api/activities/:id', ActivityController.updateActivity);
    app.get('/api/activities/:id', ActivityController.getActivity);
    app.delete('/api/activities/:id', ActivityController.deleteActivity);
}