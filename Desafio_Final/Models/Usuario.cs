using System;
using System.Collections.Generic;

namespace Desafio_Final.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string? NomeUsuario { get; set; }

    public string? Senha { get; set; }

    public string? NomeCompleto { get; set; }

    public DateTime? DataNascimento { get; set; }

    public string? Cpf { get; set; }

    public string? Email { get; set; }
}
