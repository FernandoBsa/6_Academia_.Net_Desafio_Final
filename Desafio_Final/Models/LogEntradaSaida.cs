using System;
using System.Collections.Generic;

namespace Desafio_Final.Models;

public partial class LogEntradaSaida
{
    public int Id { get; set; }

    public int? ProdutoId { get; set; }

    public int? Quantidade { get; set; }

    public string? TipoMovimento { get; set; }

    public DateTime? DataMovimento { get; set; }

    public virtual Estoque? Produto { get; set; }
}
