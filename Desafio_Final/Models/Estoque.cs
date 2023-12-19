using System;
using System.Collections.Generic;

namespace Desafio_Final.Models;

public partial class Estoque
{
    public int Id { get; set; }

    public string? NomeProduto { get; set; }

    public string? Fabricante { get; set; }

    public int? Quantidade { get; set; }

    public decimal? PrecoUnitario { get; set; }

    public virtual ICollection<LogEntradaSaida> LogEntradaSaida { get; set; } = new List<LogEntradaSaida>();
}
