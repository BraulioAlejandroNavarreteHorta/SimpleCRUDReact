interface PersonaProps {
    nombre: string;
    profesion: string;
}

export default function Persona(props: PersonaProps) {
    return (
        <div>
            <p>
                <b>Nombre:</b> {props.nombre}
            </p>
            <p>
                <b>Profesion:</b> {props.profesion}
            </p>
            <br />
        </div>
    );
}
