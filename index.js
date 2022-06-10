const axios      = require('axios');
const { filter } = require('rxjs');
const barChart   = require('console-bar-chart')
const readline   = require('readline').createInterface({
    input : process.stdin,
    output: process.stdout,
});



let input              = [];
let output             = [];
let outputData         = [];
let apiData            = [];
let dates              = [];
let activeUsers        = [];
let startFilteredDates = [];
let filteredDates      = [];
let filteredData       = [];
let labels             = [];
let values             = [];
let graphData          = {
    "label": [],
    "value": []
};


async function getUserActivity () {
    try {
        const res = await axios.get('http://sam-user-activity.eu-west-1.elasticbeanstalk.com/');
        
        console.log(`
            Available data ranges from ${Object.keys(res.data)[0]}  to  ${Object.keys(res.data)[(Object.keys(res.data).length)-1]}
        `)


        readline.question(`Enter Start Date  [use format dd-mm-yyyy (e.g 05-01-2022)] :  `, sDate => {
            if (!((Object.keys(res.data)).includes(sDate))) {
                console.log(`
                    Please enter a date between ${Object.keys(res.data)[0]}  and  ${Object.keys(res.data)[(Object.keys(res.data).length)-1]} \n
                    Restart the program to continue.
                `)
                readline.close();
                return;
            }
            readline.question(`Enter End Date  [use format dd-mm-yyyy (e.g 05-01-2022)] :  `, eDate => {
                if (!((Object.keys(res.data)).includes(eDate))) {
                    console.log(`
                        Please enter a date between ${Object.keys(res.data)[0]}  and  ${Object.keys(res.data)[(Object.keys(res.data).length)-1]} \n
                        Restart the program to continue.
                    `);
                    readline.close();
                    return;
                }
                readline.close();  

                for (let day in res.data) {
                    apiData.push(`${day},${res.data[day]}`)
                }
                
                for (let activity of apiData) {
                    output.push(activity.split(','));
                    dates.push(activity.split(',')[0]);
                    activeUsers.push(parseInt(activity.split(',')[1]));
                }
                
                for (let i=0; i<dates.length; i++) {
                    if (dates[i] === sDate) {
                        startFilteredDates = dates.slice(i)
                    }
                }
                
                for (let j=0; j<startFilteredDates.length; j++) {
                    if (startFilteredDates[j] === eDate) {
                        filteredDates = startFilteredDates.slice(0,j+1);
                    }
                }

                for (let date of filteredDates) {
                    for (let arr of output) {
                        if (date === arr[0]) {
                            filteredData.push(arr);
                        }
                    }
                }
                console.log('\n');
                console.log(`Requested Data : ['dates','active users']`)
                console.log(filteredData);
                console.log('\n');

                for (let data of filteredData) {
                    labels.push(("0").concat(data[0].slice(0,2)));
                    values.push(((parseInt(data[1]))/10000));
                }

                graphData["label"] = labels;
                graphData["value"] = values;
                
                console.log('Requested Data Graph');
                barChart.draw(graphData);
                console.log(`
                    KEY\n
                    Horizontal (x) axis = Dates(days)\n
                    Vertical   (y) axis = Number of Active Users (in tens of thousands)
                `)
            });
        });
        
    } catch (err) {
        console.log('failed to get data from', err.hostname);
    }
}

getUserActivity();