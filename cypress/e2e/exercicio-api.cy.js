/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {
  let nome = 'Nome Teste ' + Math.floor(Math.random() * 1000000)
  let email = 'email' + Math.floor(Math.random() * 1000000) + '@teste.com'

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(nome, email, 'Teste124', 'true')
      .should((response) => {
        expect((response.status)).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario(nome, 'teste.com', 'Teste124', 'true')
      .should((response) => {
        expect((response.status)).equal(400)
        expect(response.body.email).equal('email deve ser um email válido')
      })
  });

  it.only('Deve editar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(nome + ' Alterado', email, 'Teste124', 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
            "nome": nome,
            "email": email,
            "password": 'Teste124alt',
            "administrador": 'true'
          },
        }).then(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).to.equal(200)
        })
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.cadastrarUsuario(nome, email, 'Teste124', 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'DELETE',
          url: `usuarios/${id}`,
        }).then(response => {
          expect(response.body.message).to.equal('Registro excluído com sucesso')
          expect(response.status).to.equal(200)
        })
      })
  });


});
