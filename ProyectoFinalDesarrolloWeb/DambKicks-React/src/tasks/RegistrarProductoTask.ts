import Producto from "../models/Producto";
import ProductosService from "../services/ProductosService";

export default class RegistrarProductoTask {
    private producto: Producto;

    public constructor(producto: Producto){
        this.producto = producto;
    }

    public async execute(): Promise<void> {
        this.validar();
        await this.registrarProducto();
    }

    private validar(): void{
        const {modelo, marca, color, cantidad, precio} = this.producto;
        
        if(!modelo || !marca || !color ||!cantidad || !precio){
            throw new Error('ErrorFormularioIncompleto');
        }
    }

    public async registrarProducto(): Promise<void> {
        const tokenSesion = localStorage.getItem('tokenSesion');

        if(!tokenSesion){
            throw new Error('ErrorSesionExpiradaOInvalida');
        }

        const servicioProductos = new ProductosService(tokenSesion);
        await servicioProductos.registrar(this.producto);
    }
}