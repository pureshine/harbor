import { Component, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { ReplicationService } from "../../service/replication.service";
import { finalize } from "rxjs/operators";
import { ErrorHandler } from "../../error-handler/error-handler";
import {
  ReplicationJob,
  ReplicationTasks,
  Comparator,
  ReplicationJobItem
} from "../../service/interface";
import { CustomComparator } from "../../utils";
@Component({
  selector: "replication-tasks",
  templateUrl: "./replication-tasks.component.html",
  styleUrls: ["./replication-tasks.component.scss"]
})
export class ReplicationTasksComponent implements OnInit {
  isOpenFilterTag: boolean;
  selectedRow: [];
  tasks: ReplicationTasks[] = [];
  tasksCopy: ReplicationTasks[] = [];
  stopOnGoing: boolean;
  currentTerm: string;
  searchTasks: string;
  loading = false;
  timerHandler: any;
  executions: string = "InProgress";
  defaultFilter = "recourceType";
  @Input() executionId: string;
  startTimeComparator: Comparator<ReplicationJob> = new CustomComparator<
    ReplicationJob
  >("start_time", "date");
  endTimeComparator: Comparator<ReplicationJob> = new CustomComparator<
    ReplicationJob
  >("end_time", "date");

  constructor(
    private translate: TranslateService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private replicationService: ReplicationService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit(): void {
    // this.getExecutions();
    this.getTasks();
    this.searchTasks = '';
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
      response => {
        this.stopOnGoing = false;
        // this.getExecutions();
        this.translate.get("REPLICATION.STOP_SUCCESS").subscribe((res: string) => {
          this.errorHandler.info(res);
      });
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
    this.loading = true;
    this.replicationService.getReplicationTasks(this.executionId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
      tasks => {
        this.tasks = tasks.map(x => Object.assign({}, x));
      },
      error => {
        this.errorHandler.error(error);
      }
    );
  }

  forceRefreshView(duration: number): void {
    // Reset timer
    if (this.timerHandler) {
      clearInterval(this.timerHandler);
    }
    this.timerHandler = setInterval(() => this.ref.markForCheck(), 100);
    setTimeout(() => {
      if (this.timerHandler) {
        clearInterval(this.timerHandler);
        this.timerHandler = null;
      }
    }, duration);
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
