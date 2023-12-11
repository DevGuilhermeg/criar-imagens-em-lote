# Criador de Imagens em Lote

## Descrição

Este aplicativo Python foi desenvolvido para criar imagens em lote, adicionando versículos e localizações a imagens específicas. O projeto utiliza Python, JavaScript (Node.js) e a biblioteca PySimpleGUI para a interface gráfica.

## Funcionalidades

- **Adição de Texto Dinâmico:** Adiciona versículos aleatórios de um arquivo JSON a imagens selecionadas.
- **Redimensionamento Automático:** Redimensiona as imagens para o formato padrão de 1080x1080.
- **Aplicação de Moldura:** Adiciona uma moldura predefinida às imagens geradas.
- **Personalização:** Permite a escolha do diretório de origem, destino, arquivo JSON e moldura, além de especificar a quantidade de repetições do processo.
- **Interface Gráfica Intuitiva:** Criada com o PySimpleGUI, a interface torna o processo fácil e acessível.

## Como Usar

1. **Caminho das Imagens:** Selecione o diretório contendo as imagens de origem (formato PNG).
2. **Caminho de Destino:** Escolha o diretório onde as imagens geradas serão salvas.
3. **Caminho da Moldura:** Indique o arquivo da moldura a ser aplicada às imagens.
4. **Caminho do JSON:** Escolha um arquivo JSON contendo versículos para adicionar às imagens.
5. **Multiplicador:** Defina o número de vezes que o processo será repetido.
6. **Nome da Imagem:** Especifique o nome desejado para as imagens geradas.
7. **Clique em "OK"** para iniciar o processo de criação das imagens.

## Requisitos

Certifique-se de ter o Python instalado no seu sistema. Utilize o seguinte comando para instalar as dependências:

```bash
pip install PySimpleGUI
pip install PyExecJS
