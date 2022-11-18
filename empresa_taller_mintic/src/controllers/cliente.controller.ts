import { authenticate } from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import {AutenticacionService} from '../services';

/*
  source ./sendgrid.env
*/

// add sendgrid
const enviosSendgrid = require('@sendgrid/mail');
let SENDGRID_API_KEY =
  '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';
enviosSendgrid.setApiKey(process.env.SENDGRID_API_KEY);

@authenticate('admin')
export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}
  @authenticate.skip()
  @post('/identificarCliente', {
    responses: {
      '200': {
        description: 'Identificacion de usuarios',
      },
    },
  })
  // no se puede llamar igual es opcional
  async identificarCliente(@requestBody() credenciales: Credenciales) {
    let clientepersona = await this.servicioAutenticacion.IdentificarPersona(
      credenciales.usuario,
      credenciales.clave,
    );
    if (clientepersona) {
      let token = this.servicioAutenticacion.getGenerarTokenJWT(clientepersona);
      return {
        datos: {
          nombre: clientepersona.nombre,
          correo: clientepersona.correo,
          id: clientepersona.id,
        },
        tk: token,
      };
    } else {
      throw new HttpErrors[401]('Datos invalidos');
    }
  }
  
  @authenticate.skip()
  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    let clave = this.servicioAutenticacion.getGenerarClave();
    let claveCifrada = this.servicioAutenticacion.getCifrarClave(clave);
    cliente.clave = claveCifrada;

    // notificar en gmail con sendgrid
    let destino = cliente.correo;
    let asunto = 'Mantenimientos Gensoft';
    let contenido = `<strong>Señor (a) ${cliente.nombre.toUpperCase()} ${cliente.apellido.toUpperCase()}
    Apreciado (a) Cliente, Atentamente nos permitimos comunicarle que sus datos para el ingreso al Sistema de Información ${asunto} son:

    Nombre de usuario: ${cliente.correo}
    Contraseña: ${clave} </strong>`;

    const mensaje = {
      to: destino, // Change to your recipient
      from: 'gensofmintic2022@gmail.com', // Change to your verified sender
      subject: asunto,
      text: 'este es el texto',
      html: contenido,
    };
    enviosSendgrid.send(mensaje).then(() => {
      console.log('Email enviado');
      console.log(cliente);
    });

    let personaCliente = await this.clienteRepository.create(cliente);
    return personaCliente;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Cliente) where?: Where<Cliente>): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'})
    filter?: FilterExcludingWhere<Cliente>,
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
