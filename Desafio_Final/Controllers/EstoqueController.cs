using Desafio_Final.Filter;
using Desafio_Final.Interfaces;
using Desafio_Final.Models;
using Desafio_Final.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstoqueController : ControllerBase
    {
        private readonly IEstoqueService _estoqueService;
        public EstoqueController(IEstoqueService estoqueService)
        {
            _estoqueService = estoqueService;
        }

        [HttpPost]
        [Route("CadastroProduto")]
        public IActionResult CadastroProduto([FromBody] CadastroEstoqueViewModel produtoViewModel)
        {
            if (produtoViewModel == null)
            {
                return BadRequest("Dados do produto inválidos.");
            }

            if (_estoqueService.CadastrarProduto(produtoViewModel))
            {
                return Ok("Produto cadastrado com sucesso.");
            }
            else
            {
                return BadRequest("Produto ja cadastrado.");
            }
        }


        [HttpGet]
        [Route("ConsultarTodosProdutos")]
        public IActionResult ConsultarTodosProdutos()
        {            
            var produtos = _estoqueService.ConsultarTodosProdutos();

            if (produtos == null || !produtos.Any())
            {
                return NotFound();
            }

            return Ok(produtos);
        }

        [HttpPut]
        [Route("AlterarProduto")]
        public IActionResult AlterarProduto([FromBody] EstoqueViewModel produtoViewModel)
        {
            if (produtoViewModel == null || produtoViewModel.Id <= 0)
            {
                return BadRequest("Dados do produto inválidos");
            }

            if (_estoqueService.AlterarProduto(produtoViewModel))
            {
                return Ok("Produto alterado com sucesso");
            }

            return NotFound("Produto não encontrado");
        }

        [HttpDelete]
        [Route("ExcluirProduto/{produtoId}")]
        public IActionResult ExcluirProduto(int produtoId)
        {
            if (_estoqueService.ExcluirProduto(produtoId))
            {
                return Ok(new { sucess = "Produto excluído com sucesso" });
            }

            return NotFound(new { error = "Produto não encontrado" });
        }

        [HttpGet]
        [Route("FiltrarProdutos")]
        public IActionResult FiltrarProdutos([FromQuery] FiltroProdutos filtro)
        {
            var produtos = _estoqueService.FiltrarProdutos(filtro);
            if (produtos == null || !produtos.Any())
            {
                return NotFound();
            }

            return Ok(produtos);    
        }
    }
}
