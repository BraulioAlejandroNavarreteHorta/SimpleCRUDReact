import { Entity, PrimaryGeneratedColumn, Column, Repository, QueryFailedError } from 'typeorm';
import { threadId } from 'worker_threads';
import DatabaseConnection from '../../database/DatabaseConnection';

@Entity({ name: 'usuarios' })
export default class Usuario {
    @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
    public id: number;

    @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
    public nombreUsuario: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public nombre: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public apellidos: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    public correo: string;

    @Column({ type: 'bigint', nullable: false })
    public telefono: number;

    @Column({ type: 'varchar', length: 32, nullable: false })
    public password: string;
    
    @Column({ type: 'datetime', nullable: false })
    public fechaCreacion: Date;

    @Column({ type: 'datetime', nullable: false })
    public fechaActualizacion: Date;

    private constructor(
        id: number | undefined,
        nombreUsuario: string,
        nombre: string,
        apellidos: string,
        correo: string,
        telefono: number,
        password: string,
        fechaCreacion: Date,
        fechaActualizacion: Date
    ) {
        this.id = <number>id;
        this.nombreUsuario = nombreUsuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.telefono = telefono;
        this.password = password;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
    }

    public static async registrar(
        nombreUsuario: string,
        nombre: string,
        apellidos: string,
        correo: string,
        telefono: number,
        password: string
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const fechaCreacion = new Date();

        const usuario = new Usuario(
            undefined,
            nombreUsuario,
            nombre,
            apellidos,
            correo,
            telefono,
            password,
            fechaCreacion,
            fechaCreacion
        );

        try {
            await repositorioUsuarios.save(usuario);
        } catch (e) {
            if (e instanceof QueryFailedError && e.message.includes('ER_DUP_ENTRY')) {
                throw new Error('ErrorNombreUsuarioDuplicado');
            }

            throw e;
        }

        return usuario;
    }

    public static async buscarPorNombreUsuarioYPassword(
        nombreUsuario: string,
        password: string
    ): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ nombreUsuario, password });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    public static async buscarPorId(id: number): Promise<Usuario> {
        const repositorioUsuarios = await this.obtenerRepositorioUsuarios();

        const usuario = await repositorioUsuarios.findOneBy({ id });

        if (!usuario) {
            throw new Error('ErrorUsuarioNoEncontrado');
        }

        return usuario;
    }

    private static async obtenerRepositorioUsuarios(): Promise<Repository<Usuario>> {
        const databaseConnection = await DatabaseConnection.getConnectedInstance();
        return databaseConnection.getRepository(Usuario);
    }
}
