import React,{useState,useEffect} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.css";



const App1=()=> {
  return <Contacts />
}

const Contacts=()=>{
  const[name,setname]=React.useState("");
  const[num,setnum]=React.useState()
  const[gmail,setgmail]=React.useState("");
  const[contact,setcontact]=useState([]);

const newname=(event)=>{
setname(event.target.value);
}
const newnum=(e)=>{
  setnum(e.target.value)
}
const newgmail=(e)=>{
  setgmail(e.target.value)
}

const handleSubmit=()=>{
  axios.post(" http://localhost:8000/userlist",{name:name,num:num,gmail:gmail}).then(success=>{
    console.log(success.data);
    setcontact([...contact,success.data]);
    setname("");
  })

}

useEffect(()=>{
  fetch()
},[])

const fetch=()=>{
  axios.get(" http://localhost:8000/userlist").then(success=>{
    setcontact(success.data)
  }).catch(error=>{
    console.log("error")
  })
}

const deleteoperation=(deleteid)=>{
    axios.delete(" http://localhost:8000/userlist/"+deleteid).then(success=>{
      fetch()
if(success.Status===200 && success.Text==="OK")
{
    setname([name.filter(i=>i.id!==deleteid)])
}
})
}

const update=(updateid)=>{
  let a=prompt("enter the updated name");
  let b=prompt("enter the updated number");
  let c=prompt("enter the updated gmail")
  
  axios.put(" http://localhost:8000/userlist/"+updateid,{name:a,num:b,gmail:c}).then(success=>{
    fetch()
    setcontact(contact.map(i=>i.id===updateid?[...contact,success.data]:[contact])
  )})
}

return (
  <div className="container-fluid">
  <div  style={{background:"white"}}>
    <form>
      <h2 style={{background:"grey",textAlign:"center"}} >CONTACT MANAGER</h2>
    NAME<input className="form-control" type='text' id='t1' value={ name} onChange={newname} placeholder="type Name here..."></input>
    <br></br>
    NUMBER:<input className="form-control" type="text" onChange={newnum} placeholder="type Number here..."></input>
     <br></br>
     G-MAIL:<input className="form-control" type="gmail" onChange={newgmail} placeholder="type Gmail here..."></input>
     <span ><button className="btn btn-success btn-lg btn-block" onClick={handleSubmit}>Save Contact</button></span>
     </form>
     <table className="table table-dark table-bordered">
       <thead className="table thead-dark">
         <th>NAME</th>
         <th>NUMBER</th>
         <th>GMAIL</th>
       </thead>
       <tbody className="table tbody-striped">
           {
             contact.map((i=>
              {
              return(
                <tr key={i.id} >
              <td>
                {i.name}
              </td>
              <td>{i.num}</td>
              <td>
                {i.gmail}
                
                <button className="btn btn-info float-right"  style={{marginLeft:"20px"}} onClick={()=>deleteoperation(i.id)}>DELETE</button>
                <button className="btn btn-info float-right" style={{marginLeft:"20px"}} onClick={()=>update(i.id)}>UPDATE</button>
              </td>
              </tr>)
           })
             )
          }
       </tbody>
     </table>
</div>
  </div>
)
}
export default App1;