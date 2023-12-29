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
            try
            {
                var result = _logService.EntradaProduto(logViewModel);

                if (result)
                {
                    return Ok(new { success = "Entrada de produto registrada com sucesso" });
                }
                else
                {
                    return BadRequest(new { error = "Falha ao registrar a entrada do produto" });
                }
            }
            catch (Exception ex)
            {              
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpPost]
        [Route("SaidaProduto")]
        public IActionResult SaidaProduto([FromBody] LogEntradaSaidaViewModel logViewModel)
        {
            try
            {
                var result = _logService.SaidaProduto(logViewModel);

                if (result)
                {
                    return Ok(new { success = "Saída de produto registrada com sucesso" });
                }
                else
                {
                    return BadRequest(new { error = "Falha ao registrar a saída do produto" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Ocorreu um erro ao processar a solicitação." });
            }
        }

        [HttpGet]
        [Route("ConsultarLog")]
        public IActionResult ConsultarLog()
        {
            var log = _logService.ConsultarTodosOsLogs();
            if (log == null || !log.Any())
            {
                return NotFound(new { error = "Nenhum log encontrado." });
            }
            return Ok(log);
        }

        [HttpGet]
        [Route("FiltrarLogs")]
        public IActionResult FiltrarLogs([FromQuery] FiltroLog filtro)
        {
            if (filtro == null)
            {
                return BadRequest(new { error = "Filtro inválido." });
            }

            var logsFiltrados = _logService.FiltrarLogs(filtro);

            if (logsFiltrados == null || logsFiltrados.Count == 0)
            {
                return NotFound(new { error = "Nenhum log encontrado com os filtros fornecidos." });
            }

            return Ok(logsFiltrados);
        }
    }
}
