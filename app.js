//jshint esversion: 6

const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();


app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {

    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/428844d007";

  const options = {
    method: "POST",
    headers: {
       Authorization: "auth a3f1053d3cdaaa86c07ad9c1301b318bb-us21"
   },
  }

    const request = https.request(url, options, function(response){

      if (response.statusCode === 200) {
          res.sendFile(__dirname + "/success.html");
      } else {
          res.sendFile(__dirname + "/failure.html");
      };

      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })


    request.write(jsonData);
    request.end();

    app.post("/failure", function(req, res){
      res.redirect("/")
    })

});



app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000")
});

//Unique id-key 428844d007

//API Key 3f1053d3cdaaa86c07ad9c1301b318bb-us21

// https://us21.api.mailchimp.com/3.0/lists/    url email_address

// MailchimpSDK.initialize(token: ed62426e7a1d203df85014adfab9c7a1-us21)
// var contact: Contact = Contact(emailAddress: "Insert Email Here")
// MailchimpSDK.createOrUpdate(contact: contact) { result in
//     switch result {
//     case .success:
//         print("Successfully added or updated contact")
//     case .failure(let error):
//         print("Error: \(error.localizedDescription)")
//     }
// }


// mailchimp json

// {
//   "new_members": [
//     {
//       "id": "string",
//       "email_address": "string",
//       "unique_email_id": "string",
//       "email_type": "string",
//       "status": "subscribed",
//       "merge_fields": {
//         "property1": null,
//         "property2": null
//       },
//       "interests": {
//         "property1": true,
//         "property2": true
//       },
//       "stats": {
//         "avg_open_rate": 0,
//         "avg_click_rate": 0
//       },
//       "ip_signup": "string",
//       "timestamp_signup": "2019-08-24T14:15:22Z",
//       "ip_opt": "string",
//       "timestamp_opt": "2019-08-24T14:15:22Z",
//       "member_rating": 0,
//       "last_changed": "2019-08-24T14:15:22Z",
//       "language": "string",
//       "vip": true,
//       "email_client": "string",
//       "location": {
//         "latitude": 0,
//         "longitude": 0,
//         "gmtoff": 0,
//         "dstoff": 0,
//         "country_code": "string",
//         "timezone": "string"
//       },
//       "last_note": {
//         "note_id": 0,
//         "created_at": "2019-08-24T14:15:22Z",
//         "created_by": "string",
//         "note": "string"
//       },
//       "tags_count": 0,
//       "tags": [
//         {
//           "id": 0,
//           "name": "string"
//         }
//       ],
//       "list_id": "string",
//       "_links": [
//         {
//           "rel": "string",
//           "href": "string",
//           "method": "GET",
//           "targetSchema": "string",
//           "schema": "string"
//         }
//       ]
//     }
//   ],
//   "updated_members": [
//     {
//       "id": "string",
//       "email_address": "string",
//       "unique_email_id": "string",
//       "email_type": "string",
//       "status": "subscribed",
//       "merge_fields": {
//         "property1": null,
//         "property2": null
//       },
//       "interests": {
//         "property1": true,
//         "property2": true
//       },
//       "stats": {
//         "avg_open_rate": 0,
//         "avg_click_rate": 0
//       },
//       "ip_signup": "string",
//       "timestamp_signup": "2019-08-24T14:15:22Z",
//       "ip_opt": "string",
//       "timestamp_opt": "2019-08-24T14:15:22Z",
//       "member_rating": 0,
//       "last_changed": "2019-08-24T14:15:22Z",
//       "language": "string",
//       "vip": true,
//       "email_client": "string",
//       "location": {
//         "latitude": 0,
//         "longitude": 0,
//         "gmtoff": 0,
//         "dstoff": 0,
//         "country_code": "string",
//         "timezone": "string"
//       },
//       "last_note": {
//         "note_id": 0,
//         "created_at": "2019-08-24T14:15:22Z",
//         "created_by": "string",
//         "note": "string"
//       },
//       "tags_count": 0,
//       "tags": [
//         {
//           "id": 0,
//           "name": "string"
//         }
//       ],
//       "list_id": "string",
//       "_links": [
//         {
//           "rel": "string",
//           "href": "string",
//           "method": "GET",
//           "targetSchema": "string",
//           "schema": "string"
//         }
//       ]
//     }
//   ],
//   "errors": [
//     {
//       "email_address": "string",
//       "error": "string",
//       "error_code": "ERROR_CONTACT_EXISTS",
//       "field": "string",
//       "field_message": "string"
//     }
//   ],
//   "total_created": 42,
//   "total_updated": 42,
//   "error_count": 42,
//   "_links": [
//     {
//       "rel": "string",
//       "href": "string",
//       "method": "GET",
//       "targetSchema": "string",
//       "schema": "string"
//     }
//   ]
// }
