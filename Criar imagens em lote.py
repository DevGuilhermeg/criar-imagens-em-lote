from PySimpleGUI import PySimpleGUI as sg
import execjs

caminho_script_js = "script.js"

# Layout da primeira janela
sg.theme('Reddit')
layout = [
    [sg.Text('*Selecione o caminho das imagens'),sg.Text('*info: "As imagens tem que ser (png)"', font=('Helvetica', 7), size=(20, 2))],
    [sg.InputText(key='images'), sg.FolderBrowse(target='images')],

    [sg.Text('___________________________________________________')],

    [sg.Text('*Selecione a pasta onde as imagens serão salvas')],
    [sg.InputText(key='caminho'), sg.FolderBrowse(target='caminho')],

    [sg.Text('___________________________________________________')],

    [sg.Text('*Selecione o caminho da moldura')],
    [sg.InputText(key='moldura'), sg.FileBrowse(target='moldura', file_types=(("PNG Files", "*.png"),))],

    [sg.Text('___________________________________________________')],

    [sg.Text('*Selecione o caminho do json')],
    [sg.InputText(key='json'), sg.FileBrowse(target='json', file_types=(("JSON Files", "*.json"),))],

    [sg.Text('*Multiplicar', font=('Helvetica', 10) ), sg.Input(key='multiplicar',default_text='1', size=(4, 1)),sg.Text('Número de (0-9)', font=('Helvetica', 7))],

    [sg.Text('Salvar como?', font=('Helvetica', 10) ), sg.Input(key='nome',default_text='Nova', size=(20, 1)),sg.Text('Digite o nome que deseja salvar as imagens!', font=('Helvetica', 7), size=(20, 2))],

    [sg.Button('OK'), sg.Button('Informações')]
]

info_layout = [
    [sg.Text('Informações sobre o caminho do JSON')],
    [sg.InputText(key='info_json', size=(30, 1))],
    [sg.Button('Voltar')]
]

# Janelas
janela = sg.Window('Criar imagens em lote', layout)
janela_info = None  # Inicialmente, a segunda janela é None

# Ler os eventos
while True:
    eventos, valores = janela.read()

    if eventos == sg.WINDOW_CLOSED:
        break

    if eventos == 'OK':
        caminhoimagens = valores['images']
        caminhodestino = valores['caminho']
        caminhomoldura = valores['moldura']
        caminhojson = valores['json']
        multiplicar = valores['multiplicar']
        nome = valores['nome']

        print(f'Caminho das imagens: {caminhoimagens}')
        print(f'Caminho onde serão salvos: {caminhodestino}')
        print(f'Caminho da moldura: {caminhomoldura}')
        print(f'Caminho do Json: {caminhojson}')
        print(f'Multiplicar: {multiplicar}')
        print(f'Salvar como: {nome}.png')





        # Leia o conteúdo do arquivo JavaScript
        with open(caminho_script_js, "r") as arquivo_js:
            codigo_js = arquivo_js.read()

        # Crie um contexto JavaScript
            context = execjs.compile(codigo_js)

            # Substitua argumento1, argumento2, argumento3 e argumento4 pelos valores de texto desejados
            arg1 = caminhoimagens #"./imagens/"
            arg2 = caminhodestino #"./Imagens criadas/"
            arg3 = caminhojson #'./Versiculos.json'
            arg4 = caminhomoldura #'./mold.png'
            arg5 = multiplicar #'3'
            

        # Execute o código JavaScript com os 4 argumentos
            resultado = context.call("suaFuncaoJavaScript", arg1, arg2, arg3, arg4, arg5, nome)

        # Faça algo com o resultado
            print(resultado)


    if eventos == 'Informações':
        if janela_info is not None:
            janela_info.close()
            
        info_json = valores['json']
        info_layout = [
            [sg.Text('Informações dos arquivos')],
            [sg.Text(f'Caminho do JSON: {info_json}')],
            [sg.Button('Voltar')]
        ]

        janela_info = sg.Window('Informações', info_layout)

        while True:
            eventos_info, valores_info = janela_info.read()

            if eventos_info == sg.WINDOW_CLOSED or eventos_info == 'Voltar':
                janela_info.close()
                break

# Feche as janelas
janela.close()
if janela_info is not None:
    janela_info.close()
