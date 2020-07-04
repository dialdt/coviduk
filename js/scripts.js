let casesApiUrl = 'https://c19downloads.azureedge.net/downloads/json/coronavirus-cases_latest.json';
let deathsApiUrl = 'https://c19downloads.azureedge.net/downloads/json/coronavirus-deaths_latest.json';
//let search = document.getElementById('main-input').value;
let dataHead = document.getElementById('data-head');
let dataBody = document.getElementById('data-body');

/*let upperTierData = axios.get(casesApiUrl)
                            .then(function(response) {
                                return response.data.utlas
                            })
                            .catch(function(error) {
                                console.log(error);
                            })*/

//function getData() { 
    axios.get(casesApiUrl)
    .then(function(response) {
        let data = response.data.utlas //upper tier local authority
        let dataObj = [];
            for (let i in data) {
                if(data[i].areaName === 'East Sussex') {
                    //match area name and return data object for that area
                    dataObj.push({
                        'area': data[i].areaName,
                        'date': data[i].specimenDate,
                        'dailyCases': data[i].dailyLabConfirmedCases,
                        'totalCases': data[i].totalLabConfirmedCases,
                        'rate': data[i].dailyTotalLabConfirmedCasesRate,
                        'dailyRate': (data[i].dailyLabConfirmedCases / 554590) * 100000 
                    })
                }
    
            }
            console.log(dataObj[0]);
            dataBody.innerHTML = '';
    for(let item in dataObj[0]) {
        
        dataBody.innerHTML += '<p>' + item + ': ' + dataObj[0][item] + '</p>';
    }
    return dataObj;
    })
    .catch(function(error) {
        console.log(error);
    })
//};

function getFilteredData(filter) {
    let filteredData = [];
    upperTierData.then(function(data) {
        filteredData.push(data.filter(function(obj) {
            return obj.areaName === filter;
        }))
    })
    console.log(filteredData)
    for(let i = 0; i < filteredData.length; i++) {
        console.log(filteredData[i]);
    }
}