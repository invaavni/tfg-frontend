import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { DatepickerOptions } from 'ng2-datepicker';
import { BaseChartDirective } from 'ng2-charts';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('chart') chart: BaseChartDirective;

  public currencies = [];
  public selectedCurrency;
  public alert = false;
  public loading = false;
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartType: string = 'line';
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        }
      }]
    }
  };
  public modalRef: BsModalRef;
  public r2;
  public predictDate: Date = new Date();
  public datePickerOptions: DatepickerOptions = {
    minYear: 2018,
    firstCalendarDay: 1,
    barTitleIfEmpty: 'Click to select a date',
    locale: esLocale,
    minDate: new Date('2018-01-01')
  };

  constructor(
    private modalService: BsModalService,
    private predictionService: PredictionService) {

  }

  ngOnInit() {
    this.predictionService.getCurrencies().subscribe(data => {
      this.currencies = data['names'].map((e, i) => {
        return {
          'name': e,
          'symbol': data['symbols'][i]
        }
      });
    }, err => console.log(err));
  }

  testPrediction() {
    if (this.selectedCurrency) {
      this.r2 = null;
      this.alert = false;
      this.cleanChart();
      this.loading = true;
      this.predictionService.testPredict(this.selectedCurrency).subscribe(data => {
        this.lineChartData = [
          { data: data['realData'], label: 'Real data', fill: false },
          { data: data['prediction'], label: 'Prediction', fill: false }
        ];
        this.lineChartLabels = data['labels'];
        this.loading = false;
        this.r2 = data['r_squared'].toFixed(2);
        this.reloadChart();
      }, err => {
        console.log(err);
        this.loading = false;
      });
    }
    else {
      this.alert = true;
      this.loading = false;
    }
  }

  openModal(template: TemplateRef<any>) {
    if (this.selectedCurrency) {
      this.alert = false;
      this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
    }
    else {
      this.alert = true;
    }
  }

  cleanChart() {
    this.lineChartData = null;
    this.lineChartLabels = null;
  }

  reloadChart() {
    if (this.chart !== undefined) {
      this.chart.chart.destroy();
      this.chart.chart = 0;
      this.chart.datasets = this.lineChartData;
      this.chart.labels = this.lineChartLabels;
      this.chart.ngOnInit();
    }
  }

  predict() {
    this.r2 = null;
    let date = new Date();
    date.setUTCFullYear(this.predictDate.getFullYear());
    date.setUTCMonth(this.predictDate.getMonth());
    date.setUTCDate(this.predictDate.getDate());
    date.setUTCHours(this.predictDate.getHours());
    date.setUTCMinutes(this.predictDate.getMinutes());
    date.setUTCSeconds(this.predictDate.getSeconds());
    this.modalRef.hide();
    this.cleanChart();
    this.loading = true;
    var dateString = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.predictionService.predict(this.selectedCurrency, dateString).subscribe(data => {
      this.lineChartData = [
        { data: data['prediction'], label: 'Prediction', fill: false }
      ];
      this.lineChartLabels = data['labels'];
      this.loading = false;
      this.reloadChart();
    }, err => {
      console.log(err);
      this.modalRef.hide();
      this.loading = false;
    });
  }

}
