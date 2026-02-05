
import React, { useState } from 'react'
import api from "../api"
export default function ProductDetail() {
const [name,setname]=useState('')
const [description,setdescription]=useState('')
const [category,setcategory]=useState('')
const [price,setprice]=useState('')
const [images,setimages]=useState([])
const handlerFileChange=(event)=>{
  setimages(event.target.files);
}
const handlerUpload=async()=>{
  if(!images.length|| !name||!price||!category||!description){
    alert("All field is mediantry");
    return;


  }
  const formData=new FormData();
  formData.append("name",name);
  formData.append("description",description);
  formData.append("categeory",category);
  formData.append("price",price);
  for(let i=0;i<images.length;i++){
    formData.append('image',images[i])
  }
  try{
    const resp=await api.post("product/addproduct",formData,{
      headers:{"Content-Type":"multipart/form-data"},
    })
    alert ("product add")
    console.log(resp.data);
  }
  catch(error){
  console.log("error",error)
  }
  }

  return (
    <div>
      <h2> uploadproduct</h2>
      <input type="text" placeholder='name' onChange={(e)=>setname(e.target.value)} />
      <input type="text" placeholder='price' onChange={(e)=>setprice(e.target.value)} />
      <input type="text" placeholder='description' onChange={(e)=>setdescription(e.target.value)} />
      <input type="text" placeholder='categeory' onChange={(e)=>setcategory(e.target.value)} />
      <input type="file" placeholder='image' multiple onChange={handlerFileChange} />
      <button onClick={handlerUpload}>click upload</button>
    </div>
  )
}
