import Link from 'next/link';

export function PrivacyContent() {
  return (
    <>
      <h1>política de privacidad</h1>
      <p className="legal-updated">última actualización: 17 de octubre de 2026</p>
      <p className="legal-updated">
        esta es una traducción. si difiere de la{' '}
        <span lang="en">versión en inglés</span>, la versión en inglés es la que
        vale.
      </p>

      <p>
        binary garden es una comunidad que crea software libre y de código
        abierto. esta página explica qué guarda binarygarden.com cuando creas una
        cuenta, por qué, y quién más lo ve. en resumen: solo lo que necesita el
        inicio de sesión, nunca se vende, sin anuncios, sin rastreo.
      </p>

      <h2>qué recopilamos</h2>
      <ul>
        <li>
          <b>tu cuenta:</b> tu correo electrónico y tu nombre, y tu foto de
          perfil si inicias sesión con google, github o apple.
        </li>
        <li>
          <b>cómo inicias sesión:</b> una contraseña cifrada con hash si usas una
          (nunca vemos la contraseña en sí), la parte pública de las llaves de
          acceso que añadas, y qué cuenta de google, github o apple está
          vinculada.
        </li>
        <li>
          <b>tus sesiones:</b> mientras tienes la sesión iniciada, la dirección ip
          y el navegador con que la iniciaste, para que sigas conectado y para
          detectar abusos.
        </li>
        <li>
          <b>apps que permites:</b> qué apps has dejado usar tu cuenta de binary
          garden, y qué permitiste ver a cada una.
        </li>
      </ul>

      <h2>inicio de sesión con google, github y apple</h2>
      <p>
        cuando inicias sesión con uno de ellos, solo recibimos tu nombre, tu
        correo electrónico y tu foto de perfil. los usamos para crear e
        identificar tu cuenta de binary garden y para nada más. no leemos tus
        contactos, archivos ni nada más allá de eso, y no compartimos esta
        información con nadie excepto con las apps que permitas de forma
        explícita, como se describe abajo.
      </p>

      <h2>apps que usan el inicio de sesión de binary garden</h2>
      <p>
        otras apps pueden ofrecer &ldquo;iniciar sesión con binary garden&rdquo;.
        una app solo recibe tu información después de que la apruebas en una
        pantalla de consentimiento que muestra exactamente qué verá (por ejemplo,
        tu nombre y tu correo). lo que esa app haga después lo cubre su propia
        política de privacidad.
      </p>

      <h2>cookies y almacenamiento</h2>
      <p>
        usamos dos cookies: la que mantiene tu sesión iniciada, y una que
        recuerda tu idioma si eliges uno. tu preferencia de tema claro u oscuro
        se guarda en tu propio navegador. no hay cookies de analítica, publicidad
        ni rastreo.
      </p>

      <h2>quién más maneja tus datos</h2>
      <ul>
        <li>
          <b>google cloud</b> aloja el sitio y la base de datos, en estados
          unidos.
        </li>
        <li>
          <b>resend</b> entrega nuestros correos (verificación y restablecimiento
          de contraseña), así que ve tu correo electrónico.
        </li>
      </ul>
      <p>nunca vendemos tus datos ni los compartimos con anunciantes.</p>

      <h2>cuánto tiempo los guardamos</h2>
      <p>
        la información de tu cuenta se queda hasta que nos pidas borrar tu
        cuenta. las sesiones caducan solas, y los enlaces de verificación y de
        restablecimiento dejan de funcionar poco después de enviarse.
      </p>

      <h2>tus opciones</h2>
      <p>
        puedes cerrar sesión y quitar llaves de acceso desde tu{' '}
        <Link href="/account">página de cuenta</Link>. para obtener una copia de
        tus datos o borrar tu cuenta, contáctanos y lo haremos.
      </p>

      <h2>menores</h2>
      <p>binary garden no está pensado para menores de 13 años.</p>

      <h2>cambios</h2>
      <p>
        si esta política cambia, actualizaremos esta página y su fecha. si los
        cambios son importantes, avisaremos por correo a quienes tengan cuenta.
      </p>

      <h2>contacto</h2>
      <p>
        preguntas o solicitudes: escríbenos a través de{' '}
        <a href="https://github.com/thebinarygarden">github.com/thebinarygarden</a>.
      </p>
    </>
  );
}
