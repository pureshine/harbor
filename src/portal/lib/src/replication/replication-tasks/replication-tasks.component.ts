import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ReplicationService } from "../../service/replication.service";
import { map, catchError } from "rxjs/operators";
import { Observable, forkJoin, throwError as observableThrowError } from "rxjs";
import { ErrorHandler } from "../../error-handler/error-handler";
import {
  ReplicationJob,
  ReplicationTasks,
  Comparator,
  ReplicationJobItem
} from "../../service/interface";
import { CustomComparator } from "../../utils";
import * as echarts from "echarts";
@Component({
  selector: "replication-tasks",
  templateUrl: "./replication-tasks.component.html",
  styleUrls: ["./replication-tasks.component.scss"]
})
export class ReplicationTasksComponent implements OnInit {
  isOpenFilterTag: boolean;
  @ViewChild("echart") echart: ElementRef;
  selectedRow: [];
  tasks: ReplicationTasks[] = [];
  stopOnGoing: boolean;
  executions: string = "InProgress";
  @Input() executionId: string;
  success: number = 100;
  progress: number = 200;
  fail: number = 500;
  startTimeComparator: Comparator<ReplicationJob> = new CustomComparator<
    ReplicationJob
  >("start_time", "date");
  endTimeComparator: Comparator<ReplicationJob> = new CustomComparator<
    ReplicationJob
  >("end_time", "date");

  constructor(
    private router: Router,
    private replicationService: ReplicationService,
    private errorHandler: ErrorHandler
  ) {}

  getEchart() {
    echarts.init(this.echart.nativeElement).setOption(this.pieChart, true);
  }

  public pieChart = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: "vertical",
      x: "left",
      data: ["联盟广告", "视频广告", "搜索引擎"]
    },
    series: [
      {
        name: "访问来源",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          normal: {
            show: false,
            position: "center"
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: "30",
              fontWeight: "bold"
            }
          }
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        data: [
          { value: 0, name: "联盟广告" },
          { value: 0, name: "视频广告" },
          { value: 0, name: "搜索引擎" }
        ]
      }
    ]
  };

  ngOnInit(): void {
    // this.success = 100;
    // this.progress = 200;
    // this.fail = 300;
    this.pieChart.series[0].data[0].value = 100;
    this.pieChart.series[0].data[1].value = 200;

    this.pieChart.series[0].data[2].value = 300;

    this.getEchart();
    // this.getExecutions();
    this.getTasks();
    // this.executions.status = 'success';
  }

  // getExecutions(): void {
  //   if (this.executionId) {
  //     toPromise<ReplicationJob>(
  //       this.replicationService.getExecutions(this.executionId)
  //       )
  //       .then(executions => {
  //         console.log(executions);
  //       })
  //       .catch(error => {
  //           this.errorHandler.error(error);
  //       });
  //   }
  // }

  stopJob() {
    this.stopOnGoing = true;
    this.replicationService.stopJobs(this.executionId).subscribe(
      res => {
        this.stopOnGoing = false;
        // this.getExecutions();
      },
      error => {
        this.errorHandler.error(error);
      }
    );
  }

  viewLog(taskId: number | string): string {
    return (
      this.replicationService.getJobBaseUrl() +
      "/" +
      this.executionId +
      "/tasks/" +
      taskId +
      "/log"
    );
  }

  getTasks(): void {
    this.replicationService.getReplicationTasks(this.executionId).subscribe(
      tasks => {
        this.tasks = tasks.map(x => Object.assign({}, x));
      },
      error => {
        this.errorHandler.error(error);
      }
    );
  }
  onBack(): void {
    this.router.navigate(["harbor", "replications"]);
  }

  openFilter(isOpen: boolean): void {
    if (isOpen) {
      this.isOpenFilterTag = true;
    } else {
      this.isOpenFilterTag = false;
    }
  }
}
