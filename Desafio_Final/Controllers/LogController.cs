using Desafio_Final.Filter;
using Desafio_Final.Interfaces;
using Desafio_Final.Services;
using Desafio_Final.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogController : ControllerBase
    {
        private readonly ILogEntradaSaida _logService;

        public LogController(ILogEntradaSaida logService)
        {
            _logService = logService;
        }

        [HttpPost]
        [Route("EntradaProduto")]
        public IActionResult EntradaProduto([FromBody] LogEntradaSaidaViewModel logViewModel)
        {
            var result = _logService.EntradaProduto(logViewModel);

            if (result)
            {
                return Ok("Entrada de produto registrada com sucesso");
            }
            else
            {
                return BadRequest("Falha ao registrar a entrada do produto");
            }
        }

        [HttpPost]
        [Route("SaidaProduto")]
        public IActionResult SaidaProduto([FromBody] LogEntradaSaidaViewModel logViewModel)
        {
            var result = _logService.SaidaProduto(logViewModel);

            if (result)
            {
                return Ok("Saída de produto registrada com sucesso");
            }
            else
            {
                return BadRequest("Falha ao registrar a saída do produto");
            }
        }

        [HttpGet]
        [Route("ConsultarLog")]
        public IActionResult ConsultarLog()
        {
            var log = _logService.ConsultarTodosOsLogs();
            if (log == null || !log.Any())
            {
                return NotFound();
            }
            return Ok(log);
        }

        [HttpGet]
        [Route("FiltrarLogs")]
        public IActionResult FiltrarLogs([FromQuery] FiltroLog filtro)
        {
            if (filtro == null)
            {
                return BadRequest("Filtro inválido");
            }

            var logsFiltrados = _logService.FiltrarLogs(filtro);

            if (logsFiltrados == null || logsFiltrados.Count == 0)
            {
                return NotFound("Nenhum log encontrado com os filtros fornecidos");
            }

            return Ok(logsFiltrados);
        }
    }
}
