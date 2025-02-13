const LoginPage = () => {
  async function handleLogin(e){
    try{
     e.preventDefault();
     const {email,password}=e.target;
     const res=await fetch("http://localhost:1502/api/v1/login",{
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"

      },
      body: JSON.stringify({email,password})
     });
     const data=await res.json();
     alert(JSON.stringify(data));
    }
    catch(err){
      alert("Login Error",err);
    }
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
  <div className="mb-3">
    <label className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    </div>
  <div className="mb-3">
    <label className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
   </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default LoginPage
