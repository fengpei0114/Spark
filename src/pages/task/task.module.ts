import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPage } from './task';
import { TaskDetailPage } from './task-detail/task-detail';
import { PaginationComponentModule } from '../../components/pagination/pagination.module';
import { TaskCreatePage } from './task-create/task-create';
import { TaskHistoryAlarmPage } from './task-history-alarm/task-history-alarm';
import { ViewerPicPage } from  './viewer-pic/viewer-pic';
import { StatusFilterPipe } from '../../pipes/status-filter/status-filter';
@NgModule({
  declarations: [
    TaskPage, TaskDetailPage,TaskCreatePage, TaskHistoryAlarmPage, ViewerPicPage, StatusFilterPipe
  ],
  imports: [
    IonicPageModule.forChild(TaskPage),
      PaginationComponentModule,

  ],
  exports: [
    TaskPage
  ],
  entryComponents:[TaskDetailPage, TaskCreatePage, TaskHistoryAlarmPage,ViewerPicPage]
})
export class TaskPageModule {}
