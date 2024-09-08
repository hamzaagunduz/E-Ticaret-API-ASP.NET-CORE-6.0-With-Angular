import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private _connection:HubConnection

  get connection():HubConnection{

    return this._connection
  }

  constructor() { }

  start(hubUrl:string){
    if(!this._connection||this.connection.state==HubConnectionState.Disconnected){
      const builder:HubConnectionBuilder=new HubConnectionBuilder();
      const HubConnection:HubConnection=builder.withUrl(hubUrl).withAutomaticReconnect().build()
      HubConnection.start()
      .then(()=>{console.log("bağlandi")
      })

      .catch(error=>setTimeout(()=>this.start(hubUrl),2000))
      this._connection=HubConnection

    }

    this.connection.onreconnected(connectionId=>console.log("reconnect"))
    this._connection.onreconnecting(error=>console.log("reconnettign"))
    this._connection.onclose(error=>console.log("close"))
  }

  invoke(procedureName: string, message: any, successCallBack?: (value) => void, errorCallBack?: (error) => void) 
  {
    this.connection.invoke(procedureName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(procedureName: string, callBack: (...message: any) => void) {
    this.connection.on(procedureName, callBack);
  }
}
