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
            try
            {
                if (usuario == null)
                {
                    return BadRequest(new { error = "Dados de usuário inválidos." });
                }

                if (usuario.Senha != usuario.ConfirmaSenha)
                {
                    return BadRequest(new { error = "Senhas não conferem." });
                }

                if (_usuarioServices.ConsultarUsuarioExiste(usuario.NomeUsuario))
                {
                    return BadRequest(new { error = "Usuário já cadastrado." });
                }

                bool cadastrou = _usuarioServices.CadastroUsuario(usuario);
                if (cadastrou)
                {
                    return Ok(new { success = "Usuário cadastrado com sucesso" });
                }
                else
                {
                    return BadRequest(new { error = "Não foi possível cadastrar o usuário." });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = $"Erro interno do servidor: {ex.Message}" });
            }
        }


        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] LoginViewModel loginViewModel)
        {
            try
            {
                if (loginViewModel == null)
                {
                    return BadRequest(new { error = "Dados de login inválidos" });
                }

                if (_usuarioServices.ValidarLogin(loginViewModel))
                {
                    return Ok(new { success = "Login bem-sucedido" });
                }

                return Unauthorized(new { error = "Usuário ou senha incorretos" });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = $"Erro interno do servidor: {ex.Message}" });
            }
        }
    }
}
