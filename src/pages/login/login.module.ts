import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { SetServerIpPage } from './set-server-ip/set-server-ip';

@NgModule({
    entryComponents:[
        LoginPage,SetServerIpPage
    ],
  declarations: [
    LoginPage, SetServerIpPage],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  exports: [
    LoginPage, SetServerIpPage]
})
export class LoginPageModule {}
