using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuárioController : ControllerBase
    {
        private readonly IUsuarioServices _usuarioServices;
        public UsuárioController(IUsuarioServices usuarioServices)
        {
            _usuarioServices = usuarioServices;
        }

        [HttpPost]
        [Route("Cadastrar")]
        public IActionResult CadastrarUsuario(CasdastroUsuarioViewModel usuario)
        {
            if (usuario == null)
            {
                return BadRequest("Dados de usuário inválidos.");
            }

            if (usuario.Senha != usuario.ConfirmaSenha)
            {
                return BadRequest("Senhas nao conferem.");
            }

            if (_usuarioServices.ConsultarUsuarioExiste(usuario.NomeUsuario))
            {
                return BadRequest("Usuario ja cadastrado.");
            }

            try
            {
                bool cadastrou = _usuarioServices.CadastroUsuario(usuario);
                if (cadastrou)
                {
                    return Ok("Usuário cadastrado com sucesso");
                }
                else
                {
                    return BadRequest("Nao foi possivel cadastrar o usuario.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Erro interno do servidor: {ex.Message}");
            }
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginViewModel loginViewModel)
        {
            if (loginViewModel == null)
            {
                return BadRequest("Dados de login inválidos");
            }

            if (_usuarioServices.ValidarLogin(loginViewModel))
            {
                return Ok();
            }

            return Unauthorized("Usuário ou senha incorretos");
        }
    }
}
