# Estudo OCR

Projeto de estudos com foco na utilização de OCR e desenvolvimento de métodos JS.

Aplicativo desenvolvido com a finalidade de extrair nome e CPF de documentos, utilizando bibliotecas baseadas no GoogleVision.

Funções desenvolvidas e testadas utilizando como exemplo documentos CNH digital, Nova Carteira-Cartão CNH e o modelo mais comum de CNH.

Para rodar:
```
yarn start
```

```
yarn android
```
## Exemplos

Nos seguintes exemplos o CPF é captado e extraído da imagem automaticamente, e o nome aparece em um campo selecionável através de um clique.

###### Primeiro documento:
![fotoocrdocs1](https://user-images.githubusercontent.com/83622741/219043662-8157c316-5593-4b9c-ab9f-09e643011085.png) 

###### Modal com os blocos lidos:
![fotoocrdocs2](https://user-images.githubusercontent.com/83622741/219043912-c5939ae3-3003-4aaf-beec-3d56377010d5.png)

###### Resultado:
![fotoocrdocs3](https://user-images.githubusercontent.com/83622741/219044194-037cd844-2cba-4f02-98a3-d0dd2709573c.png)

###### Segundo documento:
![fotoocrdocs6](https://user-images.githubusercontent.com/83622741/219045495-dc747e3a-5245-4a88-ac08-9d4c3fd9b2ca.png)
![fotoocrdocs7](https://user-images.githubusercontent.com/83622741/219048163-bbbd5eb3-bcf9-43d7-a41e-b1d024ad59d4.png)
###### Ajuste de nome devido a falha no reconhecimento de caracteres:
![fotoocrdoscnameadjust](https://user-images.githubusercontent.com/83622741/219048693-7106572d-2a74-49f6-9098-b9e2c5857e62.png)

###### Terceiro documento:
![image](https://user-images.githubusercontent.com/83622741/219050823-328bec74-2dbe-47e4-ac17-e20a124a7481.png)
![fotoocrdocs9](https://user-images.githubusercontent.com/83622741/219051039-44aa4213-ade5-421a-b945-17017baaa0b3.png)
###### Neste documento, o sobrenome se encontrava em outro campo:
![fotoocrsdocs12](https://user-images.githubusercontent.com/83622741/219051367-10214639-b4ab-4556-9063-c97efafbe02d.png)
![fotoocrdocs13](https://user-images.githubusercontent.com/83622741/219051671-e6bf11db-5c25-4544-97fd-686335c76bb6.png)









