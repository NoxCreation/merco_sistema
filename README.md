Proyecto React Next + Electron.js

## Compilar

La idea es construir una aplicación React/Next y levantarla con Electron para que sea visto desde una app de escritorio. Para ello:

1. Se levanta el servidor en producción
2. Se levanta Electron y este consume del servidor local

## Compilar React/Next

Primero se debe realizar el compilado de React/Next con el comando:

        yarn build

## Crear compilación EXE

Crear compilación EXE e instalador.

        yarn electron

## Probar app con Electron

Si tienes el build hecho, puedes levantarlo en electron sin necesidad de compilarlo con:

        yarn start-electron

## Build + Compilar

Si desea obtener el Build de React/Next y luego compilarlo puedes usar

        yarn build-electron

