import { Request, Response, Application } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Usuario from '../models/entities/Usuario';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistroRequestBody {
    nombreUsuario: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: number;
    password: string;
}

interface LoginRequestBody {
    nombreUsuario: string;
    password: string;
}

export default class AuthenticationController extends BaseController {
    protected initializeRouter(): void {
        this.router.post('/registro', this.registro);
        this.router.post('/iniciarSesion', this.iniciarSesion);
    }

    private async registro(req: Request, res: Response): Promise<void> {
        try {
            const {
                nombreUsuario,
                nombre,
                apellidos,
                correo,
                telefono,
                password
            } = <RegistroRequestBody>req.body;

            if (!nombreUsuario || !nombre || !apellidos ||!correo || !telefono || !password) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Usuario.registrar(nombreUsuario, nombre, apellidos, correo, telefono, password);

            const sesion = Sesion.crearParaUsuario(nuevoUsuario);
    
            res.status(HttpStatusCodes.OK).json(sesion);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorNombreUsuarioDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un usuario con el mismo nombre de usuario.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async iniciarSesion(req: Request, res: Response): Promise<void> {
        try {
            const { nombreUsuario, password } = <LoginRequestBody>req.body;

            if (!nombreUsuario || !password) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
        
            const usuario = await Usuario.buscarPorNombreUsuarioYPassword(nombreUsuario, password);

            const sesion = Sesion.crearParaUsuario(usuario);
            
            res.status(HttpStatusCodes.OK).json(sesion);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorUsuarioNoEncontrado') {
                res.status(HttpStatusCodes.UNAUTHORIZED).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): AuthenticationController {
        return new AuthenticationController(app, '/auth');
    }
}
