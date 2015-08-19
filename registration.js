//  Declare SQL Query for SQLite


var db = openDatabase('mydb', '1.0', 'User DB', 2 * 1024 * 1024);



function submit(){


    var dataset;

    var DataType;

    function initDatabase(){

        try {

            if (!window.openDatabase)  // Check browser is supported SQLite or not.

            {

                alert('Databases are not supported in this browser.');

            }

            else {

                createTable(function(){
                    insertRecord(function(){
                        showRecords(function(){
                            alert("Successfully Registered!!!");
                        });
                    });
                });

            }

        }

        catch (e) {

            if (e == 2) {

                // Version number mismatch.

                console.log("Invalid database version.");

            } else {

                console.log("Unknown error " + e + ".");

            }


        }

    }

    console.log("in submit");
    if (document.getElementById("firstname") != null)
        var fn = document.getElementById("firstname").value;
    if (document.getElementById("middlename") != null)
        var mn = document.getElementById("middlename").value;
    if (document.getElementById("lastname") != null)
        var ln = document.getElementById("lastname").value;
    if (document.getElementById("message") != null)
        var add = document.getElementById("message").value;
    if (document.getElementById("email") != null)
        var mail = document.getElementById("email").value;
    if (document.getElementById("psw") != null)
        var p = document.getElementById("psw").value;
    if (document.getElementById("cpsw") != null)
        var cp = document.getElementById("cpsw").value;
    if (document.getElementById("usertel") != null)
    var nm = document.getElementById("usertel").value;

    var dd = document.getElementById("Date").value;
    var mm = document.getElementById("Month").value;
    var yy = document.getElementById("Year").value;



    var d=dd+"/"+mm+"/"+yy;
   if(document.getElementById("male").checked)
   var s="Male";
    else
   var s="Female";

    function createTable(cb)  // Function for Create Table in SQLite.

    {
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS reg1(fname text,mname text,lname text,g text,dob text,addr text,email text,pwd text,cpwd text,contact integer primary key)');
        });
        cb();
    }
    function insertRecord(cb) // Get value from Input and insert record . Function Call when Save/Submit Button Click..

    {
        db.transaction(function (tx) {
            tx.executeSql('INSERT INTO reg1 (fname,mname,lname,g,dob,addr,email,pwd,cpwd,contact) VALUES (?,?,?,?,?,?,?,?,?,?)', [fn, mn, ln, s, d, add, mail, p, cp, nm]);
        });
        cb();
    }
    function showRecords() // Function For Retreive data from Database Display records as list

    {
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM reg1', [], function(tx, results) {
                var len=results.rows.length;
                var i;
                for(i=0; i < len; i++) {
                    //Set values coming from the database
                    alert("Id: " + results.rows.item(i).id +
                        " Firstname: " + results.rows.item(i).firstname +
                        " Lastname: " + results.rows.item(i).lastname +
                        " Phone number: " + results.rows.item(i).message);
                }
            });
        });

    }
    initDatabase();
}








