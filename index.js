const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE TABLE Instructor (ID NUMBER, Name TEXT, Dept_name TEXT, Salary NUMBER)");

    db.run("INSERT INTO Instructor VALUES(10101, 'Sirivisan','Comp. Sci.',65000)");
    db.run("INSERT INTO Instructor VALUES(12121, 'Wu','Finance',90000)");
    db.run("INSERT INTO Instructor VALUES(15151, 'Mozart','Music',90000)");
    db.run("INSERT INTO Instructor VALUES(22222, 'Einstein','Physics',95000)");
    db.run("INSERT INTO Instructor VALUES(32343, 'El Said','History',62000)");
    db.run("INSERT INTO Instructor VALUES(3456, 'Gold','Physics',87000)");
    db.run("INSERT INTO Instructor VALUES(45565, 'Katz','Comp. Sci.',75000)");
    db.run("INSERT INTO Instructor VALUES(58583, 'Califieri','History',62000)");
    db.run("INSERT INTO Instructor VALUES(76543, 'Singh','Finance',80000)");
    db.run("INSERT INTO Instructor VALUES(76766, 'Crick','Biology',72000)");
    db.run("INSERT INTO Instructor VALUES(83821, 'Brandt','Comp. Sci.',92000)");
    db.run("INSERT INTO Instructor VALUES(98345, 'Kim','Elec. Eng.',80000)");

    db.each("SELECT name FROM Instructor", function(err,row){
        //console.log(row);
    });

    db.each("SELECT DISTINCT Dept_name FROM Instructor", function(err,row){
        //console.log(row.Dept_name);
    });

    db.each("SELECT name FROM Instructor WHERE Dept_name = 'Comp. Sci.' AND salary > 70000", function(err,row){
        //console.log(row);
    });

    let results = new Array();
    db.each(
        "SELECT name FROM Instructor WHERE Dept_name = 'Comp. Sci.' AND salary > 70000", 
        function(err,row){
            results.push(row.Name);
        },
        function(err,count){
            let resultString = "";
            for(let i = 0; i != results.length; ++i){
                if(i != count - 1){
                    resultString += results[i] + ", "
                }
                else
                    resultString += results[i];
            }

            //console.log(resultString + " have high salary");
        });
    
    //Print department names and the total salary spend for each department
    //HistoryL 100000 yearly

    let depts = {};
    db.each("SELECT Dept_name, salary FROM Instructor",function(err,row){

        if(depts[row.Dept_name] === undefined)
            depts[row.Dept_name] = 0;

        depts[row.Dept_name] += row.Salary;
    },function(err,count){
        //console.log("History" + ": "+depts["History"] + " yearly");
        let keys = Object.keys(depts);
        
        for(let i = 0; i != keys.length; ++i){
            console.log(keys[i] + ": "+depts[keys[i]] + " yearly");
        }
    });
});