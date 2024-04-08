import AuthenticationService from '../services/AuthenticationService';

interface DatosFormularioRegistroUsuario {
    nombreUsuario: string;
    nombre: string;
    apellidos: string;
    correo: string;
    telefono: number;
    password: string;
    verificarPassword: string;
}

export default class RegistrarUsuarioTask {
    private datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario;

    public constructor(
        datosFormularioRegistroUsuario: DatosFormularioRegistroUsuario
    ) {
        this.datosFormularioRegistroUsuario =
            datosFormularioRegistroUsuario;
    }

    public async execute(): Promise<void> {
        this.validarDatosFormulario();
        const tokenSesion = await this.registrarUsuario();
        localStorage.setItem('tokenSesion', tokenSesion);
    }

    private async registrarUsuario(): Promise<string> {
        const servicioAutenticacion = new AuthenticationService();

        const {
            nombreUsuario,
            nombre,
            apellidos,
            correo,
            telefono,
            password
        } = this.datosFormularioRegistroUsuario;

        const tokenSesion = servicioAutenticacion.registrarUsuario({
            nombreUsuario,
            nombre,
            apellidos,
            correo,
            telefono,
            password
        });

        return tokenSesion;
    }

    private validarDatosFormulario(): void {
        const {
            nombreUsuario,
            nombre,
            apellidos,
            correo,
            telefono,
            password,
            verificarPassword
        } = this.datosFormularioRegistroUsuario;

        if (
            !nombreUsuario
            || !nombre
            || !apellidos
            || !correo
            || !telefono
            || !password
            || !verificarPassword
        ) {
            throw new Error('ErrorFormularioIncompleto');
        }

        if (password !== verificarPassword) {
            throw new Error('ErrorPasswordsNoCoinciden');
        }
    }
}
