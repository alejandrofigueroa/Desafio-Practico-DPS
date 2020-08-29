import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import { isRegExp } from 'util';

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
  dui_validation = '^[0-9]{8}-[0-9]{1}$';

  constructor() { }

  ngOnInit(): void {
    this.nombre = "";
    this.dui = "";
    this.vehiculo = "";
    this.costo = 0;
    this.contador = 0;
    
    
  }


  ingresarCliente(){
    if(!this.nombre.match("") || !this.dui.match("") || !this.vehiculo.match("") || this.costo > 0){
      if(this.dui.match(this.dui_validation)){
          var monto:number = this.costo;
          var descuento:string = "No";
          this.check={"dui":this.dui, "contador":0};
          var verificar = this.verificacion.find(x => x.dui == this.dui);
          

          if(verificar){ //Verificar si existe el DUI
            verificar.contador++;
            
            if(verificar.contador == 2){
                monto = this.costo - (this.costo * 0.05);
                descuento = "Del 5%";
            }else if(verificar.contador >= 4){
                monto = this.costo - (this.costo * 0.10);
                descuento = "Del 10%";
            }
            this.check={"dui":this.dui, "contador":verificar.contador};
            
          }else{ //Si no existe.
            this.verificacion.push(this.check);
          }

          this.clientes={"nombre":this.nombre, "dui":this.dui, "vehiculo":this.vehiculo, "costo":monto, "descuento":descuento};
          this.registro.push(this.clientes);
          
          this.contador++;
      }else{
          alert("No va con relacion al formato del DUI");
      }
    }else{
      alert("No se permiten campos vacios y valores negativos");
    }
    

  }

 

}
