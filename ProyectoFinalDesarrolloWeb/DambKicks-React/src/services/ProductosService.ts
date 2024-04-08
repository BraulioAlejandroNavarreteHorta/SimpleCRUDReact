import axios, { AxiosError } from 'axios';
import Producto from '../models/Producto';

interface ProductoConFormatoDelBackend {
    id: number;
    modelo: string;
    marca: string;
    color: string;
    cantidad: number;
    precio: number;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export default class ProductosService {
    private tokenSesion: string;
    private baseUrl: string;

    public constructor(tokenSesion: string) {
        this.tokenSesion = tokenSesion;
        this.baseUrl = 'http://localhost:3001/productos';
    }

    private get headers() {
        return {
            'Token-Sesion': this.tokenSesion
        };
    }

    public async obtenerLista(): Promise<Producto[]> {
        try {
            const respuesta = await axios.get(
                this.baseUrl,
                { headers: this.headers }
            );

            const listaProductos = respuesta.data.map(
                (producto: ProductoConFormatoDelBackend) => (
                    new Producto(
                        producto.id,
                        producto.modelo,
                        producto.marca,
                        producto.color,
                        producto.cantidad,
                        producto.precio,
                        new Date(producto.fechaCreacion),
                        new Date(producto.fechaActualizacion)
                    )
                )
            );

            return listaProductos;
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async obtenerPorId(id:number): Promise<Producto> {
        try{
            const respuesta = await axios.get(
                `${this.baseUrl}/${id}`,
                { headers: this.headers }
            );

            const {
                modelo,
                marca,
                color,
                cantidad,
                precio,
                fechaCreacion,
                fechaActualizacion
            } = respuesta.data as ProductoConFormatoDelBackend;

            return new Producto(
                id,
                modelo,
                marca,
                color,
                cantidad,
                precio,
                new Date(fechaCreacion),
                new Date (fechaActualizacion)
            );
        }catch(e){
            if(e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 401:
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 404:
                        throw new Error('ErrorAutoNoEncontrado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async registrar(producto: Producto) : Promise<Producto> {
        try{
            const respuesta = await axios.post(
                this.baseUrl,
                producto,
                { headers: this.headers } //tokenSesion
            );

            const {
                
                id,
                modelo,
                marca,
                color,
                cantidad,
                precio,
                fechaCreacion,
                fechaActualizacion

            } = respuesta.data as ProductoConFormatoDelBackend; //data es el body de la respuesta

            return new Producto(
                id,
                modelo,
                marca,
                color,
                cantidad,
                precio,
                new Date(fechaCreacion),
                new Date (fechaActualizacion)
            ); 
        } catch (e) {
            if(e instanceof AxiosError && e.response){
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409: // Conflict (Duplicado)
                        throw new Error('ErrorModeloDuplicado');
                    default:
                        throw e;
                } 
            }
            throw e;
        }
    }

    public async actualizar(producto: Producto, id: number): Promise<Producto> {
        try {
            const respuesta = await axios.put(
                `${this.baseUrl}/${id}`,
                producto,
                { headers: this.headers }
            );

            const {
                modelo,
                marca,
                color,
                cantidad,
                precio,
                fechaCreacion,
                fechaActualizacion
            } = respuesta.data as ProductoConFormatoDelBackend;

            return new Producto(
                id,
                modelo,
                marca,
                color,
                cantidad,
                precio,
                new Date(fechaCreacion),
                new Date (fechaActualizacion)
            )
        } catch (e) {
            if (e instanceof AxiosError && e.response) {
                switch (e.response.status) {
                    case 400: // Bad Request
                        throw new Error('ErrorFormularioIncompleto');
                    case 401: // Unauthorized
                        throw new Error('ErrorSesionExpiradaOInvalida');
                    case 409: // Conflict
                        throw new Error('ErrorModeloDuplicado');
                    default:
                        throw e;
                }
            }

            throw e;
        }
    }

    public async eliminar(producto:Producto): Promise<void>{
        try {
            await axios.delete(
                `${this.baseUrl}/${producto.id}`,
                {headers: this.headers}
            );
        } catch (e) {
            if(e instanceof AxiosError && e.response){
                switch(e.response.status){
                    case 404:
                        throw new Error('ErrorAutoNoEncontrado');
                    default:
                        throw new Error('ErrorDesconocido');
                }
            }
        } 
    }
}
