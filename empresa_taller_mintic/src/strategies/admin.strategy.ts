import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';

export class ExtratefiaAdministrador implements AuthenticationStrategy {
  name: string = 'admin';
  constructor(
    @service(AutenticacionService)
    public servicoAutenticacion: AutenticacionService,
  ) {}
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicoAutenticacion.getValidarToken(token);
      if (datos) {
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
          // aqui se puede validar el rol de los usuarios
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('El token inculido no es valido.');
      }
    } else {
      throw new HttpErrors[401]('No se a incluido un token en la solicitud.');
    }
  }
}
