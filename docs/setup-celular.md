# Preparando ambiente de desenvolvimento (com dispositivo físico)

Este tutorial ensina como rodar um projeto react-native em um dispositivo físico. [Link da documentação oficial](https://facebook.github.io/react-native/docs/running-on-device)

## Introdução

Para rodar tanto o projeto no celular quanto no emulador, precisamos do SDK do android.

Assim, este tutorial passará informações a partir do pressuposto que você tenha o SDK. O método menos trabalhoso talvez seja [instalar o Android Studio](https://developer.android.com/studio/) (pode ser pelo site deles ou pela JetBrains).

## Preparando as ferramentas do SDK

No processo de configuração será(ão) utilizado(s) programa(s) do SDK. Estes podem ser localizados em:

`C:\Users\{user}\AppData\Local\Android\Sdk\platform-tools`

No nosso caso, utilizaremos apenas o `adb`, assim, para não ter que digitar esse caminho monstruoso na mão toda vez, podemos adicionar na PATH, ou caminho, do Windows.

1. Pesquise por _"PATH"_ na barra de pesquisas do Windows e clique na primeira opção, _"Editar as variáveis de ambiente do sistema"_

2. Abra a janela e clique em _"variáveis de ambiente"_, na parte inferior

3. Em variáveis do sistema, abra a variável _Path_

4. Clique no botão _novo_ e adicione o caminho **para a pasta**, não coloque o executável no final do caminho, apenas da pasta dele

5. Clique em OK, Aplicar, OK...

Assim, para executar o arquivo, basta escrever `adb {parametros}`

## Preparando o celular

Para permitir a depuração por USB do seu celular (android), vá em `Configurações -> Sistema -> Sobre o dispositivo` e clique 7 vezes em `número da versão`, até desbloquear as ferramentas de desenvolvedor.

Voltando para `Configurações -> Sistema _> Opções de desenvolvedor`, temos, na seção de `Depuração`, a opção `Depuração USB`, a qual ativaremos.

## Conectando as duas partes

No cmd, então, utilizaremos os seguintes comandos:

`adb devices` lista os dispositivos conectados no servidor do adb
`adb kill-server` fecha o servidor do adb
`adb start-server` inicia o servidor do adb

**Observações:** Toda vez, ao iniciar um servidor do adb, o dispositivo irá perguntar se deseja realmente se conectar, então é só aceitar. Além disso, _restartar_ o server costuma resolver diversos problemas.

## Rodando o projeto

Depois disso, é só rodar o projeto normalmente, com `react-native run-android`, `yarn start` ou `react-native start`
