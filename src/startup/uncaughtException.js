module.exports = function () {
  process.on("uncaughtException", (error, source) => {
    console.log(error);
  });
};