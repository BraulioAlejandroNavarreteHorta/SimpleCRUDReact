import { Application, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import Producto from '../models/entities/Producto';
import Sesion from '../models/Sesion';
import BaseController from './BaseController';

interface RegistrarActualizarRequestBody {
    modelo: string;
    path: string;
    marca: string;
    color: string;
    cantidad: number;
    precio: number;
}

export default class ProductosController extends BaseController {
    protected initializeRouter(): void {
        this.router.all('*', Sesion.verificarTokenSesion);

        this.router.get('/', this.consultarTodos);
        this.router.get('/:id', this.buscarPorId);
        this.router.post('/', this.registrar);
        this.router.put('/:id', this.actualizar);
        this.router.delete('/:id', this.eliminar);
    }

    private async consultarTodos(req: Request, res: Response): Promise<void> {
        try {
            const productos = await Producto.consultarTodos();
    
            res.status(HttpStatusCodes.OK).json(productos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    private async buscarPorId(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const producto = await Producto.buscarPorId(id);

            res.status(HttpStatusCodes.OK).json(producto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async registrar(req: Request, res: Response): Promise<void> {
        try {
            const {
                modelo,
                marca,
                color,
                cantidad,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!modelo || !marca || !color || !cantidad || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }
    
            const nuevoUsuario = await Producto.registrar(modelo, marca, color, cantidad, precio);
    
            res.status(HttpStatusCodes.OK).json(nuevoUsuario);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un producto con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async actualizar(req: Request, res: Response): Promise<void> {
        try {
            const {
                modelo,
                marca,
                color,
                cantidad,
                precio
            } = <RegistrarActualizarRequestBody>req.body;

            if (!modelo || !marca || !color || !cantidad || !precio) {
                res.status(HttpStatusCodes.BAD_REQUEST).end();
                return;
            }

            const id = parseInt(req.params.id);

            const producto = await Producto.buscarPorId(id);

            await producto.actualizar(modelo, marca, color, cantidad, precio);
    
            res.status(HttpStatusCodes.OK).json(producto);
        } catch (e) {
            if (e instanceof Error && e.message === 'ErrorProductoNoEncontrado') {
                res.status(HttpStatusCodes.NOT_FOUND).end();
                return;
            }

            if (e instanceof Error && e.message === 'ErrorModeloDuplicado') {
                res.status(HttpStatusCodes.CONFLICT).json({ mensaje: 'Ya existe un producto con el mismo modelo.' });
                return;
            }

            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }
    
    private async eliminar(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id);

            const productos = await Producto.eliminar(id);
    
            res.status(HttpStatusCodes.OK).json(productos);
        } catch (e) {
            console.error(e);
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).end();
        }
    }

    public static mount(app: Application): ProductosController {
        return new ProductosController(app, '/productos');
    }
}
