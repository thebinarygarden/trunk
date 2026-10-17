import Link from 'next/link';

export function TermsContent() {
  return (
    <>
      <h1>términos del servicio</h1>
      <p className="legal-updated">última actualización: 17 de octubre de 2026</p>
      <p className="legal-updated">
        esta es una traducción. si difiere de la{' '}
        <span lang="en">versión en inglés</span>, la versión en inglés es la que
        vale.
      </p>

      <p>
        estos términos cubren tu uso de binarygarden.com y de tu cuenta de binary
        garden. al crear una cuenta o iniciar sesión, los aceptas.
      </p>

      <h2>qué es binary garden</h2>
      <p>
        binary garden es una comunidad que crea software libre y de código
        abierto. una cuenta de binary garden te permite iniciar sesión en los
        productos de binary garden, y en otras apps que ofrecen &ldquo;iniciar
        sesión con binary garden&rdquo;.
      </p>

      <h2>tu cuenta</h2>
      <ul>
        <li>danos un correo electrónico real en el que puedas recibir mensajes.</li>
        <li>
          protege tu contraseña y tus llaves de acceso. eres responsable de lo
          que pase con tu cuenta.
        </li>
        <li>una persona por cuenta. no la compartas.</li>
      </ul>

      <h2>uso aceptable</h2>
      <p>no uses binary garden para:</p>
      <ul>
        <li>violar la ley o hacer daño a otras personas;</li>
        <li>
          entrar en cuentas o sistemas que no son tuyos, o probar nuestra
          seguridad sin preguntarnos primero;
        </li>
        <li>
          sobrecargar el servicio, o crear cuentas en masa o de forma automática;
        </li>
        <li>hacerte pasar por otra persona.</li>
      </ul>
      <p>podemos suspender o cerrar las cuentas que lo hagan.</p>

      <h2>apps que usan el inicio de sesión de binary garden</h2>
      <p>
        cuando permites que otra app use tu cuenta de binary garden, tu uso de esa
        app queda entre tú y quien la administra. a esa app se le aplican sus
        propios términos y política de privacidad, no estos.
      </p>

      <h2>código abierto</h2>
      <p>
        nuestro código es abierto y está publicado en{' '}
        <a href="https://github.com/thebinarygarden">github</a>. la licencia de
        cada proyecto cubre el código en sí; los proyectos actuales usan la
        agpl-3.0. estos términos cubren el servicio alojado en binarygarden.com.
      </p>

      <h2>sin garantía</h2>
      <p>
        binary garden es gratuito y se ofrece &ldquo;tal cual&rdquo;, sin
        garantías de ningún tipo. trabajamos para mantenerlo funcionando y tus
        datos seguros, pero no podemos prometer que siempre esté disponible o
        libre de errores. en la medida en que la ley lo permita, binary garden y
        quienes contribuyen no son responsables de pérdidas por usarlo o por no
        poder usarlo.
      </p>

      <h2>terminar</h2>
      <p>
        puedes dejar de usar binary garden en cualquier momento y pedirnos que
        borremos tu cuenta (consulta la{' '}
        <Link href="/privacy">política de privacidad</Link>). podemos cambiar o
        detener el servicio; si lo cerramos, avisaremos con anticipación a quienes
        tengan cuenta.
      </p>

      <h2>cambios</h2>
      <p>
        si estos términos cambian, actualizaremos esta página y su fecha. si los
        cambios son importantes, avisaremos por correo a quienes tengan cuenta.
      </p>

      <h2>contacto</h2>
      <p>
        preguntas: escríbenos a través de{' '}
        <a href="https://github.com/thebinarygarden">github.com/thebinarygarden</a>.
      </p>
    </>
  );
}
