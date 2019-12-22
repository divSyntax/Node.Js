const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//get all members
router.get('/', (req, res) => res.json(members));

//create method
router.post('/', (req, res) => 
{
    const newMember = 
    {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email)
    {
        res.status(400).json({msg: "Please include name and email."});
    }else
    {
         members.push(newMember);
    }

    res.json(members);
});

//update member
router.put("/update/:id", (req, res) => 
{
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) 
  {
        const updMemeber = req.body;
         members.forEach(member =>{
        if(member.id === parseInt(req.params.id))
        {
            member.name = updMemeber.name ? updMemeber.name : member.name;
            member.email = updMemeber.email ? updMemeber.email : member.email;
            res.json({msg: "Member updated successful!", member});
        }
      });
  } else {
    res.status(400).json({
      msg: `Member with id of ${req.params.id} not found.`
    });
  }
});

//get one member
router.get('/:id', (req, res) => 
{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({
            msg: `Member with id of ${req.params.id} not found.`
        });
    }
});


//delete member
router.delete("/delete/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({msg:"Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});
  } else {
    res.status(400).json({
      msg: `Member with id of ${req.params.id} not found.`
    });
  }
});


module.exports = router;