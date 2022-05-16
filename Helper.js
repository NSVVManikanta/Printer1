var getTimeStamp = function () {
  const timeStamp = Math.round(new Date().getTime() / 1000);
  return timeStamp;
};

const getDate = function () {
  var date = new Date();
  var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return str;
}

const formatResponse = (result)=>{
   return{
     code:result,
   }
}

const successResponse = (result,message)=>{
  return{
    data:result,
    message:message
  }
}
module.exports = { getTimeStamp,formatResponse,successResponse,getDate };



