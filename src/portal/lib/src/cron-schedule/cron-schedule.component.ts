import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
  Input
} from "@angular/core";
const SCHEDULE_TYPE = {
  NONE: "None",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  HOURLY: "Hourly",
  CUSTOM: "Custom"
};
@Component({
  selector: "cron-selection",
  templateUrl: "./cron-schedule.component.html",
  styleUrls: ["./cron-schedule.component.scss"]
})
export class CronScheduleComponent implements OnInit, OnChanges {
  @Input() originCron: string;
  @Input() labelEdit: string;
  @Input() labelCurrent: string;
  dateInvalid: boolean;
  originScheduleType: any;
  cronstring: string;
  isEditMode: boolean = false;
  SCHEDULE_TYPE = SCHEDULE_TYPE;
  scheduleType: string;
  private _childTitle: string = "";
  @Output() inputvalue = new EventEmitter<string>();
  @Input()
  set childTitle(childTitle: string) {
    this._childTitle = childTitle;
  }
  get childTitle(): string {
    return this._childTitle;
  }
  blurInvalid() {
    if (!this.cronstring) {
      this.dateInvalid = true;
    }
  }

  inputInvalid() {
    const regMiao = "^($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?)*)\\s+";
    const regFen = "(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?)*)\\s+";
    const regShi = "(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+";
    const regRi = "(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+";
    const regYue = "(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+";
    const regZhou = "(\\?|\\*|(?:[0-6])(?:(?:-|\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+";
    const regNian = "(\\?|\\*|(?:|\\d{4})(?:(?:-|\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\/|\\,)(?:|\\d{4}))?)*))$";
    const regEx = regMiao + regFen + regShi + regRi + regYue + regZhou + regNian;
    let reg = new RegExp(regEx);
    // let reg = new RegExp('^($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\/|\\,)(?:|\\d{4}))?)*))$');
    if (
     reg.test(
        this.cronstring
      )) {
        this.dateInvalid = false;
      } else {
      this.dateInvalid = true;
      }
    // this.dateInvalid = this.cronstring ? false : true;
  }
  ngOnInit() {}
  ngOnChanges(): void {
    this.getSchedule();
  }
  getSchedule() {
    // console.log(this.originCron);
    if (this.originCron && this.originCron === "0 0 * * * *") {
      this.originScheduleType = SCHEDULE_TYPE.HOURLY;
    } else if (this.originCron && this.originCron === "0 0 0 * * *") {
      this.originScheduleType = SCHEDULE_TYPE.DAILY;
    } else if (this.originCron && this.originCron === "0 0 0 * * 0") {
      this.originScheduleType = SCHEDULE_TYPE.WEEKLY;
    } else if (this.originCron === "") {
      this.originScheduleType = SCHEDULE_TYPE.NONE;
    } else {
      this.originScheduleType = SCHEDULE_TYPE.CUSTOM;
    }
  }
  editSchedule() {
    this.isEditMode = true;
    this.scheduleType = this.originScheduleType;
    if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.CUSTOM) {
      this.cronstring = this.originCron;
    } else {
      this.cronstring = "";
    }
  }

  public resetSchedule() {
    this.originScheduleType = this.scheduleType;
    this.originCron = this.cronstring;
    this.isEditMode = false;
  }

  save(): void {
    if (this.dateInvalid && this.scheduleType === SCHEDULE_TYPE.CUSTOM) {
      return;
    }
    let scheduleTerm: string = "";
    this.resetSchedule();
    if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.NONE) {
      scheduleTerm = "";
    } else if (
      this.scheduleType && this.scheduleType === SCHEDULE_TYPE.HOURLY
    ) {
      scheduleTerm = "0 0 * * * *";
    } else if (this.scheduleType && this.scheduleType === SCHEDULE_TYPE.DAILY) {
      scheduleTerm = "0 0 0 * * *";
    } else if (
      this.scheduleType && this.scheduleType === SCHEDULE_TYPE.WEEKLY
    ) {
      scheduleTerm = "0 0 0 * * 0";
    } else {
      scheduleTerm = this.cronstring;
      if (this.cronstring && this.cronstring === "0 0 * * * *") {
        this.originScheduleType = SCHEDULE_TYPE.HOURLY;
        console.log('weekludnasi');
      }  else if (this.cronstring && this.cronstring === "0 0 0 * * *") {
        this.originScheduleType = SCHEDULE_TYPE.DAILY;
      } else if (this.cronstring && this.cronstring === "0 0 0 * * 0") {
        this.originScheduleType = SCHEDULE_TYPE.WEEKLY;
      } else if (this.cronstring === "") {
        this.originScheduleType = SCHEDULE_TYPE.NONE;
      }
    }
    this.inputvalue.emit(scheduleTerm.replace(/\s+/g, " "));
    console.log(scheduleTerm.replace(/\s+/g, " "));
  }
}
