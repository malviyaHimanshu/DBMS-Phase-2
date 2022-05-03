const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const connection = require("../connection");

let myUsers = {};

router.get('/', (req, res, next) => {
  res.render('index.ejs');
})


router.post('/create', (req, res, next) => {
  const userDetails = req.body;
  const fullname = req.body.fullname;
  const gender = req.body.gender;
  const mode_of_transport = req.body.mode_of_transport;
  const age = req.body.age;
  const from_place = req.body.from_place;
  const date_start = req.body.date_start;
  const to_place = req.body.to_place;
  const date_end = req.body.date_end;
  var sql = `INSERT INTO TRAVELLERS VALUES("${fullname}", "${gender}", "${mode_of_transport}", "${age}", "${from_place}", "${date_start}", "${to_place}", "${date_end}")`;
  connection.query(sql, (err, data) => {
    if (err) throw err;
    console.log("Inserted successfully!!");
    res.sendStatus(200);
  });
  
  myUsers = {
    "fullname": fullname,
    "gender": gender,
    "mode_of_transport": mode_of_transport,
    "age": age,
    "from_place": from_place,
    "date_start": date_start,
    "to_place": to_place,
    "date_end": date_end
  };

  // res.cookie("userdetails", userDetails, {httpOnly: true});
  // res.redirect(`/find`);
  res.redirect('/');
  
});


router.get('/find', async (req, res) => {
  // const fullname = req.body.fullname;
  // const gender = req.body.gender;
  // const mode_of_transport = req.body.mode_of_transport;
  // const age = req.body.age;
  // const from_place = req.body.from_place;
  // const date_start = req.body.date_start;
  // const to_place = req.body.to_place;
  // const date_end = req.body.date_end;
  // const details = await req.cookies["userdetails"];
  const mysql = `SELECT DISTINCT * FROM TRAVELLERS WHERE mode_of_transport='${myUsers["mode_of_transport"]}' AND from_place='${myUsers["from_place"]}' AND date_start='${myUsers["date_start"]}' AND to_place='${myUsers["to_place"]} AND date_end='${myUsers["date_end"]}';`;
  connection.query(mysql, (err, data) => {
    if (err) throw err;
    req.setHeader('Content-Type', 'application/json');
    res.json(data.rows);
    console.log("Finding Successful!");
    res.sendStatus(200);
  })
  // res.clearCookie("userdetails");
})


router.get("/travellers", (req, res) => {
  const mysqlQuery = "SELECT * FROM TRAVELLERS";
  connection.query(mysqlQuery, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log("Query Executed Successfully");
      res.sendStatus(200);
    } else {
      console.log(err);
    }
  });
});

// router.post("/", (req, res) => {
//   const travellersDetails = req.body;
//   // const name = req.body.name;
//   // const gender = req.body.gender;
//   // const mode_of_transport = req.body.mode_of_transport;
//   // const age = req.body.age;
//   // const from_place = req.body.from_place;
//   // const date_start = req.body.date_place;
//   // const to_place = req.body.to_place;
//   // const date_end = req.body.date_end;

//   // const newTraveller = connection.query(`INSERT INTO TRAVELLERS VALUES("$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8")`, [name, gender, mode_of_transport, age, from_place, date_start, to_place, date_end]);
//   connection.query(
//     `INSERT INTO TRAVELLERS VALUES("${travellersDetails.name}", "${travellersDetails.gender}", "${travellersDetails.mode_of_transport}", "${travellersDetails.age}", "${travellersDetails.from_place}", "${travellersDetails.date_start}", "${travellersDetails.to_place}", "${travellersDetails.date_end}");`,
//     travellersDetails,
//     (err, data) => {
//       if (err) throw err;
//       console.log("INSERTED SUCCESSFULLY!!");
//     }
//   );
//   res.redirect("/");
//   // res.json(newTraveller.rows[0]);
// });

module.exports = router;

// CREATE TABLE TRAVELLERS(
//     Name                VARCHAR(30),
//     Gender              VARCHAR(10),
//     Mode_of_Transport   VARCHAR(10),
//     Age                 INT,
//     From_place          VARCHAR(20),
//     Date_start          DATE,
//     To_place            VARCHAR(20),
//     Date_end            DATE
// );
