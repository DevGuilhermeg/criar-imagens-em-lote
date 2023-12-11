const fs = require('fs').promises;
const path = require('path');
const Jimp = require('jimp');

function suaFuncaoJavaScript(arg1, arg2, arg3, arg4, arg5, nome) {
    // Faça algo com os argumentos aqui
    console.log(arg1, arg2, arg3, arg4);

    const caminhoImagens = arg1;
    const caminhoDestino = arg2;
    const caminhoVersiculos = arg3;
    const moldura = arg4
    const quant = arg5 //quantidade de vezes da repetiçao
    const valor = process.argv[2] || 4; 
    

for (let i = 0; i < quant; i++) {
    // Loop
    console.log("Iteração " + i);


    async function ajustarTomImagem(imagem) {
        // Ajusta o tom da imagem para melhorar a legibilidade do texto branco
        imagem.color([
            { apply: 'mix', params: [Jimp.rgbaToInt(255, 255, 255, 255), 50] }
        ]);
    }

    async function adicionarTextoEmImagens() {
        const versiculos = JSON.parse(await fs.readFile(caminhoVersiculos, 'utf-8'));
        const imagens = await fs.readdir(caminhoImagens);
    
        for (let i = 0; i < imagens.length; i++) {
            const imagemNome = imagens[i];
            if (imagemNome.endsWith('.png') || imagemNome.endsWith('.jpg')) {
                const imagemCaminho = path.join(caminhoImagens, imagemNome);
                let imagem = await Jimp.read(imagemCaminho);

                const fonteDesejada = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE); // Fonte branca
                const fonteLocalizacao = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE); // Fonte branca para a localização

                await ajustarTomImagem(imagem);

                // Redimensiona a imagem para 1080x1080
                imagem.resize(1080, 1080);

                const maxWidth = imagem.bitmap.width * 0.8; // Largura máxima de 80% da imagem
                const maxHeight = imagem.bitmap.height * 0.8; // Altura máxima de 80% da imagem

                // Seleciona um versículo aleatório do JSON que tenha menos de 100 letras
                let versiculo;
                do {
                    versiculo = versiculos[Math.floor(Math.random() * versiculos.length)];
                } while (versiculo.versiculo.length >= 200);

                const textHeight = Jimp.measureTextHeight(fonteDesejada, versiculo.versiculo, maxWidth);
                const x = (imagem.bitmap.width - maxWidth) / 2; // Centraliza horizontalmente
                const y = (imagem.bitmap.height - textHeight) / 2; // Centraliza verticalmente

                imagem.print(
                    fonteDesejada,
                    x, y, 
                    {
                        text: versiculo.versiculo,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
                    }, 
                    maxWidth, 
                    maxHeight
                );

                const localizacao = versiculo.localizacao;
                const localizacaoTextHeight = Jimp.measureTextHeight(fonteLocalizacao, localizacao, maxWidth);
                const localizacaoX = (imagem.bitmap.width - maxWidth) / 2; // Centraliza horizontalmente
                const localizacaoY = y + textHeight + 10; // Posição abaixo do primeiro texto com espaço de 10 pixels

                imagem.print(
                    fonteLocalizacao,
                    localizacaoX, localizacaoY, 
                    {
                        text: localizacao,
                        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
                    }, 
                    maxWidth, 
                    maxHeight
                );

                const mold = await Jimp.read(moldura);
                mold.resize(imagem.bitmap.width, imagem.bitmap.height);

                const imagemComMoldura = imagem.clone().composite(mold, 0, 0);

                const { v4: uuidv4 } = require('uuid');

                // Gerar um ID único
                const idUnico = uuidv4();

                //  console.log("ID único gerado:", idUnico);
                console.log("Imagem: ",nome, i, ".png Criada com sucesso!!!");

                const nomeDaimagem = nome + i + '.png';
                

                
                
                const caminhoImagemFinal = path.join(caminhoDestino, nomeDaimagem);
                await imagemComMoldura.writeAsync(caminhoImagemFinal);
            }
        }

        console.log('Texto adicionado às imagens e imagens salvas na pasta ImagensComTexto!');
    }

    adicionarTextoEmImagens();}}
