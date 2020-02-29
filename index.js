function createEmployeeRecord(array){
    let name = array[0]
    let famname = array[1]
    let title = array[2]
    let prph = array[3]

    var employee = {
        firstName: name,
        familyName: famname,
        title: title,
        payPerHour: prph,
        timeInEvents: [],
        timeOutEvents: []
    }

    return employee
}

function createEmployeeRecords(array){    
    var company = []
    for (let i = 0; i < array.length; i++){
        company.push(createEmployeeRecord(array[i]))
    }
    return company   
}

function createTimeInEvent(record, date){    
    let time = date.split(" ")
    record.timeInEvents.push({type: "TimeIn", hour: parseInt(time[1]), date: time[0]})
    return record
}

function createTimeOutEvent(record, date){
    let time = date.split(" ")
    record.timeOutEvents.push({type: "TimeOut", hour: parseInt(time[1]), date: time[0]})
    return record
}

function hoursWorkedOnDate(record, date){
    let inEvent = record.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = record.timeOutEvents.find(function(e){
        return e.date === date
    })
  let time = outEvent.hour - inEvent.hour
  return time / 100
}

function wagesEarnedOnDate(record, date){
    let pay = hoursWorkedOnDate(record, date) * record.payPerHour
    let v = parseFloat(pay.toString())
    return v
}

function calculatePayroll(array){
     let total = array.reduce(function(num, employee){
         return num += allWagesFor(employee)
     }, 0)
    return total
}

function findEmployeeByFirstName(array, name){
   return array.find(person => person.firstName === name)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}