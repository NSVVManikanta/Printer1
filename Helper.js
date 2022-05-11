var getTimeStamp = function () {
  const timeStamp = Math.round(new Date().getTime() / 1000);
  return timeStamp;
};

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
module.exports = { getTimeStamp,formatResponse,successResponse };

