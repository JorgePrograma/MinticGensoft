import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente} from '../models';
import {ClienteRepository} from '../repositories';
const cryto = require('crypto-js');
const generador = require('password-generator');
const jwt = require('jsonwebtoken');
import {Llaves} from '../config/llaves';

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    //identificacion add
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
  ) {}

  getGenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  getCifrarClave(clave: string) {
    let clavecifrada = cryto.MD5(clave).toString();
    return clavecifrada;
  }

  getDecifrarClave(clave: string) {
    let claveDecifrada = cryto.AES(clave).toString;
    return claveDecifrada;
  }

  IdentificarPersona(usuario: string, clave: string) {
    try {
      // variable = repositorio.busqueda({filtro})
      let personaCliente = this.clienteRepository.findOne({
        where: {correo: usuario, clave: clave},
      });
      // validar si se encontro una persona
      if (personaCliente) {
        return personaCliente;
      }
      return false; // no encontro persona
    } catch (error) {
      return false; // no encontro persona
    }
  }
  //JsonWebToken
  getGenerarTokenJWT(cliente: Cliente) {
    // instalar jsonwebtoken => npm i jsonwebtoken
    let token = jwt.sign(
      {
        data: {
          id: cliente.id,
          correo: cliente.correo,
          nombre: cliente.nombre + ' ' + cliente.apellido,
        },
      },
      // firma del token esta se debe de hacer desde el backend
      Llaves.claveJWT,
    );
    return token;
  }

  // validar token
  getValidarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
