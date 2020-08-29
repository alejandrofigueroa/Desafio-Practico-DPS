import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  registro=[];
  verificacion=[];

  check:any;
  clientes:any;

  nombre:string;
  dui:string;
  vehiculo:string;
  costo:number;

  contador:number;

  constructor() { }

  ngOnInit(): void {
    this.nombre = "";
    this.dui = "";
    this.vehiculo = "";
    this.costo = 0;
    this.contador = 0;
  }


  ingresarCliente(){
    var monto:number = this.costo;
    this.check={"dui":this.dui, "contador":0};
    var verificar = this.verificacion.find(x => x.dui == this.dui);

    if(verificar){ //Verificar si existe el DUI
      verificar.contador++;

      if(verificar.contador == 2){
          monto = this.costo - (this.costo * 0.05);
      }else if(verificar.contador >= 4){
          monto = this.costo - (this.costo * 0.10);
      }
      this.check={"dui":this.dui, "contador":verificar.contador};
      
    }else{ //Si no existe.
      this.verificacion.push(this.check);
    }

    this.clientes={"nombre":this.nombre, "dui":this.dui, "vehiculo":this.vehiculo, "costo":monto};
    this.registro.push(this.clientes);
    
    this.contador++;
    

  }
 

}
