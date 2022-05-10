var getTimeStamp = function () {
  const timeStamp = Math.round(new Date().getTime() / 1000);
  return timeStamp;
};

const formatResponse = (result)=>{
   return{
     code:result,
   }
}
module.exports = { getTimeStamp,formatResponse };

