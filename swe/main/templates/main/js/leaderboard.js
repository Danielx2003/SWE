var data = [
    ['John', 100],
    ['Alice', 150],
    ['Bob', 120],
    ['Eva', 90],
    ['Chris', 200],
    ['Sophie', 180],
    ['Alex', 130],
    ['Emma', 110],
    ['David', 160],
    ['Olivia', 140]
];

var userdata = [['Benji', 176]]

data.sort(function(a, b) {
    return b[1] - a[1];
});

var tableBody = document.getElementById('tableBody');
    for (var i = 0; i < data.length; i++) {
        var row = tableBody.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.innerHTML = i + 1;
        cell2.innerHTML = data[i][0];
        cell3.innerHTML = data[i][1];
    }
