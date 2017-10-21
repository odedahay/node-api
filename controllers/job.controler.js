const jobs = require('../config/jobs');
const Job = require('../models/job.model');

module.exports = {

 create(req, res){

   let title = req.body.title;
   let description = req.body.description;
   let duration = req.body.duration;

   if(!title){
     return res.status(400).send({err: 'title is required property'});
   }

   let job = { title, description, duration};

   const newJob = new Job(job);

   // Save job to DB
   newJob.save(err =>{
     if(err){
       return res.status(500).send(err);
     }
   })
   return res.status(200).json(newJob);
 },
 findAll(req, res){
     // call the find method of Job Model
     Job.find({}, (err, jobs) => {
         //if error occurred send error with 404 status code
         if (err) {
             return res.status(404).send(err);
         }
         //return all the jobs to the server with 200 status
         return res.status(200).json(jobs);
     })

 },
 findOne(req, res){
   //get the id from the req params
   let id = req.params.id;

   if(!id){
     return res.status(400).send({err: 'id is required field'});

   }

   Job.findById(id, (err, job) => {

       //if err comes then send 404
       if(err){
           return res.status(404).send(err);
       }

       //send the job as response
       return res.status(200).json(job);
    })

  },

  update(req, res){
    let id = req.params.id;
    let title = req.body.title;
    let description = req.body.description;
    let duration = req.body.duration;

    let jobAttributes = {};

    // if user want to update title
    if(title){
        jobAttributes.title = title;
    }
    if(description){
      jobAttributes.description = description;
    }
    if(duration){
      jobAttributes.duration = duration;
    }

    Job.update({_id:id}, jobAttributes, (err, result)=>{
      if(err){
        return res.status(500).send(err);
      }
      return res.status(200).json({msg: `Job is updated with id ${id}`});
    })

  },
  delete(req, res){
    //get the id from the req params
    let id = req.params.id;

    Job.findByIdAndRemove(id, err =>{
      if(err){
        return res.status(500).send(err);
      }
      return res.status(200).json({msg: `Job is deleted this ID: ${id}`})
    })

  }


};
