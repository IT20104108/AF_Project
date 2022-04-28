const express = require("express");
const Studentgroups = require("../../models/SS_models/studentgroups");

const router = express.Router();

//add panelmember groups
router.post('/addpanelmember',(req, res) => {
  let newStudentgroups = new Studentgroups(req.body);
  newStudentgroups.save((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.status(200).json({
      success: "Student Group create successfully !!!",
    });
  });
});

router.post("/addpanelmember/:id", async (req, res) => {
    const groupId = req.params.id

    try {
      const group1 = await Studentgroups.findById(groupId)
      if (!group1) {
        throw new Error('There is no group..!!!')

      }
        const panel_Member = req.body.panelMember;
        group1.panelMember = panel_Member;
     
        await group1.save();
      
res.status(200).send({ status: "Panel Member Registered.."});


    }catch (error) {
        res
          .status(500)
          .send({ status: "error", error: error.message });
      }
  });



//get student group details
router.route('/displaystudentgroups').get((req,res)=>{
  Studentgroups.find().exec((err,studentgroups)=>{
    if(err){
      return res.status(400).json({
        error:err,
      });
    }
    return res.status(200).json({
      success:true,
      existingStudentgroups :studentgroups
    });
  });
});

//update studentgroups
router.route('/update/:groupID').put((req,res)=>{
  Studentgroups.findByIdAndUpdate(
      req.params.groupID,{
          $set:req.body
      },
      (err,studentgroups)=>{
          
          if(err){
              return res.status(400).json({error:err});
          }
          
          return res.status(200).json({
              success: "Update Successfully"
          });
      });
  });


//Delete student groups
router.route('/delete/:groupID').delete((req,res)=>{
  Studentgroups.findByIdAndRemove(req.params.groupID).exec((err,deleteStudentgroups)=>{
      
      if(err) return res.status(400).json({
          message: "Delete Unsuccessfully",err
      });
     
      return res.json({
          message: "Delete Successfull",deleteStudentgroups
      });
  });
});




module.exports = router;