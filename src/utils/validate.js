export  const validate=({email,password})=>{
  
    const isemail=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);
    const ispassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

    if(!isemail) return "Invalid Email Address";

    if(!ispassword)  return "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.";
    
    return null;
}