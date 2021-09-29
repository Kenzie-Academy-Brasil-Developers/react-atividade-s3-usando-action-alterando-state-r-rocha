# 📋 Sobre a atividade

O objetivo desta atividade é criar um estado global para armazenar um nome. Vamos entender como fazer a mudança desse estado global, usando o **useDispatch** e a **action** criada.

Então mostraremos para o usuário o resultado em tela.

# ℹ️ Informações úteis

## Resultado final

![](https://media2.giphy.com/media/toOt2Ik7Y7rhc2xP7h/giphy.gif?cid=790b76115846dd34878a3b24035b948581d184cb0916416b&rid=giphy.gif&ct=g)

## Mão na massa!

Vamos instalar as dependências no projeto:

    yarn add redux react-redux

Vamos estruturar as pastas do redux, com um módulo chamado **user**, a estrutura fica assim:

![](https://i.ibb.co/T4StMv3/Captura-de-tela-de-2021-07-19-13-19-36.png)

Tendo a estruturação de pastas feita. Primeiro vamos construir o nosso **reducer.js**:

    const initialState = {name: ""};

    const userReducer = (state = initialState, action) => {
    	switch (action.type) {
    	  case "CHANGE_NAME":
    	    const { name } = action;
          return {name: name};

        default:
          return state;
      }
    }

    export default userReducer;

Ok, vamos olhar linha por linha para entender o que está acontecendo.

1.  O primeiro parâmetro que nosso reducer recebe é o **state inicial**, aqui declaramos um objeto, mas pode ser qualquer outro tipo de dado. Em seguida ele receberá a **action**, que será um objeto, veremos melhor sobre ela a seguir.
2.  Usamos o switch para analisar o **type** da nossa **action**.
3.  Se o **type** for igual a **"CHANGE_NAME"**, executaremos o que está dentro deste case.
4.  Criamos uma variável chamada **name** a partir do **action.name** que recebemos. Vamos supor que no **action.name** recebemos o valor **"Kenzie"**.
5.  Quando damos o **return** dentro do **reducer**, o valor retornado se tornará o **state atualizado**.
6.  Caso não tenha um **type**, retorná o **valor default**, ou seja, o **valor atual** do **state**.

Agora vamos criar a **action**:

    export const changeName = (name) => ({
      type: "CHANGE_NAME",
      name: name
    })

Repare que quando chamarmos nossa ação passaremos um **name** como parâmetro.

Agora para que tudo funcione devemos configurar o **index.js** da **store**:

    import { createStore, combineReducers } from "redux";

    import userReducer from "./modules/user/reducers";

    const reducers = combineReducers({ user: userReducer });

    const store = createStore(reducers);

    export default store;

Usamos o **combineReducers** para possibilitar o uso de outros reducers junto.

E por fim, temos que adicionar a store ao React. Para isso colocaremos assim no **index.js** na pasta **src.**

    import React from "react";
    import ReactDOM from "react-dom";
    import App from "./App";

    import { Provider } from "react-redux";
    import store from "./store";

    ReactDOM.render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );

Pronto, o redux está funcionando, vamos criar um componente **UserCard**:

    import { useDispatch } from "react-redux";
    import { changeName } from "../../store/modules/user/actions";

    const UserCard = () => {
      const dispatch = useDispatch();

      const handleClick = () => {
        dispatch(changeName(newName));
      }

      return (
        <div>
          <input type="text"/>
          <button>Change</button>
        </div>
      )
    }

    export default UserCard;

O componente não está completo, você precisa completa-lo para obter o resultado esperado.

Explicando o **handleClick**. É o momento que mudamos o valor do **state** na **store**:

1.  Vamos passar o **dispatch**, com uma **action** de parâmetro.
2.  Essa é **action changeName** que tinhamos criado anteriormente. Lembre que ela recebe um parâmetro, esse será o novo valor que enviaremos para o state.

# 💡Conhecimentos aplicados:

*   useDispatch
