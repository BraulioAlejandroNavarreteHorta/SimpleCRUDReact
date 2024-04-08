export default class Producto {
    public id: number;

    public modelo: string;

    public marca: string;

    public color: string;

    public cantidad: number;

    public precio: number;

    public fechaCreacion: Date;

    public fechaActualizacion: Date;

    public constructor(
        id: number | undefined,
        modelo: string,
        marca: string,
        color: string,
        cantidad: number,
        precio: number,
        fechaCreacion?: Date,
        fechaActualizacion?: Date
    ) {
        this.id = id as number;
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion as Date;
        this.fechaActualizacion = fechaActualizacion as Date;
    }
}
