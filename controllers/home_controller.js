module.exports.home = function (req, res) {
  try {
    // console.log("Hello");
    return res.render('home', {
      title: 'Text Search APP',
    });
  } catch (err) {}
};
