// const fileSelector = document.getElementById('file-selector');
// fileSelector.addEventListener('change', (event) => {
//     const fileList = event.target.files;
//     const reader = new FileReader();
//     console.log(reader.readAsText(fileList));
//     console.log(fileList);
// });

//Input file
let inputFile = [
    'Driver Dan',
    'Driver Lauren',
    'Driver Kumi',
    'Trip Dan 07:15 07:45 17.3',
    'Trip Dan 06:12 06:32 21.8',
    'Trip Lauren 12:01 13:16 42.0'
];

//Create array
let arrays = [];

inputFile.forEach(i => {
    arrays.push(i.split(' '));
})

console.log(arrays);

//Get drivers and times
let drivers = [];
let trips = [];

arrays.forEach(i => {
    if (i.includes('Driver')) {
        drivers.push([i[1]]);
        
    } else {
        trips.push(i);
    }
})

console.log(drivers);
console.log(trips);

trips.forEach(i => {
    let startHour = parseInt(i[2].substring(0,2));

    let startMinute = parseInt(i[2].substring(3));

    let endHour = parseInt(i[3].substring(0,2));

    let endMinute = parseInt(i[3].substring(3));

    let tripHours = endHour - startHour;
    let tripMinutes = endMinute - startMinute;
    if (tripMinutes < 0) {
        tripHours--;
    }
    let tripLength = (tripHours * 60) + tripMinutes;

    let tripMiles = parseFloat(i[4]);
    console.log('Trip Miles:');
    console.log(tripMiles);

    let tripSpeed = (tripMiles * 60) / tripLength;
    console.log('Trip Speed:')
    console.log(tripSpeed + ' mph');
    console.log();

    drivers.forEach(j => {
        if (i[1] === j[0]) {
            j.push(tripMiles);
            j.push(tripSpeed);
        }
    })
})

console.log('drivers');
console.log(drivers);

let output = [];

for (let i = 0; i < drivers.length; i++) {
    let miles = 0;
    let speed = [];
    for (let j = 1; j < drivers[i].length; j++) {
        if (j % 2 === 1) {
            miles += drivers[i][j];
            console.log(miles);
        } else {
            speed.push(drivers[i][j]);
            console.log(speed);
        }
    }
    let averageSpeed = 0;
    speed.forEach(k => {
        averageSpeed += k;
    })

    averageSpeed = averageSpeed / speed.length;
    let person = {name: drivers[i][0], distance: Math.round(miles), speed: Math.round(averageSpeed)};
    output.push(person);
    console.log(person);
}

console.log('output');
output.sort((firstItem, secondItem) => secondItem.distance - firstItem.distance);
console.log(output);
console.log();

for (let i = 0; i < output.length; i++) {

    let trips;
    
    if (output[i].distance === 0) {
        trips = '0 miles';
    } else {
        trips = output[i].distance + ' miles @ ' + output[i].speed + ' mph';
    }

    console.log(output[i].name + ': ' + trips);
}
