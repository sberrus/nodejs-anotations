# Concept or problem to solve

Nodejs es single-threaded lo que hace que toda la aplicación corrar en un solo nucleo del sistema. Esto ayuda para ciertas operaciones pero en el caso de necesitar un uso intensivo del CPU esto hará que toda nuestra aplicación se bloquee.

Para prevenir este problema Nodejs tiene le modulo de **clusters** el cual nos permite crear workers para que estos, compartiendo el mismo puerto de la aplicación ejecute nuevos _child-process_ el cual nos permita gestionar de una mejor manera el uso del CPU y sus recursos.

En el ejemplo tenemos un archivo no-clusters.js el cual tiene 2 rutas "/" y "/slow-page". En slow page estamos simulando un proceso el cual consume muchos recursos del CPU el cual mientras este se esta ejecutando, bloquea el resto de peticiones. Podemos abrir 2 navegadores y uno con la ruta "/solw-page" y después de abrir dicha ruta, intentar abrir la otra ruta con "/"; observandose que mientra el proceso se esta ejecutando, el servidor no da respuesta de la ruta "/" hasta que el proceso acabe.

## Master

El master es el proceso principal el cual se encarga de gestionar los workeres (child-process) de ser necesario.

## Workers

Los workers son los procesos hijos de la app los cuales se encargarán de gestionar las peticiones y respuestas, el manejo de archivos, los recursos etc...

Cada worker cuenta con su propio event-loop, memoria e instancia V8.

En el archivo cluster.js podremos observar como configurar y aprovechar el uso de los clusters para gestionar multiples procesos.

