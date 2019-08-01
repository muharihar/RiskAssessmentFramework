import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { Project } from 'src/app/models/project.model';
import { RestApiService } from 'src/app/shared/rest-api.service';



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Jan', weight: 1, symbol: 'H'},
  {position: 2, name: 'Feb', weight: 4, symbol: 'He'},
  {position: 3, name: 'March', weight: 6, symbol: 'Li'},
  {position: 4, name: 'April', weight: 9, symbol: 'Be'},
  {position: 5, name: 'May', weight: 10, symbol: 'B'},
  {position: 6, name: 'June', weight: 12, symbol: 'C'},
  {position: 7, name: 'July', weight: 14, symbol: 'N'},
  {position: 8, name: 'Aug', weight: 15, symbol: 'O'},
  {position: 9, name: 'Sep', weight: 18, symbol: 'F'},
  {position: 10, name: 'Oct', weight: 20, symbol: 'Ne'},
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  LineChart = [];
  barChart = [];
  doughnutChart = [];
  radarChart = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;



  verified = true;
  constructor( public restApi: RestApiService) { }
  Project: Project = {
    projectId : "1",
    results : "N/A",
    date : "11/11/2011"
  };
  reList = [];
  fetchProjectResults() {
    return this.restApi.getResults("4e0679f4f907bea2d278b3f24d4c8254").subscribe((data: any) => {
      this.Project = data;
    console.log("PROJECTDETAILS" ,  this.Project);
    this.reList = [];
   let x = data.map(d=>this.reList.push(d.type));
console.log(x);
console.log("RELIST",this.reList);

    });
  } 

  ngOnInit() {
   // this.fetchProjectResults();

    this.restApi.getResults("4e0679f4f907bea2d278b3f24d4c8254").subscribe((data: any) => {
      this.Project = data;
    console.log("PROJECTDETAILS" ,  this.Project);
    let reList2 = [];
    let vals = [];
   let x = data.map(d=>reList2.push(d.type));
   let y = data.map(d=>vals.push(d.issues));
console.log(x); 
console.log(y); 
console.log("RELIST",vals);

    
   // this.doughnutChart.data.labels  = this.Project



    this.LineChart = new Chart('lineChart', {
      type: 'line',
      data: {
          labels: reList2,
          datasets: [{
              label: 'vulnerabilities',
              data: vals,
              backgroundColor: [ 
                  'rgba(33, 255, 199, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                  'rgba(33, 255, 199, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

  this.barChart = new Chart('barChart', {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August'],
        datasets: [{
            label: 'vulnerabilities',
            data: [30, 20, 30, 50, 20, 30],
            backgroundColor: [
                'rgba(33, 255, 199, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(33, 255, 199, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


this.doughnutChart = new Chart('doughnutChart', {
  type: 'doughnut',
  data: {
    datasets: [{
      data: vals,
      borderColor : 'rgba(0,0,0,0)',
      label: 'Dataset 1',
      backgroundColor :   ['rgba(33, 255, 199, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 159, 64, 0.2)',] 
    }],
    labels: reList2
  },
  options: {
    responsive: true,
    legend: {
      position: 'top',
      scale: {
        ticks: {
          beginAtZero: true,
          backgroundColor : '#ccc'
        },
        gridLines: {
          color: 'rgba(174, 176, 178,0.3)',
          lineWidth: 2,
          zeroLineColor : '#fff',
          zeroLineWidth : 2
        }
    }},

    animation: {
      animateScale: true,
      animateRotate: true
    }
  }
});


this.radarChart = new Chart('radarChart', {
  type: 'radar',
  data: {
    labels: ['Injection', 'XSS', 'BAC', 'XXE', 'SOE', 'Misconfig'],
    datasets: [{
        label: 'Risk',
        data: [30, 20, 30, 50, 20, 30],
        backgroundColor: [
            'rgba(33, 255, 199, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(33, 255, 199, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
    }]
},
options: {
  legend: {
    position: 'top',
  },
  scale: {
    ticks: {
      beginAtZero: true,
      backgroundColor : '#ccc'
    },
    gridLines: {
      color: 'rgba(174, 176, 178,0.3)',
      lineWidth: 2,
      zeroLineColor : '#fff',
      zeroLineWidth : 2
    },

  }
}

});
});

  }

}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

