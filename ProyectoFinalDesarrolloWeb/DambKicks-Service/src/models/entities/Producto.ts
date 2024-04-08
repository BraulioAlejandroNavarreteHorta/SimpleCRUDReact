import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'productos' })
export default class Producto {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 120, nullable: false, unique: true })
    public modelo: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public marca: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    public color: string;

    @Column({ type: 'double', nullable: false })
    public cantidad: number;

    @Column({ type: 'double', nullable: false })
    public precio: number;

    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        modelo: string,
        marca: string,
        color: string,
        cantidad: number,
        precio: number,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public async actualizar(
        modelo: string,
        marca: string,
        color: string,
        cantidad: number,
        precio: number
    ): Promise<void> {
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fechaActualizacion = new Date();

        const repositorioUsuarios = await Producto.obtenerRepositorioProductos();

        try {
            await repositorioUsuarios.save(this);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }
    }

    public static async consultarTodos(): Promise<Producto[]> {
        const repositorioUsuarios = await Producto.obtenerRepositorioProductos();
        return repositorioUsuarios.find();
    }

    public static async buscarPorId(id: number): Promise<Producto> {
        const repositorioUsuarios = await Producto.obtenerRepositorioProductos();

        const producto = await repositorioUsuarios.findOneBy({ id });

        if (!producto) {
            throw new Error('ErrorProductoNoEncontrado');
        }

        return producto;
    }

    public static async registrar(
        modelo: string,
        marca: string,
        color: string,
        cantidad: number,
        precio: number
    ): Promise<Producto> {
        const repositorioUsuarios = await Producto.obtenerRepositorioProductos();

        const fechaCreacion = new Date();

        const producto = new Producto(
            undefined,
            modelo,
            marca,
            color,
            cantidad,
            precio,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(producto);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorModeloDuplicado');
            }

            throw e;
        }

        return producto;
    }

    public static async eliminar(id: number): Promise<void> {
        const repositorioUsuarios = await Producto.obtenerRepositorioProductos();
        await repositorioUsuarios.delete(id);
    }

    private static async obtenerRepositorioProductos(): Promise<Repository<Producto>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Producto);
    }
}
