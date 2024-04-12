
import { ContactoDesktop } from "./ContactoDesktop";
import { ContactoCelu } from "./ContactoCelu";


export const Contacto = ({ sendEmail, form, nombre, email, mensaje, setNombre, setEmail, setMensaje }) => {
  return (
    <div>
      {window.innerWidth > 768 ? (
        <ContactoDesktop
          sendEmail={sendEmail}
          form={form}
          nombre={nombre}
          email={email}
          mensaje={mensaje}
          setNombre={setNombre}
          setEmail={setEmail}
          setMensaje={setMensaje}
        />
      ) : (
        <ContactoCelu
          sendEmail={sendEmail}
          form={form}
          nombre={nombre}
          email={email}
          mensaje={mensaje}
          setNombre={setNombre}
          setEmail={setEmail}
          setMensaje={setMensaje}
        />
      )}
    </div>
  );
};
