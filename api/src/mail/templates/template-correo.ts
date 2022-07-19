const headHtml = `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>`;
const headerBody = `<div style="background-color: #2E4053; color: wheat; font-weight: bold; text-align: center; padding-top: 10px; padding-bottom: 10px; border-radius: 5px;"><h1>Mantenimiento de Vehículos</h1></div>`;

export const templateCreacionUsuario = `${headHtml}<body>${headerBody}
    <div class="container" style="padding-left: 5px;">
        <div class="row">
            <div class="col-sm-12">
                <p>
                    Bienvenido @@username_label.
                </p>
                <p>
                    Tu contraseña temporal es <span style="font-weight: bold;">@@password_label</span>.
                    Debes cambiarla en el primer inicio de sesión.
                </p>
                <p>
                    Puedes acceder a través del siguiente 
                    <a href="http://localhost:3000">enlace</a>.
                </p>
                <p>
                    Esperamos que hagas un uso responsable del sistema.
                </p>
            </div>
        </div>
    </div>
</body>
`;


const CorreoStr = {
  templateCreacionUsuario,
};

export default CorreoStr;
