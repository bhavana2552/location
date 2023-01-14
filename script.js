const button=document.getElementById('button');
const main=document.querySelector('main');
const ipAddressSpan=document.getElementById('ipAddress');
const pinCodeParent=document.querySelector('.displayPostalCodes');
const ipAddressBody=document.querySelector('#ipAddressData');
const map=document.querySelector('iframe');


let ipAddress;

function showIpAddress()
{
    fetch('https://api.ipify.org/?format=json')
    .then(response => response.json())
      .then(json =>{
        ipAddress=json.ip;
        console.log(ipAddress)
        ipAddressSpan.textContent=ipAddress;
        
      })
}
function showUserDetails(){
    ipAddressBody.style.display="block";

     ipAddress=ipAddressSpan.textContent;
     console.log(ipAddress);
     
     let url=`https://ipinfo.io/${ipAddress}/?token=047be483d0ec52`
     fetch(url)
     .then(response=>response.json())
     .then(json=>{
         let result=json;
         let arr=result.loc?.split(',')
         map.src=`//maps.google.com/maps?q=${result.loc}&z=15&output=embed`
      console.log(arr);
      document.getElementById('lat').textContent=`Latitude: ${arr[0]}`
      document.getElementById('long').textContent=`Longitude: ${arr[1]}`
      document.getElementById('city').textContent=`City: ${result.city}`
      document.getElementById('region').textContent=`Region: ${result.region}`
      document.getElementById('organisation').textContent=`Organisation: ${result.org}`
      document.getElementById('hostName').textContent=`HostName: ${window.location.hostame}`
      document.getElementById('time-zone').textContent=`${result.timezone}`
      let timeZone=new Date().toLocaleString("en-US", { timeZone: `${result.timezone}` });
      document.getElementById('dateAndTime').textContent=timeZone;
      console.log(result)
      showPinCodeList(result);
    })
    .catch(error=>{
        console.log(error)
        alert("Something went wrong. Please try after Sometime")
    })
}
let postOfficeData;
function showPinCodeList(data){
   
    let url=`https://api.postalpincode.in/pincode/${data.postal}`;
    document.getElementById('pinCode').textContent=data.postal;
    fetch(url)
    .then(response=>response.json())
    .then(json=>{
        console.log("postadetails",json)
        postOfficeData=json[0].PostOffice;
        console.log("post office data",postOfficeData)
       document.getElementById('pinCodeCount').textContent=json[0].Message;
       
        json[0].PostOffice.forEach(pinCode=>{
            pinCodeParent.innerHTML+=`
            <div class="postalCode">
            <p>Name: ${pinCode.Name}</p> 
            <p>Branch Type: ${pinCode.BranchType}</p> 
            <p>Delivery Status: ${pinCode.DeliveryStatus}</p> 
            <p>District: ${pinCode.District}</p> 
            <p>Division: ${pinCode.Division}</p> 
         </div>`
        })
    
     
    })
    .catch(error=>{
        console.log(error)
        alert("Something went wrong. Please try after Sometime")
    })
    
   

   
}

function applyFilter(filterValue){
    console.log("key value passed")
   
    let data= sessionStorage.getItem("data1")
    let listOfPinCode=document.querySelectorAll('.postalCode')
    console.log("list",listOfPinCode,postOfficeData[0].Name)
   
    for (i = 0; i < listOfPinCode.length; i++) {
        console.log("Pin code length",listOfPinCode.length)
        console.log("post office inside filter",postOfficeData);
        console.log("cfedeq",postOfficeData[i].Name?.toUpperCase().includes(filterValue)  )
        if(filterValue==""){
            listOfPinCode[i].style.display = "block";
        }
        else if (postOfficeData[i].Name.toLowerCase().includes(filterValue.toLowerCase())  || postOfficeData[i].BranchType.toLowerCase().includes(filterValue.toLowerCase()) ) {
        
            listOfPinCode[i].style.display = "block";
            console.log("if",postOfficeData[i].Name,(filterValue))
        } else {
            listOfPinCode[i].style.display = "none";
            console.log("else")
        }
      }



}
document.addEventListener('DOMContentLoaded',showIpAddress);
button.addEventListener('click',showUserDetails)

