#!/usr/bin/env node

// ### CLI для вывода даты: 

// Текущая дата и время в формате ISO:  
// cmd current

// Текущий год:  
// cmd current --year или cmd current -y

// Текущий месяц:  
// cmd current --month или cmd current -m

// Дата в календарном месяце:  
// cmd current --date или cmd current -d

// Также добавлена возможность получать даты в прошлом или будущем через команды add и sub:  
// cmd add -d 2 - дата и время в формате ISO на два дня вперед
// cmd sub --month 1 - дата и время в формате ISO на 1 месяц назад

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv));

const currentDate = new Date(); 
const dateISO = currentDate.toISOString(); 
const year = currentDate.getFullYear(); 
const month = currentDate.getMonth() + 1; 
const day = currentDate.getDate();


function checkDate() {
    for (let key in argv.argv) {
        if (key === "year" || key === "y") return year;
        if (key === "month" || key === "m") return month;
        if (key === "date" || key === "d") return day;
        if (Object.keys(argv.argv).length === 2) return dateISO;
    }
}

argv.command({
    command: "current",
    describe: `Текущая дата и время в формате ISO:
    -текущий год;
    -текущий месяц;
    -дата в календарном месяце`,
    handler() {
        console.log(checkDate());
    }
}).command({
    command: "add",
    describe: "Дата и время в формате ISO на два дня вперед",
    handler() {
        let countOfDays; 

        if (argv.argv["d"]) {
             countOfDays = argv.argv["d"]; 
        }
        currentDate.setDate(currentDate.getDate() + countOfDays) 
        const res = argv.argv["d"] ? currentDate.toISOString() : dateISO;
        console.log(res);
    }
}).command({
    command: "sub",
    describe: "Дата и время в формате ISO на 1 месяц назад",
    handler() {
        let countOfMonths;

        if (typeof argv.argv["month"]) {
                countOfMonths = argv.argv["month"];
        }
        currentDate.setMonth(currentDate.getMonth() - countOfMonths);
        const res = argv.argv["month"] ? currentDate.toISOString() : dateISO;
        console.log(res);
    }
}).parse()