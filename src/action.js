function reg(){
    document.getElementById("form1").style.display="none";
    document.getElementById("form2").style.display="block";
}

function log(){
    document.getElementById("form2").style.display="none";
    document.getElementById("form1").style.display="block";
}

function feed(){
    var data={ name:document.getElementById("name").value,
               pass:document.getElementById("pass").value
            }
    var mail=document.getElementById("mail").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(mail)) {
    alert('Please provide a valid email address');}
    else{
        data.mail=document.getElementById("mail").value;
        var xhttp= new XMLHttpRequest();
xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status==200){
        alert("Registered Successfully");
    }
    else{console.log("error1");
    }
}
xhttp.open("POST","http://localhost:3000/post",true);
xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
xhttp.send(JSON.stringify(data));
    }
console.log(data);

}



function validate(){
    var pas = document.getElementById("pas").value;
   var id = document.getElementById("id").value;
   sessionStorage.setItem("loginID",id);
   var xhttp= new XMLHttpRequest();
xhttp.onreadystatechange=function(){
    if(this.readyState == 4 && this.status==200){
       
      alert("success");
      window.location="../src/data.html";
    }
    else{console.log("please register");
    }
}
xhttp.open("GET","http://localhost:3000/val/"+id+"/"+pas,true);
xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
xhttp.send();

}



function info(){
  
    var info= { name:document.getElementById("Sname").value,
                
                age:document.getElementById("Sage").value,
                dob:document.getElementById("Sdob").value,
                degree:document.getElementById("Sdegree").value,
                email:document.getElementById("Semail").value,
                mobile:document.getElementById("Smobile").value,
                logemail:sessionStorage.getItem("loginID")    
        }  
        if(document.getElementById("Sgender").checked){
            info.gender= "male";
        }
        else{
            info.gender= "Female";
        }
       

   var xhttp= new XMLHttpRequest();
   xhttp.onreadystatechange=function(){
       if(this.readyState==4 && this.status==200){
           alert("Data saved successfully");
       }
       else{
           console.log("error: data sending failed")
       }

   }
   xhttp.open("POST","http://localhost:3000/datasend",true);
   xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
   xhttp.send(JSON.stringify(info));

}

function viewall(){
    var log= sessionStorage.getItem("loginID");
    if(!log){
        window.location="../public/index.html";
    }
    var xhttp= new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200){
           console.log(this.responseText);
           var sdata=JSON.parse(this.responseText);
           var data_length= sdata.length;
           console.log(sdata[0].name);
           var display= document.getElementById("table");
           display.innerHTML=" <tr><th >S.no</th><th>Student Name</th><th>Gender</th><th>Age</th><th>D.O.B</th><th>Degree</th><th>Email</th><th>Mobile</th></tr>";        
       
           for(var i=data_length-1;i>-1;i--){
           
           if(sdata[i].logemail== sessionStorage.getItem("loginID") ){
            display.innerHTML+="<tr><td>"+1+"</td><td>"+sdata[i].name+"</td><td>"+sdata[i].gender+"</td><td>"+sdata[i].age+"</td><td>"+sdata[i].dob+"</td><td>"+sdata[i].degree+"</td><td>"+sdata[i].email+"</td><td>"+sdata[i].mobile+"</td></tr>";
            break
        }}
        }
        else{
            console.log("error: data failed to receive")
        }
    }
    xhttp.open("GET","http://localhost:3000/getallinfo",true);
    xhttp.setRequestHeader("Content-Type","application/json;charset=UTF8");
    xhttp.send();
}

function redirect(){
   
    var log= sessionStorage.getItem("loginID");
   
    if(!log){
        window.location="../public/index.html";
       
    }
}
function logout(){
    sessionStorage.removeItem("loginID");
}

function fileload(){
    var fil= sessionStorage.getItem("loginID");
    if(fil){
        window.location="../src/data.html";
    }
}