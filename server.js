const express = require('express');
const app = express();
const PORT = 3050;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
var datas = [{id: 1, name: "kittinut", surname: "pramhan", job: "programmer"},
  {id: 2, name: "juthakarn", surname: "sealime", job: "designer"}];


var routeruser = express.Router();


app.listen(PORT, () => {
  console.log('server listen on port', PORT);
})
app.use('/api', routeruser);
routeruser.route('/user')
  .get((req, res) => {
    res.send(datas);
    //READ
  })
  .post((req, res) => {
    const {name, surname, job} = req.body;
    if (!name && !surname && !job) {
      res.status(400).send({error: "data is not provide"});
    }
    console.log(req.body);
    const id = datas.length + 1;
    var user = {};
    user.id = id;
    user.name = name;
    user.surname = surname;
    user.job = job;
    datas.push(user);
    res.send(datas);
    //CREATE
  });

routeruser.route('/user/:id')
  .get((req,res)=>{
    const {id} = req.params
    const result =  datas.filter(data=>data.id == id)
    res.send(result);
    //Select
  })
  .put((req,res)=>{
    const {name,surname,job} = req.body
    if(!name&&!surname&&!job){
      res.send('data is not provide');
    }
    const {id} = req.params
    const index = id - 1
    datas[index].name = name
    datas[index].surname = surname
    datas[index].job = job
    res.send(datas)
    //Update
    
  })
  .delete((req,res)=>{
    var {id} = req.params;
    id = id -1;
   delete datas[id];
    res.send(JSON.stringify(datas));
    //delete
  })
