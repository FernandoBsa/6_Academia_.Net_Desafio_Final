using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Final.Services
{
    public class UsuarioServices : IUsuarioServices
    {
        private readonly EstoqueContext _contexto;

        public UsuarioServices (EstoqueContext contexto)
        {
            _contexto = contexto;
        }

        public bool CadastroUsuario(CasdastroUsuarioViewModel usuarioViewModel)
        {
            try
            {
                var usuario = new Usuario
                {
                    NomeUsuario = usuarioViewModel.NomeUsuario,
                    Senha = usuarioViewModel.Senha,
                    NomeCompleto = usuarioViewModel.NomeCompleto,
                    DataNascimento = usuarioViewModel.DataNascimento,
                    Cpf = usuarioViewModel.Cpf,
                    Email = usuarioViewModel.Email,
                };
                _contexto.Usuarios.Add(usuario);
                _contexto.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool ConsultarUsuarioExiste(string usuario)
        {
            return _contexto.Usuarios.Any(u => u.NomeUsuario == usuario);
        }

        public bool ValidarLogin(LoginViewModel loginViewModel)
        {
            var user = _contexto.Usuarios.FirstOrDefault(u => u.NomeUsuario == loginViewModel.NomeUsuario && u.Senha == loginViewModel.Senha);
            return user != null;
        }


    }    
}
